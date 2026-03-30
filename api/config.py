# Configuration module for House Price Prediction System

import os
from dotenv import load_dotenv

load_dotenv()

# API Configuration
API_HOST = os.getenv('API_HOST', '0.0.0.0')
API_PORT = int(os.getenv('API_PORT', 8000))
DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'

# Model Configuration
MODEL_PATH = os.getenv('MODEL_PATH', 'models/rf_pipeline.pkl')
METADATA_PATH = os.getenv('METADATA_PATH', 'models/model_metadata.json')

# Data Configuration
DATA_RAW_PATH = os.getenv('DATA_RAW_PATH', 'data/raw/housing.csv')
DATA_PROCESSED_PATH = os.getenv('DATA_PROCESSED_PATH', 'data/processed/')

# Logging Configuration
LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
LOG_FILE = os.getenv('LOG_FILE', None)

# CORS Configuration
CORS_ORIGINS = os.getenv('CORS_ORIGINS', '*').split(',')

# Feature Validation
MIN_PREDICTIONS_BATCH = 1
MAX_PREDICTIONS_BATCH = 100
