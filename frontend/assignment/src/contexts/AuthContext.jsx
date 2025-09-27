import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Send OTP
  const handleSendOtp = async (phone) => {
    try {
      const res = await axios.post("http://localhost:8000/send-otp", { phone });
      return res.data.message; // "OTP sent successfully"
    } catch (err) {
      throw err.response?.data?.message || "Error sending OTP";
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (phone, otp) => {
    try {
      const res = await axios.post("http://localhost:8000/verify-otp", {
        phone,
        otp,
      });

      setUser(res.data.user); // Save user info
      return res.data.message; // "OTP verified successfully"
    } catch (err) {
      throw err.response?.data?.message || "Invalid OTP";
    }
  };

  return (
    <AuthContext.Provider value={{ user, handleSendOtp, handleVerifyOtp }}>
      {children}
    </AuthContext.Provider>
  );
};
