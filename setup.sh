#!/bin/bash

# House Price Prediction System - Installation Script for macOS/Linux

echo ""
echo "===================================="
echo "House Price Prediction System Setup"
echo "===================================="
echo ""

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed"
    exit 1
fi

echo "[1/5] Creating Python virtual environment..."
python3 -m venv venv
source venv/bin/activate

echo "[2/5] Installing Python dependencies..."
pip install -r requirements.txt

echo "[3/5] Creating necessary directories..."
mkdir -p data/processed
mkdir -p models
mkdir -p notebooks

echo "[4/5] Switching to frontend directory..."
cd frontend

echo "[5/5] Installing Node.js dependencies..."
npm install

echo ""
echo "===================================="
echo "Setup Complete!"
echo "===================================="
echo ""
echo "Next steps:"
echo "1. Train the model: python main.py"
echo "2. Start the API (in new terminal): uvicorn api.app:app --reload --port 8000"
echo "3. Start the frontend (in another terminal): cd frontend && npm run dev"
echo ""
echo "The application will be available at:"
echo "- Frontend: http://localhost:5173"
echo "- API: http://localhost:8000"
echo "- API Docs: http://localhost:8000/docs"
echo ""
