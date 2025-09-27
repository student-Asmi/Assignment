import supabase from "../config/supabaseClient.js";

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    });

    if (error) throw error;

    return res.json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, token } = req.body;

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    if (error) throw error;

    return res.json({ success: true, session: data.session });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
