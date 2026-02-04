# Bangalore House Price Prediction – Full Stack ML SaaS

This project is an end-to-end machine learning application that predicts house prices in Bangalore using regression models and deploys the trained model as a production-ready SaaS using FastAPI, ONNX, Docker, and a React frontend.

Unlike notebook-only ML projects, this focuses on real-world engineering: data cleaning, feature engineering, model deployment, API creation, containerization, and frontend integration.

**Note: Demo project – not deployed publicly**
---

## Tech Stack

### Machine Learning
- Python
- Pandas / NumPy
- Scikit-Learn
- ONNX Runtime

### Backend
- FastAPI
- ONNX inference
- Docker

### Frontend
- React (Vite)
- Axios

---

## 📊 Dataset

Bangalore House Price Dataset containing:

- total_sqft  
- bath  
- bhk  
- location  
- price  

The raw dataset contained missing values, inconsistent formats, and significant outliers.

---

## Exploratory Data Analysis

Key visualizations:

### 1. Price Distribution
Shows right-skewed pricing with luxury outliers.

Purpose:
- Understand skew
- Justify outlier removal

---

### 2. Area vs Price

Strong positive correlation between square footage and price with visible noise.

Purpose:
- Validate regression suitability
- Identify abnormal points

---

### 3. BHK vs Average Price

Average price increases with BHK count.

Purpose:
- Validate BHK as strong feature
- Used later for anomaly removal

---

### 4. Location Impact

Top Bangalore locations show 2–3× price variation.

Purpose:
- Justifies location encoding
- Rare locations merged into “other”

---

### 5. Actual vs Predicted

Scatter plot close to diagonal indicates good regression fit.

---

## Data Cleaning & Feature Engineering

Performed production-style preprocessing:

- Dropped high-null column (`society`)
- Removed rows with missing core features
- Converted `total_sqft` ranges to numeric
- Extracted BHK from size column
- Bathroom anomaly removal (bath > bhk + 2)
- Location-wise price_per_sqft outlier removal
- BHK price anomaly filtering
- Rare location grouping
- One-hot encoding of locations

Result: industry-grade clean dataset.

---

## Modeling

Models tried:

- Linear Regression (baseline)
- Random Forest Regressor

Final R² ≈ **0.77**

Model exported to **ONNX** for production inference.

---

## ONNX Inference

Instead of pickle, ONNX was used for:

- Language-agnostic deployment
- Faster inference
- Improved security
- Production portability

---

## FastAPI Backend

API Endpoint:

POST /predict


Input:

```json
{
  "sqft": 1200,
  "bhk": 2,
  "bath": 2,
  "location": "Whitefield"
}
```
Output:
```json
{
  "predicted_price_lakh": 80.64
}
```
---

## Dockerized Deployment

Backend fully containerized:

React → FastAPI → ONNX Runtime


## React Frontend

Simple UI:

Sqft input

BHK input

Bath input

Location input

Predict button

Displays estimated house price in real time.


## Architecture

React Frontend
        |
FastAPI Backend
        |
ONNX Runtime
        |
Regression Model


## ✅ Key Learnings

Real ML projects require heavy data cleaning

Deployment matters more than model accuracy

ONNX simplifies production inference

Docker removes environment issues

ML + Backend + Frontend = Product


### Author

Built by Shivam Pratap Singh
Full-Stack Developer transitioning into AI Product Engineering.