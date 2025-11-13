import os
import sys
import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

# Ensure current directory is in sys.path (for logger import)
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

# Import logger
from logger import get_logger

# Initialize Flask app and logger
app = Flask(__name__)
CORS(app)
logger = get_logger(__name__)

# Load model and scaler
MODEL_PATH = os.path.join("artifacts", "model.pkl")
SCALER_PATH = os.path.join("artifacts", "preprocessor.pkl")

try:
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)

    with open(SCALER_PATH, "rb") as f:
        scaler = pickle.load(f)

    logger.info("✅ Model and Scaler loaded successfully.")

except Exception as e:
    logger.exception(f"❌ Error loading model or scaler: {e}")
    raise e


@app.route("/predict", methods=["POST"])
def predict():
    try:
        logger.info("🔹 Received prediction request.")
        features = [float(x) for x in request.form.values()]
        logger.info(f"Received inputs: {features}")

        (
            Pregnancies, Glucose, BloodPressure, SkinThickness,
            Insulin, BMI, DiabetesPedigreeFunction, Age
        ) = features

        scaled = scaler.transform(np.array(features).reshape(1, -1))
        prediction = model.predict(scaled)[0]

        normal_ranges = {
            "Pregnancies": "0–10",
            "Glucose": "70–140 mg/dL",
            "BloodPressure": "80–130 mmHg",
            "SkinThickness": "10–50 mm",
            "Insulin": "15–276 μU/mL",
            "BMI": "18.5–24.9",
            "DiabetesPedigreeFunction": "< 0.6",
            "Age": "20–45 years",
        }

        def check_param(param, value):
            if param == "Glucose":
                if value > 140: return "🔴 High – risk"
                elif value < 70: return "🟡 Low"
                return "🟢 Normal"

            if param == "BMI":
                if value > 30: return "🔴 High (Overweight)"
                elif value < 18.5: return "🟡 Low"
                return "🟢 Normal"

            if param == "BloodPressure":
                if value > 130: return "🔴 High"
                elif value < 80: return "🟡 Low"
                return "🟢 Normal"

            if param == "Age":
                return "🟡 Moderate Risk (Older age)" if value > 45 else "🟢 Healthy"

            if param == "Insulin":
                if value > 276: return "🔴 High"
                elif value < 15: return "🟡 Low"
                return "🟢 Normal"

            if param == "DiabetesPedigreeFunction":
                return "🔴 High Genetic Risk" if value > 0.6 else "🟢 Normal"

            if param == "SkinThickness":
                if value > 50: return "🔴 High"
                elif value < 10: return "🟡 Low"
                return "🟢 Normal"

            if param == "Pregnancies":
                return "🟡 High (Pregnancy Risk)" if value > 10 else "🟢 Normal"

            return "🟢 Normal"

        overview = {}
        params = [
            "Pregnancies", "Glucose", "BloodPressure", "SkinThickness",
            "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"
        ]

        for i, param in enumerate(params):
            overview[param] = {
                "value": features[i],
                "normal_range": normal_ranges[param],
                "status": check_param(param, features[i]),
            }

        result = {
            "prediction": "Positive (Diabetic)" if prediction == 1 else "Negative (Non-Diabetic)",
            "emoji": "🩸" if prediction else "💚",
            "overview": overview,
        }

        logger.info(f"✅ Prediction completed: {result['prediction']}")
        return jsonify(result)

    except Exception as e:
        logger.exception(f"❌ Error during prediction: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    logger.info("🚀 Starting Flask Diabetes Prediction Service...")

    port = int(os.environ.get("PORT", 5000))  # Render gives dynamic PORT
    app.run(host="0.0.0.0", port=port)
