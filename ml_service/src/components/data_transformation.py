import os
import sys
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler, LabelEncoder
from src.exception import CustomException
from src.logger import get_logger
from src.utils import save_object

logger = get_logger(__name__)

class DataTransformation:
    def __init__(self):
        self.preprocessor_obj_file_path = os.path.join('artifacts', 'preprocessor.pkl')

    def get_data_transformer_object(self):
        """Creates a StandardScaler object for numerical feature scaling."""
        try:
            scaler = StandardScaler()
            logger.info("StandardScaler object created successfully")
            return scaler

        except Exception as e:
            logger.error("Error in creating StandardScaler object")
            raise CustomException(e, sys)

    def initiate_data_transformation(self, train_path, test_path):
        try:
            logger.info("Starting data transformation process")

            # Reading train and test data
            train_df = pd.read_csv(train_path)
            test_df = pd.read_csv(test_path)

            logger.info("Train and test data loaded successfully")

            target_column_name = 'Outcome' 

            # Handle non-numeric columns before scaling
            for col in train_df.columns:
                if train_df[col].dtype == 'object':
                    le = LabelEncoder()
                    train_df[col] = le.fit_transform(train_df[col])
                    test_df[col] = le.transform(test_df[col])
                    logger.info(f"Encoded categorical column: {col}")

            # Split into X, y
            X_train = train_df.drop(columns=[target_column_name], axis=1)
            y_train = train_df[target_column_name]

            X_test = test_df.drop(columns=[target_column_name], axis=1)
            y_test = test_df[target_column_name]

            # Scaling
            scaler = self.get_data_transformer_object()
            X_train_scaled = scaler.fit_transform(X_train)
            X_test_scaled = scaler.transform(X_test)

            # Save the scaler
            save_object(
                file_path=self.preprocessor_obj_file_path,
                obj=scaler
            )

            logger.info("Preprocessor (StandardScaler) object saved successfully")

            return (
                X_train_scaled,
                X_test_scaled,
                y_train,
                y_test,
                self.preprocessor_obj_file_path
            )

        except Exception as e:
            logger.error("Error occurred during Data Transformation")
            raise CustomException(e, sys)
