import os
import sys
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.model_selection import GridSearchCV
from src.exception import CustomException
from src.logger import get_logger
from src.utils import save_object

logger = get_logger(__name__)

class ModelTrainer:
    def __init__(self):
        self.model_file_path = os.path.join("artifacts", "model.pkl")

    def initiate_model_trainer(self, X_train, X_test, y_train, y_test):
        try:
            logger.info("Model training started...")

            # Define multiple models
            models = {
                "Logistic Regression": LogisticRegression(),
                "Random Forest": RandomForestClassifier(),
                "Gradient Boosting": GradientBoostingClassifier()
            }

            # Define hyperparameters for GridSearch
            params = {
                "Logistic Regression": {
                    "C": [0.1, 1.0, 10],
                    "solver": ["liblinear"]
                },
                "Random Forest": {
                    "n_estimators": [50, 100, 150],
                    "max_depth": [3, 5, 7]
                },
                "Gradient Boosting": {
                    "learning_rate": [0.01, 0.1, 0.2],
                    "n_estimators": [50, 100]
                }
            }

            best_model = None
            best_model_name = None
            best_score = 0

            # Try each model with GridSearchCV
            for model_name, model in models.items():
                logger.info(f"Training {model_name}...")
                grid = GridSearchCV(model, params[model_name], cv=5, scoring="accuracy")
                grid.fit(X_train, y_train)

                best_estimator = grid.best_estimator_
                y_pred = best_estimator.predict(X_test)
                acc = accuracy_score(y_test, y_pred)

                logger.info(f"{model_name} accuracy: {acc:.4f}")

                if acc > best_score:
                    best_score = acc
                    best_model = best_estimator
                    best_model_name = model_name

            logger.info(f"Best Model: {best_model_name} with accuracy: {best_score:.4f}")

            # Save the best model
            save_object(
                file_path=self.model_file_path,
                obj=best_model
            )

            logger.info(f"Model saved successfully at: {self.model_file_path}")

            # Evaluate final model
            y_pred_final = best_model.predict(X_test)
            cm = confusion_matrix(y_test, y_pred_final)
            report = classification_report(y_test, y_pred_final)

            logger.info(f"Confusion Matrix:\n{cm}")
            logger.info(f"Classification Report:\n{report}")

            return {
                "best_model_name": best_model_name,
                "best_model_accuracy": best_score,
                "confusion_matrix": cm,
                "classification_report": report,
                "model_path": self.model_file_path
            }

        except Exception as e:
            logger.error("Error occurred during model training process.")
            raise CustomException(e, sys)
