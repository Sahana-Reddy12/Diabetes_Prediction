import os
import sys
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from src.exception import CustomException
from src.logger import get_logger
from src.utils import save_object

logger = get_logger(__name__)

class TrainPipeline:
    def __init__(self):
        self.model_file_path = os.path.join('artifacts', 'model.pkl')
        self.scaler_file_path = os.path.join('artifacts', 'preprocessor.pkl')

    def initiate_training(self, data_path):
        try:
            logger.info("🚀 Starting model training pipeline")

            # Load dataset
            df = pd.read_csv(data_path)
            logger.info(f"✅ Data loaded successfully with shape {df.shape}")

            #  Split into features and target
            X = df.drop(columns=['Outcome'])
            y = df['Outcome']

            logger.info("✅ Features and target variable separated")

            #  Train-test split
            X_train, X_test, y_train, y_test = train_test_split(
                X, y, test_size=0.2, random_state=42, stratify=y
            )

            #  Feature Scaling
            scaler = StandardScaler()
            X_train_scaled = scaler.fit_transform(X_train)
            X_test_scaled = scaler.transform(X_test)

            #  Model Training (Random Forest - best model)
            model = RandomForestClassifier(n_estimators=100, random_state=42)
            model.fit(X_train_scaled, y_train)

            #  Evaluation
            y_pred = model.predict(X_test_scaled)
            acc = accuracy_score(y_test, y_pred)
            cm = confusion_matrix(y_test, y_pred)
            report = classification_report(y_test, y_pred)

            logger.info(f"✅ Model Accuracy: {acc:.2f}")
            logger.info(f"🧩 Confusion Matrix:\n{cm}")
            logger.info(f"📊 Classification Report:\n{report}")

            # Save model and scaler
            os.makedirs("artifacts", exist_ok=True)
            save_object(self.model_file_path, model)
            save_object(self.scaler_file_path, scaler)

            logger.info("💾 Model and preprocessor saved successfully")

            print(f"✅ Model trained successfully with Accuracy: {acc:.2f}")
            print("📁 Model and Preprocessor saved inside 'artifacts' folder.")

        except Exception as e:
            logger.error("❌ Error occurred during model training")
            raise CustomException(e, sys)


if __name__ == "__main__":
    pipeline = TrainPipeline()
    pipeline.initiate_training(data_path="notebook/data/diabetes.csv")
