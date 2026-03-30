import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, RobustScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.impute import SimpleImputer
import logging

logger = logging.getLogger(__name__)

def load_data(path="data/raw/housing.csv"):
    """Load housing data from CSV file"""
    try:
        df = pd.read_csv(path)
        logger.info(f"Data loaded successfully. Shape: {df.shape}")
        return df
    except FileNotFoundError:
        logger.error(f"File not found: {path}")
        raise

def clean_data(df):
    """
    Clean and prepare data:
    - Handle missing values
    - Remove outliers
    - Feature engineering
    """
    df = df.copy()
    
    # Handle missing values
    df = df.dropna(subset=['median_house_value'])  # Don't remove target
    
    # Fill numeric missing values with median
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    for col in numeric_cols:
        if df[col].isnull().sum() > 0:
            df[col].fillna(df[col].median(), inplace=True)
    
    # Feature engineering
    df = engineer_features(df)
    
    logger.info(f"Data cleaned. Shape: {df.shape}")
    return df

def engineer_features(df):
    """Create new features from existing ones"""
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

def build_preprocessor(df):
    """
    Builds a preprocessing pipeline:
    - Numerical scaling with RobustScaler (handles outliers better)
    - Categorical one-hot encoding
    - Imputation for any missing values
    """
    numeric_features = df.select_dtypes(include=['int64', 'float64']).columns.tolist()
    
    # Remove target column
    if 'median_house_value' in numeric_features:
        numeric_features.remove('median_house_value')
        
    categorical_features = df.select_dtypes(include=['object']).columns.tolist()
    
    # Numeric transformer with imputation and robust scaling
    numeric_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', RobustScaler())  # Better for outliers
    ])
    
    # Categorical transformer
    categorical_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
        ('onehot', OneHotEncoder(drop='first', sparse_output=False, handle_unknown='ignore'))
    ])
    
    # Combine transformers
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, numeric_features),
            ('cat', categorical_transformer, categorical_features)
        ]
    )
    
    return preprocessor, numeric_features, categorical_features