// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function UserList() {
//   const [users, setUsers] = useState([]);

//  useEffect(() => {
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/api/users/public");
//       console.log("API Response:", res.data);
//       setUsers(res.data.users || []);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//     }
//   };
//   fetchUsers();
// }, []);


//   const handleAudioCall = (userId) => {
//     alert(`Starting audio call with user ${userId}`);
//     // TODO: socket.emit("startAudioCall", { to: userId });
//   };

//   const handleVideoCall = (userId) => {
//     alert(`Starting video call with user ${userId}`);
//     // TODO: socket.emit("startVideoCall", { to: userId });
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Registered Users</h2>
//       <ul>
//         {users.map((u) => (
//           <li key={u._id}>
//             {u.phone} | {u.Gender || "N/A"} | {u.dob || "N/A"}
//             <button onClick={() => handleAudioCall(u._id)}>📞 Audio</button>
//             <button onClick={() => handleVideoCall(u._id)}>🎥 Video</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/users/public");
        setUsers(res.data.users || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleAudioCall = (userId) => {
    const roomId = `room-${userId}-${Date.now()}`; // unique room id
    socket.emit("join-call", roomId);
    navigate(`/call/${roomId}?type=audio`);
  };

  const handleVideoCall = (userId) => {
    const roomId = `room-${userId}-${Date.now()}`;
    socket.emit("join-call", roomId);
    navigate(`/call/${roomId}?type=video`);
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Registered Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u._id} style={{ marginBottom: "10px" }}>
              {u.phone} | {u.Gender || "N/A"} | {u.dob || "N/A"}{" "}
              <button onClick={() => handleAudioCall(u._id)} style={{ marginLeft: "10px" }}>
                📞 Audio
              </button>
              <button onClick={() => handleVideoCall(u._id)} style={{ marginLeft: "5px" }}>
                🎥 Video
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
