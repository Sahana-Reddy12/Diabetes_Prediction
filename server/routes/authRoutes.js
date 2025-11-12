import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { sendOtp, resetPassword } from "../controllers/forgotPasswordController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/send-otp", sendOtp);
router.post("/reset-password", resetPassword);

export default router;
