import { useState } from "react";
import { supabase } from "../supabaseClient.jsx";

export default function Login() {
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    if (!email) return alert("Enter your email");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:5173/profile"
      }
    });

    if (error) alert(error.message);
    else alert("Check your email and click the login link!");
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <button onClick={handleLogin}>Send Magic Link</button>
    </div>
  );
}
