import { useState, useEffect } from "react";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import { supabase } from "./supabaseClient.jsx";

export default function App() {
  const [user, setUser] = useState(null);

useEffect(() => {
  supabase.auth.getSession().then(({ data }) => {
    if (data.session) setUser(data.session.user);
  });

  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
  });

  return () => listener.subscription.unsubscribe();
}, []);


  if (user) return <Profile />;
  return <Login />;
}
