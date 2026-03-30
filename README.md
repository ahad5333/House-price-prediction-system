# House Price Prediction System

A complete machine learning system for predicting house prices using the California Housing Dataset. Includes a trained Random Forest model, optimized REST API, and modern React-based web interface.

## 🎯 Features

- **ML Pipeline**: Complete data preprocessing and model training pipeline
- **Optimized Model**: Random Forest with hyperparameter tuning (±15% accuracy)
- **REST API**: FastAPI with comprehensive endpoints for predictions
- **Batch Processing**: Predict prices for multiple houses at once
- **Modern Frontend**: React.js with Tailwind CSS for beautiful UI
- **Real-time Predictions**: Interactive form with instant price estimation
- **Model Insights**: Dashboard showing model performance metrics
- **Production Ready**: CORS enabled, error handling, input validation

## 📁 Project Structure

```
.
├── main.py                      # Main training pipeline
├── requirements.txt             # Python dependencies
├── README.md                    # This file
│
├── api/
│   └── app.py                  # FastAPI application
│
├── src/
│   ├── data_preprocessing.py   # Data loading & cleaning
│   ├── train.py                # Model training & optimization
│   └── utils.py                # Utility functions
│
├── data/
│   ├── raw/
│   │   └── housing.csv         # Original dataset (~20k records)
│   └── processed/
│       ├── X_features.csv      # Processed features
│       └── y_target.csv        # Target variable
│
├── models/
│   ├── rf_pipeline.pkl         # Trained RandomForest model
│   └── model_metadata.json     # Model performance metrics
│
├── frontend/                    # React.js web interface
│   ├── public/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API integration
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
└── notebooks/                   # Jupyter notebooks (optional)
```

## 🚀 Quick Start

### 1. Setup Python Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Train the Model

```bash
python main.py
```

This will:
- Load the California Housing dataset
- Clean and preprocess the data
- Train a Random Forest model with hyperparameter tuning
- Save the trained model to `models/rf_pipeline.pkl`
- Save model metadata and processed data

### 3. Run the Backend API

```bash
# From project root
uvicorn api.app:app --reload --port 8000
```

The API will be available at: `http://localhost:8000`

API Documentation:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### 4. Run the Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: `http://localhost:5173`

## 📊 Model Performance

After training, metrics displayed:

- **RMSE (Root Mean Squared Error)**: ~$70,000
- **R² Score**: ~0.85
- **Mean Absolute Error**: ~$50,000
- **Cross-validation**: 5-fold CV with consistent scores

The model explains ~85% of the variance in house prices.

## 🔌 API Endpoints

### Health & Info
- `GET /` - API information
- `GET /health` - Health check
- `GET /model-info` - Model metrics and performance
- `GET /features` - Available features and ranges

### Predictions
- `POST /predict` - Single house price prediction
- `POST /batch-predict` - Batch predictions (up to 100 houses)

### Example Request

```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "longitude": -122.4,
    "latitude": 37.7,
    "housing_median_age": 25.0,
    "total_rooms": 2000.0,
    "total_bedrooms": 400.0,
    "population": 900.0,
    "households": 350.0,
    "median_income": 4.5,
    "ocean_proximity": "<1H OCEAN"
  }'
```

### Example Response

```json
{
  "predicted_price": 450000.50,
  "formatted_price": "$450,000.50",
  "currency": "USD",
  "confidence": "High",
  "timestamp": "2024-03-31T10:30:45.123456"
}
```

## 🎨 Frontend Features

### Pages

1. **Home Page**
   - Welcome and introduction
   - Quick statistics about the model
   - Call-to-action buttons

2. **Prediction Page**
   - Interactive form for house features
   - Real-time validation
   - Instant price prediction
   - Formatted result display

3. **Batch Prediction**
   - Upload CSV file with house data
   - Bulk price predictions
   - Download results as CSV

4. **Model Dashboard**
   - Performance metrics visualization
   - Feature importance chart
   - Training statistics
   - Model comparison

5. **About Page**
   - Project information
   - Dataset information
   - Technical stack
   - Team information

## 🛠️ Technology Stack

### Backend
- **Python 3.8+**: Core language
- **FastAPI**: Modern web framework
- **Uvicorn**: ASGI server
- **Scikit-learn**: Machine learning
- **Pandas & NumPy**: Data processing
- **Joblib**: Model serialization

### Frontend
- **React 18**: UI framework
- **Vite**: Build tool (fast development)
- **Tailwind CSS**: Styling
- **Axios**: HTTP client
- **Chart.js/D3.js**: Data visualization
- **React Router**: Navigation

## 📈 Model Details

### Algorithm
Random Forest Regressor with hyperparameter optimization

### Features Used
- Geographic: Longitude, Latitude
- Age: Housing Median Age
- Size: Total Rooms, Total Bedrooms
- People: Population, Households
- Income: Median Income
- Location: Ocean Proximity

### Hyperparameter Tuning
- n_estimators: [100, 200, 300, 500]
- max_depth: [10, 15, 20, 25, None]
- min_samples_split: [2, 5, 10]
- min_samples_leaf: [1, 2, 4]
- max_features: ['sqrt', 'log2']

### Data Preprocessing
- **Numeric Features**: RobustScaler (handles outliers)
- **Categorical Features**: OneHotEncoder
- **Missing Values**: Median/Mode imputation
- **Feature Engineering**: Room ratios, population density

## 🔧 Configuration

### Backend Configuration

Edit `api/app.py` to modify:
- CORS origins
- Model paths
- API settings

### Frontend Configuration

Edit `frontend/.env` for:
- API endpoint URL
- API timeout settings
- Feature limits

## 📝 Logging

Both backend and training pipeline include comprehensive logging.

View logs:
```bash
# Training logs appear during model training
python main.py

# API logs appear in the terminal running the API
uvicorn api.app:app --reload --port 8000
```

## 🧪 Testing

### Backend Tests

```bash
pytest tests/ -v
```

### Frontend Tests

```bash
cd frontend
npm run test
```

## 🚀 Deployment

### Backend Deployment (Heroku, AWS, etc.)

```bash
# Create Procfile
echo "web: uvicorn api.app:app --host 0.0.0.0 --port $PORT" > Procfile

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel, Netlify)

```bash
cd frontend
npm run build
# Deploy the 'dist' folder to your hosting service
```

## 📊 Dataset Information

**California Housing Dataset**
- **Records**: ~20,000 house blocks
- **Year**: 1990 census data
- **Location**: California, USA
- **Target**: Median house value (in hundreds of thousands)

## 🤝 Contributing

Feel free to improve the project:
1. Fork the repository
2. Create feature branch
3. Make improvements
4. Submit pull request

Areas for improvement:
- Additional models (Gradient Boosting, XGBoost)
- More advanced feature engineering
- API caching layer
- Database integration
- Authentication system

## 📜 License

MIT License - Feel free to use this project

## 📞 Support

For issues or questions:
1. Check existing documentation
2. Review API documentation at `/docs`
3. Check training logs from `main.py`
4. Review frontend console for errors

## 🎓 Learning Resources

- [Scikit-learn Documentation](https://scikit-learn.org/)
- [FastAPI Tutorial](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📅 Version History

- **v1.0.0** (2024-03-31): Initial release with RF model, API, and React frontend

---

**Built with ❤️ using Python, FastAPI, and React**
#   H o u s e - p r i c e - p r e d i c t i o n - s y s t e m  
 