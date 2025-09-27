import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import OtpAuth from "./pages/OtpAuth.jsx";
import Verify from "./pages/Verify.jsx";
import UserList from "./pages/UserList.jsx";
import { supabase } from "./supabaseClient.jsx";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check session on mount
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setUser(data.session.user);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Login page */}
        <Route path="/" element={user ? <Navigate to="/users" /> : <Login />} />

        {/* OTP login */}
        <Route path="/otpPath" element={<OtpAuth />} />

        {/* Verify magic link */}
        <Route path="/verify" element={<Verify />} />

        {/* Protected UserList page */}
        <Route path="/users" element={user ? <UserList /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
