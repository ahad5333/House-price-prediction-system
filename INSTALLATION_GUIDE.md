# Installation Guide - House Price Prediction System

## System Requirements

- **Python**: 3.8 or higher
- **Node.js**: 16 or higher
- **npm**: 8 or higher
- **Git**: (optional, for cloning)
- **RAM**: 4GB minimum
- **Disk Space**: 2GB minimum

## Pre-installation Setup

### Windows Users
1. Install Python from https://www.python.org/
   - ✅ Check "Add Python to PATH" during installation
2. Install Node.js from https://nodejs.org/
   - Choose LTS version

### macOS Users
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Python and Node.js
brew install python@3.11 node
```

### Linux Users (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv nodejs npm
```

## Installation Steps

### Step 1: Clone or Download the Repository

```bash
# Using git
git clone <repository-url>
cd "House price prediction system"

# Or extract the ZIP file and navigate to the directory
```

### Step 2: Automated Setup (Windows)

**Double-click `setup.bat`** (requires Administrator privileges)

Or run from command prompt:
```bash
setup.bat
```

### Step 3: Automated Setup (macOS/Linux)

```bash
# Make script executable
chmod +x setup.sh

# Run setup
./setup.sh
```

### Step 4: Manual Setup (if automated setup fails)

#### Backend Setup

```bash
# Navigate to project root
cd "House price prediction system"

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Upgrade pip
python -m pip install --upgrade pip

# Install Python dependencies
pip install -r requirements.txt

# Create necessary directories
mkdir -p data/processed models notebooks
```

#### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install
```

## Step 3: Download the Dataset

The project uses the California Housing Dataset. It's included in scikit-learn, so it will be automatically downloaded when you run the training script.

```bash
# The dataset will be downloaded automatically by the training script
python main.py
```

## Step 4: Train the Model

```bash
# Make sure your virtual environment is activated
# (You should see (venv) at the beginning of your terminal prompt)

# Train the model (this may take 5-10 minutes depending on your system)
python main.py
```

**What this does:**
- Loads the California Housing dataset (~20k records)
- Cleans and preprocesses the data
- Trains a Random Forest model with hyperparameter tuning
- Saves the model to `models/rf_pipeline.pkl`
- Saves model metadata to `models/model_metadata.json`
- Saves processed data to `data/processed/`

**Expected output:**
```
==================================================
HOUSE PRICE PREDICTION - TRAINING PIPELINE
==================================================

[Step 1] Loading data...
[Step 2] Cleaning and preparing data...
[Step 3] Preparing features and target...
...
==================================================
TRAINING PIPELINE COMPLETED SUCCESSFULLY
==================================================
```

## Step 5: Start the Backend API

Open a new terminal window and run:

```bash
# Navigate to project root (if not already there)
cd "House price prediction system"

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Start the API server
uvicorn api.app:app --reload --port 8000
```

**Expected output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

The API is now available at:
- **Main API**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc

**Keep this terminal open!**

## Step 6: Start the Frontend

Open another new terminal window and run:

```bash
# Navigate to frontend directory
cd "House price prediction system/frontend"

# Start the development server
npm run dev
```

**Expected output:**
```
  VITE v5.0.0  ready in XX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

**Keep this terminal open!**

## Step 7: Access the Application

Open your web browser and navigate to:

```
http://localhost:5173
```

You should see the HousePrice AI homepage!

## Navigation Guide

### Home Page (http://localhost:5173/)
- Overview of the project
- Key features
- How it works
- Statistics

### Predict Page (http://localhost:5173/predict)
- Main prediction interface
- Enter property details
- Get instant price predictions
- View model confidence

### Dashboard (http://localhost:5173/dashboard)
- Model performance metrics
- Training statistics
- Hyperparameter information
- Accuracy visualization

### About (http://localhost:5173/about)
- Project information
- Technical stack
- Model details
- API documentation

## API Documentation

Interactive API documentation is available at:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Example API Request

```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "longitude": -122.4,
    "latitude": 37.7,
    "housing_median_age": 25,
    "total_rooms": 2000,
    "total_bedrooms": 400,
    "population": 900,
    "households": 350,
    "median_income": 4.5,
    "ocean_proximity": "<1H OCEAN"
  }'
```

## Troubleshooting

### Issue: "Python command not found"
**Solution**: 
- Windows: Reinstall Python and check "Add Python to PATH"
- macOS/Linux: Use `python3` instead of `python`

### Issue: "Virtual environment not activating"
**Solution**: 
- Windows: Use `venv\Scripts\activate.bat`
- macOS/Linux: Use `source venv/bin/activate`

### Issue: "Module not found" errors
**Solution**: 
- Ensure virtual environment is activated
- Reinstall dependencies: `pip install -r requirements.txt`

### Issue: "API won't start"
**Solution**: 
- Check if port 8000 is already in use: `lsof -i :8000` (macOS/Linux) or `netstat -ano | findstr :8000` (Windows)
- Try a different port: `uvicorn api.app:app --port 8001`

### Issue: "Frontend won't load"
**Solution**: 
- Check if port 5173 is already in use
- Clear browser cache: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (macOS)
- Try: `npm run dev -- --port 3000`

### Issue: "CORS errors in browser console"
**Solution**: 
- Ensure API is running on port 8000
- Check API is accessible: http://localhost:8000
- Verify CORS configuration in `api/app.py`

### Issue: "Model not found" error in API
**Solution**: 
- Ensure you've run `python main.py` to train the model
- Check that `models/rf_pipeline.pkl` exists
- The file should be ~50-100MB in size

### Issue: "npm install fails"
**Solution**: 
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Reinstall: `npm install`

## Project Structure Verification

After installation, your directory should look like:

```
House price prediction system/
├── venv/                          # Virtual environment
├── api/
│   ├── app.py                    # ✅ FastAPI application
│   ├── config.py                 # ✅ Configuration
│   └── __pycache__/
├── src/
│   ├── data_preprocessing.py      # ✅ Enhanced
│   ├── train.py                   # ✅ Enhanced
│   ├── utils.py                   # ✅ Complete
│   └── __init__.py
├── data/
│   ├── processed/
│   │   ├── X_features.csv        # Created after training
│   │   └── y_target.csv          # Created after training
│   └── raw/
│       └── housing.csv            # Dataset
├── models/
│   ├── rf_pipeline.pkl            # Created after training
│   └── model_metadata.json        # Created after training
├── frontend/
│   ├── src/
│   │   ├── App.jsx               # ✅ Main app
│   │   ├── main.jsx              # Entry point
│   │   ├── index.css             # Tailwind CSS
│   │   ├── components/           # ✅ React components
│   │   ├── pages/                # ✅ Page components
│   │   └── services/             # ✅ API integration
│   ├── index.html                # ✅ HTML entry
│   ├── package.json              # ✅ Dependencies
│   ├── vite.config.js            # ✅ Build config
│   ├── tailwind.config.js        # ✅ Tailwind config
│   └── Dockerfile                # ✅ Container config
├── main.py                        # ✅ Training script
├── requirements.txt               # ✅ Updated
├── README.md                      # ✅ Complete documentation
├── DEPLOYMENT.md                  # ✅ Deployment guide
├── INSTALLATION_GUIDE.md          # This file
├── Dockerfile                     # ✅ Backend container
├── docker-compose.yml             # ✅ Multi-container setup
├── setup.bat                      # ✅ Windows setup script
└── setup.sh                       # ✅ Unix setup script
```

## Next Steps

1. ✅ **Explore the Interface**: Navigate through the different pages
2. ✅ **Test Predictions**: Try making predictions with different inputs
3. ✅ **Check API Docs**: Visit http://localhost:8000/docs
4. ✅ **View Dashboard**: Check model metrics on /dashboard
5. ✅ **Read Documentation**: Check README.md and DEPLOYMENT.md

## Docker Installation (Alternative)

If you prefer using Docker:

```bash
# Build the images
docker-compose build

# Run the containers
docker-compose up

# Access the application
# Frontend: http://localhost:3000
# API: http://localhost:8000
```

## Getting Help

1. **Check the README.md** - Comprehensive project documentation
2. **API Documentation** - http://localhost:8000/docs
3. **Check terminals** - Look for error messages
4. **Browser console** - Press F12 for frontend errors
5. **Troubleshooting section** above

## Success Checklist

- ✅ Python virtual environment created
- ✅ Dependencies installed
- ✅ Model trained successfully
- ✅ API server running on port 8000
- ✅ Frontend running on port 5173
- ✅ Can access http://localhost:5173
- ✅ Can make predictions from the web interface
- ✅ API documentation accessible at /docs

If all items are checked, congratulations! Your House Price Prediction System is ready to use! 🎉
