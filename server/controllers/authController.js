import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/**
 *  Generate JWT Token
 * Includes id, name, and email so that backend can access user details safely.
 */
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "1d" }
  );
};

/**
 *  Register User
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, age, gender } = req.body;

    //  Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login instead.",
      });
    }

    //  Create new user
    const user = await User.create({ name, email, password, age, gender });

    //  Generate token with id, name, email
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
};

/**
 *  Login User
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first.",
      });

    //  Verify password
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });

    //  Generate token with full user info
    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error("🔥 Error logging in user:", error);
    res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
};
