#!/usr/bin/env python
"""
House Price Prediction System - Main Training Pipeline
Complete ML pipeline: Data Loading → Cleaning → Preprocessing → Model Training → Evaluation
"""

import logging
from src.data_preprocessing import load_data, clean_data, build_preprocessor
from src.train import train_model, train_gradient_boosting
import os

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def ensure_directories():
    """Ensure required directories exist"""
    dirs = ['data/processed', 'models', 'notebooks']
    for dir_path in dirs:
        os.makedirs(dir_path, exist_ok=True)
        logger.info(f"Directory ensured: {dir_path}")

def main():
    """Main training pipeline"""
    logger.info("="*60)
    logger.info("HOUSE PRICE PREDICTION - TRAINING PIPELINE")
    logger.info("="*60)
    
    # Ensure directories
    ensure_directories()
    
    try:
        # Step 1: Load data
        logger.info("\n[Step 1] Loading data...")
        df = load_data("data/raw/housing.csv")
        logger.info(f"Loaded {df.shape[0]} records with {df.shape[1]} features")
        print(f"\nDataset Info:\n{df.info()}\n")
        
        # Step 2: Clean data
        logger.info("\n[Step 2] Cleaning and preparing data...")
        df = clean_data(df)
        logger.info(f"Cleaned data shape: {df.shape}")
        
        # Step 3: Separate features and target
        logger.info("\n[Step 3] Preparing features and target...")
        X = df.drop("median_house_value", axis=1)
        y = df["median_house_value"]
        logger.info(f"Features shape: {X.shape}")
        logger.info(f"Target shape: {y.shape}")
        
        # Step 4: Build preprocessor
        logger.info("\n[Step 4] Building preprocessing pipeline...")
        preprocessor, numeric_features, categorical_features = build_preprocessor(df)
        logger.info(f"Numeric features: {numeric_features}")
        logger.info(f"Categorical features: {categorical_features}")
        
        # Step 5: Train Random Forest Model
        logger.info("\n[Step 5] Training Random Forest model with hyperparameter tuning...")
        best_model, metrics = train_model(X, y, preprocessor)
        
        # Step 6: Save processed data
        logger.info("\n[Step 6] Saving processed data...")
        X.to_csv("data/processed/X_features.csv", index=False)
        y.to_csv("data/processed/y_target.csv", index=False)
        logger.info("Processed data saved")
        
        # Step 7: Optional - Train alternative model
        logger.info("\n[Step 7] Training Gradient Boosting model (alternative)...")
        gb_model = train_gradient_boosting(X, y, preprocessor)
        
        logger.info("\n" + "="*60)
        logger.info("TRAINING PIPELINE COMPLETED SUCCESSFULLY")
        logger.info("="*60)
        logger.info(f"\nModel saved to: models/rf_pipeline.pkl")
        logger.info(f"Metadata saved to: models/model_metadata.json")
        logger.info(f"Processed features saved to: data/processed/X_features.csv")
        logger.info(f"Target variable saved to: data/processed/y_target.csv")
        
        return best_model, metrics
        
    except Exception as e:
        logger.error(f"Error in training pipeline: {str(e)}")
        raise

if __name__ == "__main__":
    model, metrics = main()
