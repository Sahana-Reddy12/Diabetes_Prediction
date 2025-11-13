import dotenv from "dotenv";
import User from "../models/userModel.js";
import { Resend } from "resend";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

// Send OTP
export const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000);

    user.resetOTP = otp;
    user.resetOTPExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    await resend.emails.send({
      from: "Diabetes App <onboarding@resend.dev>",
      to: email,
      subject: "Your OTP Code",
      html: `
        <h2>Password Reset Request</h2>
        <p>Your OTP is:</p>
        <h1 style="color:#4CAF50">${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `,
    });

    res.json({ success: true, message: "OTP sent successfully!" });
  } catch (error) {
    console.error("❌ OTP Error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    if (
      user.resetOTP !== parseInt(otp) ||
      Date.now() > user.resetOTPExpiry
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    user.password = newPassword;
    user.resetOTP = null;
    user.resetOTPExpiry = null;
    await user.save();

    res.json({ success: true, message: "Password reset successfully!" });
  } catch (error) {
    console.error("❌ Reset Error:", error);
    res.status(500).json({ success: false, message: "Failed to reset password" });
  }
};
