import os
import sys
import pickle
from src.exception import CustomException
from src.logger import get_logger

logger = get_logger(__name__)

def save_object(file_path, obj):
    """
    Save any Python object (like model, preprocessor, etc.) using pickle
    """
    try:
        dir_path = os.path.dirname(file_path)
        os.makedirs(dir_path, exist_ok=True)

        with open(file_path, "wb") as file_obj:
            pickle.dump(obj, file_obj)
        logger.info(f"Object saved successfully at: {file_path}")

    except Exception as e:
        logger.error("Error while saving object")
        raise CustomException(e, sys)


def load_object(file_path):
    """
    Load a Python object (like model or preprocessor) from pickle file
    """
    try:
        with open(file_path, "rb") as file_obj:
            return pickle.load(file_obj)

    except Exception as e:
        logger.error("Error while loading object")
        raise CustomException(e, sys)
