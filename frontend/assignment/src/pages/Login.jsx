// import { useState } from "react";
// import { supabase } from "../supabaseClient.jsx";

// export default function Login() {
//   const [email, setEmail] = useState("");

//   const handleLogin = async () => {
//     if (!email) return alert("Enter your email");

//     const { error } = await supabase.auth.signInWithOtp({
//       email,
//       options: {
//         emailRedirectTo: "http://localhost:5173/otpPath"
//       }
//     });

//     if (error) alert(error.message);
//     else alert("Check your email and click the login link!");
//   };

//   return (
//     <div>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Enter email"
//       />
//       <button onClick={handleLogin}>Send Magic Link</button>
//     </div>
//   );
// }




import { useState } from "react";
import { supabase } from "../supabaseClient.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    if (!email) return setMessage("Enter your email");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:5173/verify", // redirect to Verify page
      },
    });

    if (error) setMessage(error.message);
    else setMessage("Check your email for the login link!");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />
      <button onClick={handleLogin} style={{ padding: "0.5rem 1rem" }}>
        Send Magic Link
      </button>
      {message && <p style={{ marginTop: "1rem", color: "blue" }}>{message}</p>}
    </div>
  );
}
