import { useContext, useState } from "react";
import { AuthContext } from "./contexts/AuthContext";

function OtpAuth() {
  const { handleSendOtp, handleVerifyOtp, user } = useContext(AuthContext);

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(0); // 0 = phone input, 1 = otp input
  const [message, setMessage] = useState("");

  const sendOtp = async () => {
    try {
      const msg = await handleSendOtp(phone);
      setMessage(msg);
      setStep(1);
    } catch (err) {
      setMessage(err);
    }
  };

  const verifyOtp = async () => {
    try {
      const msg = await handleVerifyOtp(phone, otp);
      setMessage(msg);
    } catch (err) {
      setMessage(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {step === 0 && (
        <>
          <input
            type="text"
            placeholder="Enter phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}
      {step === 1 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
      <p>{message}</p>
      {user && <p> Welcome {user.phone}</p>}
    </div>
  );
}

export default OtpAuth;
