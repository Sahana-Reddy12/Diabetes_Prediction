import express from "express";
import {
  savePrediction,
  getHistory,
  deletePrediction,
} from "../controllers/predictionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Save new prediction
router.post("/save", authMiddleware, savePrediction);

// Fetch user prediction history
router.get("/history", authMiddleware, getHistory);

// Delete a specific prediction
router.delete("/delete/:id", authMiddleware, deletePrediction);

//  Fallback for undefined routes
router.use((req, res) => {
  res.status(404).json({ success: false, message: "Prediction route not found" });
});

export default router;
