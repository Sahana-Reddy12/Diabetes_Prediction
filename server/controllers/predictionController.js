import fs from "fs";
import path from "path";
import Prediction from "../models/prediction.js";
// LOGGING SETUP

// Create logs directory (shared with backend)
const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFilePath = path.join(logDir, "backend.log");

/**
 *  logs to both console and file with timestamp
 */
function logMessage(message) {
  const timestamp = new Date().toISOString();
  const log = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logFilePath, log);
  console.log(log.trim());
}

// CONTROLLER FUNCTIONS
export const savePrediction = async (req, res) => {
  try {
    const { inputs, result } = req.body;

    const newPrediction = await Prediction.create({
      userId: req.user.id,
      email: req.user.email,
      result,
      inputs,
      overview: {
        Age: {
          value: inputs.Age,
          normalRange: "20–45 years",
          status: inputs.Age > 45 ? "🟡 Moderate Risk (Older age)" : "🟢 Healthy",
        },
        BMI: {
          value: inputs.BMI,
          normalRange: "18.5–24.9",
          status: inputs.BMI > 24.9 ? "🔴 High (Overweight)" : "🟢 Normal",
        },
        BloodPressure: {
          value: inputs.BloodPressure,
          normalRange: "80–130 mmHg",
          status: inputs.BloodPressure < 80 ? "🟡 Low" : "🟢 Normal",
        },
        DiabetesPedigreeFunction: {
          value: inputs.DiabetesPedigreeFunction,
          normalRange: "< 0.6",
          status: inputs.DiabetesPedigreeFunction > 0.6 ? "🔴 High Genetic Risk" : "🟢 Normal",
        },
        Glucose: {
          value: inputs.Glucose,
          normalRange: "70–140 mg/dL",
          status: inputs.Glucose < 70 ? "🟡 Low" : "🟢 Normal",
        },
        Insulin: {
          value: inputs.Insulin,
          normalRange: "15–276 μU/mL",
          status: inputs.Insulin > 276 ? "🔴 High" : "🟢 Normal",
        },
        Pregnancies: {
          value: inputs.Pregnancies,
          normalRange: "0–10",
          status: inputs.Pregnancies > 10 ? "🟡 High (Pregnancy Risk)" : "🟢 Normal",
        },
        SkinThickness: {
          value: inputs.SkinThickness,
          normalRange: "10–50 mm",
          status: inputs.SkinThickness > 50 ? "🔴 High" : "🟢 Normal",
        },
      },
    });

    // Log success
    logMessage(`🟢 [SAVE] Prediction saved for user ${req.user.email}: ${result}`);

    res.status(201).json({
      success: true,
      message: "Prediction saved successfully",
      prediction: newPrediction,
    });
  } catch (error) {
    logMessage(`❌ [SAVE ERROR] Failed to save prediction for ${req.user?.email || "unknown user"}: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Fetch user prediction history
export const getHistory = async (req, res) => {
  try {
    const history = await Prediction.find({ userId: req.user.id }).sort({ createdAt: -1 });

    logMessage(`📜 [HISTORY] Fetched ${history.length} predictions for ${req.user.email}`);

    res.status(200).json({ success: true, history });
  } catch (error) {
    logMessage(`❌ [HISTORY ERROR] Failed to fetch history for ${req.user.email}: ${error.message}`);
    res.status(500).json({ success: false, message: "Error fetching history" });
  }
};

// Delete a prediction by ID
export const deletePrediction = async (req, res) => {
  try {
    const prediction = await Prediction.findById(req.params.id);

    if (!prediction) {
      logMessage(`⚠️ [DELETE] Attempted to delete non-existing prediction: ${req.params.id}`);
      return res.status(404).json({ success: false, message: "Prediction not found" });
    }

    await Prediction.findByIdAndDelete(req.params.id);

    logMessage(`🗑️ [DELETE] Prediction deleted by ${req.user.email} (ID: ${req.params.id})`);

    res.json({ success: true, message: "Prediction deleted successfully" });
  } catch (error) {
    logMessage(`❌ [DELETE ERROR] Failed to delete prediction ${req.params.id}: ${error.message}`);
    res.status(500).json({ success: false, message: "Error deleting record" });
  }
};
