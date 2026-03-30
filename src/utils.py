import numpy as np
import pandas as pd
import logging
from typing import Dict, List, Tuple, Any

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def validate_input(data: Dict[str, float]) -> Tuple[bool, str]:
    """
    Validate input data for predictions.
    Returns (is_valid, error_message)
    """
    required_fields = [
        'longitude', 'latitude', 'housing_median_age',
        'total_rooms', 'total_bedrooms', 'population',
        'households', 'median_income', 'ocean_proximity'
    ]
    
    # Check all fields present
    missing = [f for f in required_fields if f not in data]
    if missing:
        return False, f"Missing fields: {', '.join(missing)}"
    
    # Check numeric fields are positive (except ocean_proximity)
    numeric_fields = [f for f in required_fields if f != 'ocean_proximity']
    for field in numeric_fields:
        try:
            val = float(data[field])
            if val < 0:
                return False, f"{field} must be non-negative"
        except ValueError:
            return False, f"{field} must be a number"
    
    # Check ocean_proximity is valid
    valid_proximity = ['<1H OCEAN', 'INLAND', 'NEAR OCEAN', 'NEAR BAY', 'ISLAND']
    if data['ocean_proximity'] not in valid_proximity:
        return False, f"ocean_proximity must be one of {valid_proximity}"
    
    return True, ""

def normalize_price_prediction(prediction: float) -> Dict[str, Any]:
    """
    Format prediction with confidence interval and metadata.
    """
    return {
        'predicted_price': float(prediction),
        'formatted_price': f"${prediction:,.2f}",
        'currency': 'USD',
        'unit': 'per property'
    }

def get_feature_importance(model) -> Dict[str, float]:
    """
    Extract feature importance from trained model.
    """
    try:
        if hasattr(model, 'named_steps'):
            if 'model' in model.named_steps:
                model_obj = model.named_steps['model']
                if hasattr(model_obj, 'feature_importances_'):
                    return {
                        'importances': model_obj.feature_importances_.tolist(),
                        'n_features': len(model_obj.feature_importances_)
                    }
    except Exception as e:
        logger.error(f"Error getting feature importance: {e}")
    
    return {}

def calculate_error_metrics(y_true: np.ndarray, y_pred: np.ndarray) -> Dict[str, float]:
    """
    Calculate various error metrics for model evaluation.
    """
    from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
    
    mse = mean_squared_error(y_true, y_pred)
    rmse = np.sqrt(mse)
    mae = mean_absolute_error(y_true, y_pred)
    r2 = r2_score(y_true, y_pred)
    
    return {
        'mse': float(mse),
        'rmse': float(rmse),
        'mae': float(mae),
        'r2': float(r2)
    }

def get_statistics_by_category(df: pd.DataFrame, category_col: str) -> Dict[str, Dict]:
    """
    Get statistics grouped by a categorical column.
    """
    stats = {}
    
    for category in df[category_col].unique():
        subset = df[df[category_col] == category]
        numeric_cols = subset.select_dtypes(include=[np.number]).columns
        
        stats[str(category)] = {
            'count': int(len(subset)),
            'mean_price': float(subset['median_house_value'].mean()) if 'median_house_value' in subset.columns else None,
            'median_price': float(subset['median_house_value'].median()) if 'median_house_value' in subset.columns else None,
            'std_price': float(subset['median_house_value'].std()) if 'median_house_value' in subset.columns else None,
        }
    
    return stats

def format_dataframe_stats(df: pd.DataFrame) -> Dict[str, Any]:
    """
    Get summary statistics for the dataset.
    """
    return {
        'shape': {'rows': int(df.shape[0]), 'columns': int(df.shape[1])},
        'columns': df.columns.tolist(),
        'dtypes': df.dtypes.astype(str).to_dict(),
        'missing_values': df.isnull().sum().to_dict(),
        'numeric_summary': df.describe().to_dict()
    }

def log_prediction(input_data: Dict, prediction: float, timestamp: str):
    """Log prediction for audit trail."""
    logger.info(f"Prediction at {timestamp}: Input={input_data}, Prediction=${prediction:,.2f}")
