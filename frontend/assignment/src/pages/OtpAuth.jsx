import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient.jsx";

export default function OtpAuth() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = send OTP, 2 = verify OTP
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) return setMessage("Enter your email");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:5173/users", // final redirect
      },
    });

    if (error) setMessage(error.message);
    else {
      setMessage("OTP sent! Check your email.");
      setStep(2);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return setMessage("Enter OTP code");

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    if (error) setMessage(error.message);
    else {
      setMessage("Logged in successfully!");
      navigate("/users"); // redirect after OTP
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      {step === 1 && (
        <>
          <h2>Login via OTP</h2>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
          <button onClick={handleSendOtp} style={{ padding: "0.5rem 1rem" }}>
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Enter OTP</h2>
          <input
            type="text"
            placeholder="Enter OTP code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
          <button onClick={handleVerifyOtp} style={{ padding: "0.5rem 1rem" }}>
            Verify OTP
          </button>
        </>
      )}

      {message && <p style={{ marginTop: "1rem", color: "blue" }}>{message}</p>}
    </div>
  );
}
