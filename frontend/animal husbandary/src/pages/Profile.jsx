import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulating logged-in user ID; you should replace with context or token-based user info
  const userId = "currentUserId"; // Get this from auth context / localStorage / JWT

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get(`http://localhost:8080/api/user/${userId}`);
        const appointmentRes = await axios.get(`http://localhost:8080/api/appointment/user/${userId}`);
        setUser(userRes.data);
        setAppointments(appointmentRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/user/${userId}`);
      localStorage.clear();
      window.location.href = "/register";
    } catch (err) {
      console.error("Error deleting account:", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>

      {/* User Info */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <img src={user.profilePicture || "/default-avatar.png"} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      {/* Appointments */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Appointment History</h2>
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          appointments.map((app) => (
            <div key={app._id} className="border-b py-2">
              <p><strong>Doctor:</strong> {app.doctorName}</p>
              <p><strong>Date:</strong> {new Date(app.date).toLocaleString()}</p>
              <p><strong>Status:</strong> {app.status}</p>
            </div>
          ))
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={handleLogout}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Logout
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
