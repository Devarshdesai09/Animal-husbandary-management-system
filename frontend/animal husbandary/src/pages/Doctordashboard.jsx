import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Doctordashboard.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import { useNavigate } from "react-router-dom";

const Doctordashboard = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const User = useSelector((state) => state.auth.user);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [aptData, setAptData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [doctorId, setDoctorId] = useState(null);

  const fetchAppointments = async () => {
    try {
      const userId = localStorage.getItem("id");

      // Get doctor details by user ID
      const doctorRes = await axios.get(
        `https://appointment-booking-xzd3.onrender.com/api/v1/doctor/get-doctor-by-user/${userId}`
      );
      const doctor = doctorRes.data;
      setDoctorId(doctor._id);

      // Get appointments for doctor
      const appointmentRes = await axios.get(
        `https://appointment-booking-xzd3.onrender.com/api/v1/appointment/doctor/${doctor._id}`
      );
      setAptData(appointmentRes.data || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAptData([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`https://appointment-booking-xzd3.onrender.com/api/v1/update-status/${id}`, {
        status,
        
      });
      fetchAppointments();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem("user"));
    if (userFromStorage) setUser(userFromStorage);
    fetchAppointments();
  }, []);

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        {user && (
          <div className="sidebar-profile">
            <img
              src={
                user.avatar ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${user.lastname}`
              }
              alt="Avatar"
              className="avatar"
            />
            <h3>
              Dr. {user.lastname} {user.firstname}
            </h3>
            <p>{user.email}</p>
          </div>
        )}
        <nav className="sidebar-links">
          <Link to="/doctordashboard">Appointments</Link>
          <a href="#">Settings</a>
          <button 
          onClick={()=>{
            dispatch(authActions.logout());
            dispatch(authActions.setUser("user"));
            localStorage.clear("id");
            localStorage.clear("token");
            localStorage.clear("role");
            navigate("/login")
          }}
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <h2>Appointments</h2>
        {loading ? (
          <p>Loading...</p>
        ) : aptData.length > 0 ? (
          <div className="appointment-cards">
            {aptData.map((item, index) => (
              <div key={item._id} className="appointment-card">
                <p><strong>#{index + 1}</strong></p>
                <p><strong>Apt Id :</strong>{item._id}</p>
                <p><strong>Reason:</strong> {item.reason}</p>
                <p><strong>Animal:</strong> {item.animalname}</p>
                <p><strong>Status:</strong> {item.status}</p>
                <p><strong>Date:</strong> {new Date(item.appointment_date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {item.village}, {item.taluka}, {item.district}</p>
                {item.status === "Pending" && (
                  <div className="action-buttons">
                    <button className="btn-approve" onClick={() => updateStatus(item._id, "approved")}>
                      Approve
                    </button>
                    <button className="btn-reject" onClick={() => updateStatus(item._id, "rejected")}>
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No appointments found.</p>
        )}
      </main>
    </div>
  );
};

export default Doctordashboard;
