import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // needed for navigate
import "./UserList.css";

const socket = io("http://localhost:5000");

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleAudioCall = (userId, phone) => {
    const roomId = `room-${userId}-${Date.now()}`;
    socket.emit("join-call", roomId);
    navigate(`/call/${roomId}?type=audio`);
    alert(`Starting audio call with ${phone}`);
  };

  const handleVideoCall = (userId, phone) => {
    const roomId = `room-${userId}-${Date.now()}`;
    socket.emit("join-call", roomId);
    navigate(`/call/${roomId}?type=video`);
    alert(`Starting video call with ${phone}`);
  };

  if (loading) return <div className="loading-container">Loading users...</div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="userlist-container">
      <div className="userlist-card">
        <div className="userlist-header">
          <h2 className="userlist-title">Registered Users</h2>
          <p className="userlist-subtitle">Connect with other users</p>
        </div>

        {users.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <p>No users found</p>
          </div>
        ) : (
          <div className="users-grid">
            {users.map((user) => (
              <div key={user._id} className="user-card">
                <div className="user-info">
                  <div className="user-phone">{user.phone}</div>
                  <div className="user-details">
                    <span className="user-detail">
                      <span className="detail-label">Gender:</span> {user.Gender || "N/A"}
                    </span>
                    <span className="user-detail">
                      <span className="detail-label">DOB:</span> {user.dob || "N/A"}
                    </span>
                  </div>
                </div>
                <div className="user-actions">
                  <button 
                    onClick={() => handleAudioCall(user._id, user.phone)}
                    className="action-btn audio-btn"
                    title="Audio Call"
                  >
                    <span className="btn-icon">📞</span> Audio
                  </button>
                  <button 
                    onClick={() => handleVideoCall(user._id, user.phone)}
                    className="action-btn video-btn"
                    title="Video Call"
                  >
                    <span className="btn-icon">🎥</span> Video
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
