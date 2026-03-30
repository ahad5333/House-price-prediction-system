@echo off
REM House Price Prediction System - Installation Script for Windows

echo.
echo ====================================
echo House Price Prediction System Setup
echo ====================================
echo.

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    pause
    exit /b 1
)

echo [1/5] Creating Python virtual environment...
python -m venv venv
call venv\Scripts\activate.bat

echo [2/5] Installing Python dependencies...
pip install -r requirements.txt

echo [3/5] Creating necessary directories...
if not exist "data\processed" mkdir data\processed
if not exist "models" mkdir models
if not exist "notebooks" mkdir notebooks

echo [4/5] Switching to frontend directory...
cd frontend

echo [5/5] Installing Node.js dependencies...
call npm install

echo.
echo ====================================
echo Setup Complete!
echo ====================================
echo.
echo Next steps:
echo 1. Train the model: python main.py
echo 2. Start the API (in new terminal): uvicorn api.app:app --reload --port 8000
echo 3. Start the frontend (in another terminal): cd frontend ^&^& npm run dev
echo.
echo The application will be available at:
echo - Frontend: http://localhost:5173
echo - API: http://localhost:8000
echo - API Docs: http://localhost:8000/docs
echo.
pause
