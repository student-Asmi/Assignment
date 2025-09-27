import supabase from "../config/supabaseClient.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// JWT utility
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Send OTP to email
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Supabase magic link / OTP
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });

    if (error) throw error;

    return res.json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, token } = req.body;

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    if (error) throw error;

    // Find or create user in MongoDB
    let user = await User.findOne({ email });
    if (!user) user = await User.create({ email, isVerified: true });
    else {
      user.isVerified = true;
      await user.save();
    }

    // Generate JWT
    const jwtToken = generateToken(user);

    return res.json({
      success: true,
      message: "OTP verified",
      token: jwtToken,
      user
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
