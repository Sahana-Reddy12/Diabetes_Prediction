import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import predictRoutes from "./routes/predictionRoutes.js"; 

dotenv.config();
const app = express();

// Connect MongoDB
connectDB();

//  Middleware
app.use(express.json());

// CORS (Frontend access)
app.use(
  cors({
    origin: ["http://localhost:5173"], // your React frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

//  Handle preflight requests
app.options("*", cors());

//  Log all requests (for debugging)
app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/predictions", predictRoutes); // 🔹 this path will be used in frontend

//  Default route
app.get("/", (req, res) => {
  res.send("🚀 Diabetes Prediction API is running successfully!");
});

//  Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
  console.log(`🌐 API Base URL: http://localhost:${PORT}`);
});
