import React, { useState } from 'react';
import "./Appointment.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Appointment = () => {
  const [query, setQuery] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorAppointments, setDoctorAppointments] = useState([]);

  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user?.id);

  //  Search doctors by query
  const handleSearch = async () => {
    try {
      const res = await axios.get(`https://appointment-booking-xzd3.onrender.com/api/v1/doctor/search?query=${query}`);
      setDoctors(res.data);
      setSelectedDoctor(null); // Reset selection
      setDoctorAppointments([]); // Reset appointments
    } catch (err) {
      console.error("Search error:", err);
      alert("Error fetching doctors");
    }
  };

  //  Fetch appointments for the selected doctor
  // const fetchDoctorAppointments = async (doctorId) => {
  //   try {
  //     const res = await axios.get(`http://localhost:8080/api/v1/appointment/doctor/${doctorId}`);
  //     setDoctorAppointments(res.data);
  //   } catch (error) {
  //     console.error("Failed to fetch appointments:", error);
  //   }
  // };

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search doctor by name, specialty or address"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      <div className="doctor-results">
        {doctors.length === 0 && <p>No doctors found. Try searching by name, specialization, or address.</p>}
        
        {doctors.map((doc) => (
          <div
            key={doc._id}
            className={`doctor-card ${selectedDoctor?._id === doc._id ? "selected" : ""}`}
            onClick={() => {
              setSelectedDoctor(doc);
              fetchDoctorAppointments(doc._id);
            }}
          >
            <h3>{doc.name}</h3><br />
            <p><strong>Id:</strong> {doc._id}</p> <br />
            <p><strong>Email:</strong> {doc.email}</p> <br />
            <p><strong>Specialization:</strong> {doc.specialization}</p><br />
            <p><strong>Qualification:</strong> {doc.qualification}</p><br />
            <p><strong>Experience:</strong> {doc.experience} years</p><br />
            <p><strong>Fees:</strong> ₹{doc.fees}</p><br />
            <p><strong>Address:</strong> {doc.address}</p><br />

            <Link to="/bookappointment" state={{ selectedDoctor: doc }}>
              <button className="select-btn">Book Appointment</button><br />
            </Link>
          </div>
        ))}
      </div>

     
    </>
  );
};

export default Appointment;
