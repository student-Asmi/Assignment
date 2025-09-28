import { useState } from "react";
import { supabase } from "../supabaseClient.jsx";
import "./Login.css"; // We'll create this CSS file

export default function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email) {
      setMessage("Please enter your email address");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: "http://localhost:5173/verify",
        },
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Check your email for the magic link!");
      }
    } catch (error) {
      setMessage("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Enter your email to sign in</p>
        </div>
        
        <div className="login-form">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            className="login-input"
            disabled={isLoading}
          />
          
          <button 
            onClick={handleLogin} 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Sending...
              </>
            ) : (
              "Send Magic Link"
            )}
          </button>
        </div>

        {message && (
          <div className={`login-message ${
            message.includes("Check your email") ? 'success' : 'error'
          }`}>
            {message}
          </div>
        )}

        <div className="login-footer">
          <p className="footer-text">
            You'll receive a magic link in your inbox
          </p>
        </div>
      </div>
    </div>
  );
}