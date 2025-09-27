import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
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
        {/* Login route */}
        <Route
          path="/"
          element={user ? <Navigate to="/profile" /> : <Login />}
        />

        {/* Protected profile route */}
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
