import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Profile.css";

const Profile = () => {
  const [aptData, setAptData] = useState([]);
  const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

  // Get user id and token from localStorage
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };


  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem("user"));
  if (userFromStorage) setUser(userFromStorage);
  const fetchAppointments = async () => {
    try {
      const userId = localStorage.getItem("id");
      const response = await axios.get(`http://localhost:8080/api/v1/appointment/history/${userId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setAptData(response.data.appointments || []);
      console.log("Appointments:", response.data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAptData([]);
    } finally {
      setLoading(false);
    }
  };

  fetchAppointments();
}, []);




  return (
    <div className="profile-container">
 {user && (
    <div className="user-info">
      <img
        src={user.avatar || "https://api.dicebear.com/7.x/initials/svg?seed=" + user.lastname}
        alt="User Avatar"
        className="avatar"
      />
      <div>
        <h2 className="user-name">{user.lastname}</h2>
        <p className="user-email">{user.email}</p>
        <p className='user-email'>Role:{user.role}</p>
        
      </div>
    </div>
  )}

  <h1 className="profile-heading">Your Appointment History</h1>

  {loading ? (
    <p className="loading-text">Loading appointments...</p>
  ) : aptData.length > 0 ? (
    <div className="overflow-x-auto">
      <div className="appointment-table-header">
        <div>#</div>
        <div>Reason</div>
        <div>Animal Name</div>
        <div>Status</div>
        <div>Date</div>
        <div>Location</div>
      </div>

      {aptData.map((item, index) => (
        <div key={index} className="appointment-row">
          <div>{index + 1}</div>
          <div>{item.reason}</div>
          <div>{item.animalname}</div>
          <div>
            <span
              className={`status-badge ${
                item.status === "Booked" ? "status-booked" : "status-other"
              }`}
            >
              {item.status}
            </span>
          </div>
          <div>{new Date(item.appointment_date).toLocaleDateString()}</div>
          <div className="capitalize">
            {`${item.village}, ${item.taluka}, ${item.district}`}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="no-data-text">No appointment history found.</p>
  )}
</div>

  );
};

export default Profile;
