// import { useState, useEffect } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login.jsx";
// import Profile from "./pages/Profile.jsx";
// import { supabase } from "./supabaseClient.jsx";
// import OtpAuth from "./OtpAuth.jsx";

// export default function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Check session on mount
//     supabase.auth.getSession().then(({ data }) => {
//       if (data.session) setUser(data.session.user);
//     });

//     // Listen for auth state changes
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user ?? null);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Login route */}
//         <Route
//           path="/"
//           element={user ? <Navigate to="/profile" /> : <Login />}
//         />

//         {/* Protected profile route */}
//         <Route
//           path="/profile"
//           element={user ? <Profile /> : <Navigate to="/" />}
//         />
//         <Route path = "/otpPath" element = {<OtpAuth/>}></Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }



import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import OtpAuth from "./pages/OtpAuth.jsx";
import Verify from "./pages/Verify.jsx";
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
        <Route
          path="/"
          element={user ? <Navigate to="/profile" /> : <Login />}
        />

        {/* Profile page (protected) */}
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/" />}
        />

        {/* OTP login page */}
        <Route path="/otpPath" element={<OtpAuth />} />

        {/* Verify page: check magic link session */}
        <Route path="/verify" element={<Verify />} />
      </Routes>
    </BrowserRouter>
  );
}
