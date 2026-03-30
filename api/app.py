from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, validator
import joblib
import pandas as pd
import numpy as np
import logging
from datetime import datetime
from typing import Dict, List, Optional
import json
import os
from src.utils import validate_input, normalize_price_prediction, log_prediction

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="House Price Prediction API",
    description="ML-powered API for predicting house prices",
    version="1.0.0"
)

# Add CORS middleware for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models
try:
    pipeline = joblib.load("models/rf_pipeline.pkl")
    logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Error loading model: {e}")
    pipeline = None

# Load model metadata if available
model_metadata = {}
if os.path.exists("models/model_metadata.json"):
    try:
        with open("models/model_metadata.json", "r") as f:
            model_metadata = json.load(f)
    except Exception as e:
        logger.error(f"Error loading metadata: {e}")

def engineer_features(df):
    """Add engineered features to the dataframe"""
    df = df.copy()
    
    # rooms per household
    if 'total_rooms' in df.columns and 'households' in df.columns:
        df['rooms_per_household'] = df['total_rooms'] / df['households']
    
    # bedrooms ratio
    if 'total_bedrooms' in df.columns and 'total_rooms' in df.columns:
        df['bedrooms_ratio'] = df['total_bedrooms'] / df['total_rooms']
    
    # population per household
    if 'population' in df.columns and 'households' in df.columns:
        df['population_per_household'] = df['population'] / df['households']
    
    # Replace infinite values
    df = df.replace([np.inf, -np.inf], np.nan)
    df = df.fillna(df.median(numeric_only=True))
    
    return df

# Define input schema
class HouseInput(BaseModel):
    longitude: float = Field(..., ge=-125, le=-114, description="Longitude coordinate")
    latitude: float = Field(..., ge=32, le=42, description="Latitude coordinate")
    housing_median_age: float = Field(..., ge=0, description="Median age of houses")
    total_rooms: float = Field(..., gt=0, description="Total rooms in the block")
    total_bedrooms: float = Field(..., gt=0, description="Total bedrooms")
    population: float = Field(..., ge=0, description="Population count")
    households: float = Field(..., gt=0, description="Number of households")
    median_income: float = Field(..., gt=0, description="Median income in units")
    ocean_proximity: str = Field(..., description="Proximity to ocean")
    
    @validator('ocean_proximity')
    def validate_ocean_proximity(cls, v):
        valid_values = ['<1H OCEAN', 'INLAND', 'NEAR OCEAN', 'NEAR BAY', 'ISLAND']
        if v not in valid_values:
            raise ValueError(f'Must be one of {valid_values}')
        return v

class PredictionResponse(BaseModel):
    predicted_price: float
    formatted_price: str
    currency: str = "USD"
    confidence: str = "High" if True else "Low"
    timestamp: str

class BatchPredictionRequest(BaseModel):
    houses: List[HouseInput]

class BatchPredictionResponse(BaseModel):
    predictions: List[PredictionResponse]
    count: int
    timestamp: str

@app.get("/", tags=["Health"])
def home():
    """API health check endpoint"""
    return {
        "message": "House Price Prediction API v1.0",
        "status": "running",
        "endpoints": {
            "health": "/health",
            "predictions": "/predict",
            "batch": "/batch-predict",
            "model_info": "/model-info"
        }
    }

@app.get("/health", tags=["Health"])
def health_check():
    """Detailed health check"""
    return {
        "status": "online",
        "model_loaded": pipeline is not None,
        "timestamp": datetime.now().isoformat()
    }

@app.get("/model-info", tags=["Model"])
def get_model_info():
    """Get model metadata and performance metrics"""
    if not model_metadata:
        raise HTTPException(status_code=404, detail="Model metadata not found")
    
    return {
        "model": "RandomForest Regressor",
        "version": "1.0.0",
        "training_date": model_metadata.get('timestamp'),
        "metrics": {
            "train_rmse": model_metadata.get('train_rmse'),
            "test_rmse": model_metadata.get('test_rmse'),
            "train_r2": model_metadata.get('train_r2'),
            "test_r2": model_metadata.get('test_r2'),
            "cv_mean_r2": model_metadata.get('cv_mean_r2'),
        },
        "best_params": model_metadata.get('best_params')
    }

@app.post("/predict", response_model=PredictionResponse, tags=["Predictions"])
def predict(data: HouseInput):
    """
    Predict house price based on input features.
    
    Example input:
    ```
    {
        "longitude": -122.4,
        "latitude": 37.7,
        "housing_median_age": 25.0,
        "total_rooms": 2000.0,
        "total_bedrooms": 400.0,
        "population": 900.0,
        "households": 350.0,
        "median_income": 4.5,
        "ocean_proximity": "<1H OCEAN"
    }
    ```
    """
    
    if pipeline is None:
        raise HTTPException(status_code=503, detail="Model not available")
    
    try:
        # Convert input to DataFrame
        df = pd.DataFrame([data.dict()])
        
        # Engineer features
        df = engineer_features(df)
        
        # Predict
        prediction = pipeline.predict(df)[0]
        
        # Validate prediction
        if np.isnan(prediction) or np.isinf(prediction):
            raise ValueError("Invalid prediction value")
        
        # Log prediction
        log_prediction(data.dict(), prediction, datetime.now().isoformat())
        
        return PredictionResponse(
            predicted_price=float(prediction),
            formatted_price=f"${prediction:,.2f}",
            timestamp=datetime.now().isoformat()
        )
        
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        raise HTTPException(status_code=400, detail=f"Prediction failed: {str(e)}")

@app.post("/batch-predict", response_model=BatchPredictionResponse, tags=["Predictions"])
def batch_predict(request: BatchPredictionRequest):
    """
    Predict prices for multiple houses at once.
    """
    
    if pipeline is None:
        raise HTTPException(status_code=503, detail="Model not available")
    
    if not request.houses:
        raise HTTPException(status_code=400, detail="No houses provided")
    
    if len(request.houses) > 100:
        raise HTTPException(status_code=400, detail="Maximum 100 houses per batch")
    
    try:
        # Convert to DataFrame
        data_list = [house.dict() for house in request.houses]
        df = pd.DataFrame(data_list)
        
        # Engineer features
        df = engineer_features(df)
        
        # Batch predict
        predictions = pipeline.predict(df)
        
        # Format responses
        results = []
        for i, pred in enumerate(predictions):
            if np.isnan(pred) or np.isinf(pred):
                continue
            results.append(PredictionResponse(
                predicted_price=float(pred),
                formatted_price=f"${pred:,.2f}",
                timestamp=datetime.now().isoformat()
            ))
        
        return BatchPredictionResponse(
            predictions=results,
            count=len(results),
            timestamp=datetime.now().isoformat()
        )
        
    except Exception as e:
        logger.error(f"Batch prediction error: {e}")
        raise HTTPException(status_code=400, detail=f"Batch prediction failed: {str(e)}")

@app.get("/features", tags=["Dataset"])
def get_feature_info():
    """Get available features and their ranges"""
    return {
        "features": {
            "longitude": {"type": "float", "range": [-125, -114]},
            "latitude": {"type": "float", "range": [32, 42]},
            "housing_median_age": {"type": "float", "range": [0, 100]},
            "total_rooms": {"type": "float", "range": [0, 100000]},
            "total_bedrooms": {"type": "float", "range": [0, 10000]},
            "population": {"type": "float", "range": [0, 50000]},
            "households": {"type": "float", "range": [0, 10000]},
            "median_income": {"type": "float", "range": [0, 20]},
            "ocean_proximity": {
                "type": "categorical",
                "options": ["<1H OCEAN", "INLAND", "NEAR OCEAN", "NEAR BAY", "ISLAND"]
            }
        }
    }

@app.exception_handler(ValueError)
async def value_error_handler(request, exc):
    return JSONResponse(
        status_code=400,
        content={"detail": str(exc)}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)