import React, { useState } from 'react';
import './Docdashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Docdashboard = () => {
  const navigate = useNavigate();

  // Get the logged-in user ID from localStorage
  const userId = localStorage.getItem("id") || "";

  const [formData, setFormData] = useState({
    userId, // ✅ Save userId from localStorage
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    specialization: '',
    qualification: '',
    experience: '',
    fees: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST to backend
      const response = await axios.post('https://appointment-booking-xzd3.onrender.com/api/v1/doctor', formData);

      const doctorId = response.data?.doctor?._id || response.data?._id;

      // ✅ Save the new doctor ID for future use
      if (doctorId) {
        localStorage.setItem("doctorId", doctorId);
      }

      alert('Doctor registered successfully!');
      console.log("Doctor:", response.data);

      setFormData({
        userId,
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        specialization: '',
        qualification: '',
        experience: '',
        fees: '',
        address: ''
      });

      navigate('/login');
    } catch (error) {
      console.error('Error registering doctor:', error.response?.data || error.message);
      alert('Failed to register doctor. Please check details and try again.');
    }
  };

  return (
    <div className="doctor-form-container">
      <h2>Doctor Registration</h2>
      <form onSubmit={handleSubmit} className="doctor-form">

        {/* You can hide userId input if you don’t want users to modify it */}
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required 
         
        />

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={formData.specialization}
          onChange={handleChange}
        />

        <input
          type="text"
          name="qualification"
          placeholder="Qualification"
          value={formData.qualification}
          onChange={handleChange}
        />

        <input
          type="text"
          name="experience"
          placeholder="Experience (e.g., 5 years)"
          value={formData.experience}
          onChange={handleChange}
        />

        <input
          type="number"
          name="fees"
          placeholder="Consultation Fees"
          value={formData.fees}
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Clinic Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Docdashboard;
