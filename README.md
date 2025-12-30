# GharValue AI

**AI-Powered Indian House Price Prediction**

GharValue AI is a modern web application designed to predict house prices in Bangalore, India. It leverages a Machine Learning model (Linear Regression) trained on historical real estate data to provide accurate price estimates based on location, area, bedrooms (BHK), and bathrooms.

## Features
- **Accurate Predictions**: Uses a trained Linear Regression model.
- **Interactive UI**: Clean, responsive design built with React and Tailwind CSS.
- **Real-time API**: Flask-based REST API for fast predictions.
- **Indian Context**: Tailored for Indian users (Price in Lakhs, Indian cities).

## Project Structure
- `backend/`: Contains the Flask API and ML training scripts.
- `frontend/`: Contains the React application.

## Getting Started

### Prerequisites
- Python 3.x
- Node.js & npm

### Installation & Running

**1. Backend Setup**
```bash
cd backend
pip install -r requirements.txt
# Train the model (optional, model.pkl is already generated)
python train_model.py
# Start the server
python app.py
```

**2. Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

Open your browser at `http://localhost:5173` to use the app.
