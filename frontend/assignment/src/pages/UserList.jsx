import { useEffect, useState } from "react";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/users");
        setUsers(res.data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleAudioCall = (userId) => {
    alert(`Starting audio call with user ${userId}`);
    // TODO: socket.emit("startAudioCall", { to: userId });
  };

  const handleVideoCall = (userId) => {
    alert(`Starting video call with user ${userId}`);
    // TODO: socket.emit("startVideoCall", { to: userId });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Registered Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.phone} | {u.Gender || "N/A"} | {u.dob || "N/A"}
            <button onClick={() => handleAudioCall(u._id)}>📞 Audio</button>
            <button onClick={() => handleVideoCall(u._id)}>🎥 Video</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
