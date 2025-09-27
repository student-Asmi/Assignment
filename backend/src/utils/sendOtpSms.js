// src/utils/sendOtpSms.js
import axios from "axios";

const sendOtpSms = async (phone, otp) => {
  try {
    const res = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        variables_values: otp,
        route: "otp",
        numbers: phone,
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ SMS sent:", res.data);
  } catch (err) {
    console.error("❌ Error sending SMS:", err.response?.data || err.message);
  }
};

export default sendOtpSms;
