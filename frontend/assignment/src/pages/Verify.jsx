import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient.jsx";

export default function Verify() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        // Logged in → redirect to UserList
        navigate("/users");
      } else {
        // No session → redirect to OTP login
        navigate("/");
      }
    });
  }, []);

  return <p>Checking login status...</p>;
}
