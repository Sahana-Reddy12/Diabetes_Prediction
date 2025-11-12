import os
import sys
import pandas as pd
from sklearn.model_selection import train_test_split
from src.exception import CustomException
from src.logger import get_logger
from src.utils import save_object

logger = get_logger(__name__)

class DataIngestion:
    def __init__(self):
        self.train_data_path = os.path.join('artifacts', 'train.csv')
        self.test_data_path = os.path.join('artifacts', 'test.csv')
        self.raw_data_path = os.path.join('artifacts', 'data.csv')

    def initiate_data_ingestion(self):
        logger.info("Starting data ingestion process")
        try:
            # Load the cleaned diabetes dataset from artifacts
            data = pd.read_csv(self.raw_data_path)
            logger.info("Dataset loaded successfully from artifacts/data.csv")

            # Train-test split
            train_set, test_set = train_test_split(data, test_size=0.2, random_state=42)
            logger.info("Train-test split done successfully")

            # Save train and test data to artifacts
            train_set.to_csv(self.train_data_path, index=False, header=True)
            test_set.to_csv(self.test_data_path, index=False, header=True)

            logger.info("Train and test data saved in artifacts folder")

            return (
                self.train_data_path,
                self.test_data_path
            )

        except Exception as e:
            logger.error("Error occurred in Data Ingestion step")
            raise CustomException(e, sys)
