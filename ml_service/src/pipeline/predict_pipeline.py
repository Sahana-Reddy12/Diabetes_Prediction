import os
import sys
import pandas as pd
from src.exception import CustomException
from src.utils import load_object
from src.logger import get_logger

logger = get_logger(__name__)

class PredictPipeline:
    def __init__(self):
        try:
            self.model_path = os.path.join("artifacts", "model.pkl")
            self.preprocessor_path = os.path.join("artifacts", "preprocessor.pkl")
        except Exception as e:
            raise CustomException(e, sys)

    def predict(self, features):
        try:
            logger.info("Starting prediction process...")

            # Load the saved model and preprocessor
            model = load_object(self.model_path)
            preprocessor = load_object(self.preprocessor_path)

            logger.info("Model and preprocessor loaded successfully")

            # Transform input features
            scaled_features = preprocessor.transform(features)

            # Predict using trained model
            predictions = model.predict(scaled_features)
            logger.info("Prediction completed successfully")

            return predictions

        except Exception as e:
            logger.error("Error during prediction pipeline execution")
            raise CustomException(e, sys)


class CustomData:
    """
    This class is used to take user input and convert it into a DataFrame
    suitable for prediction.
    """
    def __init__(self, Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction, Age):
        self.Pregnancies = Pregnancies
        self.Glucose = Glucose
        self.BloodPressure = BloodPressure
        self.SkinThickness = SkinThickness
        self.Insulin = Insulin
        self.BMI = BMI
        self.DiabetesPedigreeFunction = DiabetesPedigreeFunction
        self.Age = Age

    def get_data_as_dataframe(self):
        try:
            data_dict = {
                "Pregnancies": [self.Pregnancies],
                "Glucose": [self.Glucose],
                "BloodPressure": [self.BloodPressure],
                "SkinThickness": [self.SkinThickness],
                "Insulin": [self.Insulin],
                "BMI": [self.BMI],
                "DiabetesPedigreeFunction": [self.DiabetesPedigreeFunction],
                "Age": [self.Age],
            }
            df = pd.DataFrame(data_dict)
            logger.info("User input converted to DataFrame successfully")
            return df
        except Exception as e:
            logger.error("Error converting user input to DataFrame")
            raise CustomException(e, sys)
