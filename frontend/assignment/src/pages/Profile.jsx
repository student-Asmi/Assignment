// import { supabase } from "../supabaseClient.jsx";

// export default function Profile() {
//   const user = supabase.auth.getUser(); // optional, or use App.jsx state

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Welcome!</h2>
//       <p>You are logged in.</p>
//     </div>
//   );
// }



import { supabase } from "../supabaseClient.jsx";

export default function Profile() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome to your Profile!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
