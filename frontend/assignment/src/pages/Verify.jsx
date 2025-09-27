import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient.jsx";

export default function Verify() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        // Session exists → go to profile
        navigate("/profile");
      } else {
        // No session → redirect to OTP login
        navigate("/otpPath");
      }
    });
  }, []);

  return <p>Checking login status...</p>;
}
