import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/send-otp", { email });
      setMessage(res.data.message);
      setOtpSent(true);
    } catch (error) {
      setMessage("Error sending OTP. Try again.");
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      setMessage(res.data.message);
    } catch (error) {
      setMessage("Invalid OTP or expired. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-4">
        <h2 className="text-3xl font-semibold text-teal-400 text-center">
          🔑 Forgot Password
        </h2>

        {!otpSent ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-teal-400"
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-teal-500 hover:bg-teal-600 py-3 rounded-lg font-semibold transition duration-200"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-teal-400"
            />
            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-teal-400"
            />
            <button
              onClick={handleResetPassword}
              className="w-full bg-teal-500 hover:bg-teal-600 py-3 rounded-lg font-semibold transition duration-200"
            >
              Reset Password
            </button>
          </>
        )}

        {message && (
          <p className="text-center text-sm text-yellow-400 mt-3">{message}</p>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
