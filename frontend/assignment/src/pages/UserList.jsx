import { useEffect, useState } from "react";
import axios from "axios";
import "./UserList.css";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genderFilter, setGenderFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/users/public");
        setUsers(res.data.users || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleAudioCall = (userId, phone) => {
    alert(`Starting audio call with ${phone}`);
    // WebRTC audio call implementation would go here
  };

  const handleVideoCall = (userId, phone) => {
    alert(`Starting video call with ${phone}`);
    // WebRTC video call implementation would go here
  };

  // Filter users based on gender and search term
  const filteredUsers = users.filter(user => {
    const matchesGender = genderFilter === "all" || 
                         user.Gender?.toLowerCase() === genderFilter.toLowerCase();
    const matchesSearch = user.phone?.includes(searchTerm) || 
                         user.Gender?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesGender && (searchTerm === "" || matchesSearch);
  });

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading users...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <p>{error}</p>
      <button onClick={() => window.location.reload()} className="retry-btn">
        Try Again
      </button>
    </div>
  );

  return (
    <div className="userlist-container">
      <div className="userlist-card">
        <div className="userlist-header">
          <h2 className="userlist-title">Registered Users</h2>
          <p className="userlist-subtitle">Connect with other users</p>
        </div>

        {/* Filters Section */}
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by phone or gender..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="gender-filters">
            <button 
              className={`filter-btn ${genderFilter === "all" ? "active" : ""}`}
              onClick={() => setGenderFilter("all")}
            >
              All
            </button>
            <button 
              className={`filter-btn ${genderFilter === "male" ? "active" : ""}`}
              onClick={() => setGenderFilter("male")}
            >
              Male
            </button>
            <button 
              className={`filter-btn ${genderFilter === "female" ? "active" : ""}`}
              onClick={() => setGenderFilter("female")}
            >
              Female
            </button>
          </div>
        </div>

        {/* Users Count */}
        <div className="users-count">
          Showing {filteredUsers.length} of {users.length} users
        </div>

        {filteredUsers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <p>No users found</p>
            <p className="empty-subtext">
              {searchTerm || genderFilter !== "all" 
                ? "Try adjusting your filters" 
                : "Be the first to join!"}
            </p>
          </div>
        ) : (
          <div className="users-grid">
            {filteredUsers.map((user) => (
              <div key={user._id} className="user-card">
                <div className="user-avatar">
                  {user.Gender === "female" ? "👩" : "👨"}
                </div>
                <div className="user-info">
                  <div className="user-phone">{user.phone}</div>
                  <div className="user-details">
                    <span className="user-detail">
                      <span className="detail-label">Gender:</span> 
                      <span className={`gender-tag ${user.Gender?.toLowerCase()}`}>
                        {user.Gender || "N/A"}
                      </span>
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
                    <span className="btn-icon">📞</span>
                    Audio
                  </button>
                  <button 
                    onClick={() => handleVideoCall(user._id, user.phone)}
                    className="action-btn video-btn"
                    title="Video Call"
                  >
                    <span className="btn-icon">🎥</span>
                    Video
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