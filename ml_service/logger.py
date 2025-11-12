# import logging
# import os
# from datetime import datetime

# # Create logs folder if it doesn't exist
# LOG_DIR = "logs"
# os.makedirs(LOG_DIR, exist_ok=True)

# # Create a log file with timestamp
# LOG_FILE = f"{datetime.now().strftime('%Y_%m_%d_%H_%M_%S')}.log"
# LOG_FILE_PATH = os.path.join(LOG_DIR, LOG_FILE)

# # Logging configuration
# logging.basicConfig(
#     filename=LOG_FILE_PATH,
#     format="[%(asctime)s] %(lineno)d %(name)s - %(levelname)s - %(message)s",
#     level=logging.INFO,
# )

# def get_logger(name):
#     """Returns a logger instance with the given name"""
#     return logging.getLogger(name)
import logging
import os
from datetime import datetime

LOG_DIR = "logs"
os.makedirs(LOG_DIR, exist_ok=True)

LOG_FILE = f"{datetime.now().strftime('%Y_%m_%d_%H_%M_%S')}.log"
LOG_FILE_PATH = os.path.join(LOG_DIR, LOG_FILE)

# File logging
logging.basicConfig(
    filename=LOG_FILE_PATH,
    format="[%(asctime)s] %(lineno)d %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
)

# Console logging
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)
console_handler.setFormatter(logging.Formatter("[%(asctime)s] %(levelname)s - %(message)s"))
logging.getLogger().addHandler(console_handler)

def get_logger(name):
    return logging.getLogger(name)
