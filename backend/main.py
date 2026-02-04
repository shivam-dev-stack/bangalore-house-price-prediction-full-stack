from fastapi import FastAPI
from pydantic import BaseModel
import onnxruntime as rt
import numpy as np
import json

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load ONNX model once
sess = rt.InferenceSession("bangalore_house.onnx")
input_name = sess.get_inputs()[0].name

# Load columns
with open("columns.json","r") as f:
    columns = json.load(f)

# Request schema
class PredictRequest(BaseModel):
    sqft: float
    bhk: int
    bath: int
    location: str


def predict_price(features):
    arr = np.array(features, dtype=np.float32).reshape(1, -1)
    pred = sess.run(None, {input_name: arr})
    return round(float(pred[0].ravel()[0]), 2)


def predict_from_input(sqft, bath, bhk, location):

    x = np.zeros(len(columns))

    # IMPORTANT: same order as training
    x[0] = sqft
    x[1] = bath
    x[2] = bhk

    if location in columns:
        loc_index = columns.index(location)
        x[loc_index] = 1

    return predict_price(x)


@app.get("/")
def health():
    return {"status": "ok"}


@app.post("/predict")
def predict(req: PredictRequest):

    price = predict_from_input(
        req.sqft,
        req.bath,
        req.bhk,
        req.location
    )

    return {
        "predicted_price_lakh": price
    }
