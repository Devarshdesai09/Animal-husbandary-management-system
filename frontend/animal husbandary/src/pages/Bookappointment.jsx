import React, { useState } from 'react';
import "./Appointment.css"
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authActions } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Bookappointment = () => {

    const [query, setQuery] = useState("");
const [doctors, setDoctors] = useState([]);
// const [selectedDoctor, setSelectedDoctor] = useState(null);
  

    const navigate = useNavigate()
  
  const userId = useSelector((state) => state.auth.user?.id);

  const authState = useSelector((state) => state.auth);
  console.log("Auth state:", authState);
  

  const location = useLocation();
  const selectedDoctor = location.state?.selectedDoctor || null;


  const [formData, setFormData] = useState({
    user_id: userId || "",
    doctor_id: selectedDoctor?._id || "",
    animalname: '',
    appointment_date: '',
    status: 'Pending',
    reason: '',
    state: '',
    district: '',
    taluka: '',
    village: ''
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        user_id: userId,
        doctor_id: selectedDoctor._id,
      };

      const res = await axios.post('http://localhost:8080/api/v1/appointment', payload);
      alert('Appointment booked successfully!');
      console.log(res.data);
      navigate("/")
    } catch (err) {
      console.error(err);
      alert('Error booking appointment');
    }

   

}

  return (
    <>
         {/* <div> <h3>User Details</h3>
        <p><strong>User ID:</strong> {userId || "Not logged in"}</p>
    </div> */}
{selectedDoctor && (
  <div className="selected-doctor-summary">
    <h3>Booking Appointment With:</h3>
    <p><strong>Id:</strong> {selectedDoctor._id}</p>
    <p><strong>Email:</strong> {selectedDoctor.email}</p>
    <p><strong>Specialization:</strong> {selectedDoctor.specialization}</p>
  </div>
)}
      <div className="form-container">
    
        <h2>Veterinary Appointment Booking</h2>
        <form onSubmit={handleSubmit}>


        <div className="form-section">
            <h3>User Details</h3>
            <label>
              User Id:
              <input 
                type="text" 
                name="user_id" 
                placeholder={userId}
                value={formData.user_id} 
                onChange={handleChange} 
                required 
              />
            </label>
          </div>

            
          <div className="form-section">
            <h3>Doctor Details</h3>
            <label>
              Doctor Id:
              <input 
                type="text" 
                name="doctor_id" 
               placeholder={formData.doctor_id}
                value={formData.doctor_id} 
                onChange={handleChange} 
                required 
              />
            </label>
          </div>

          <div className="form-section">
            <h3>Animal Details</h3>
            <label>
              Animal Name:
              <input 
                type="text" 
                name="animalname" 
                value={formData.animalname} 
                onChange={handleChange} 
                required 
              />
            </label>
          </div>

          <div className="form-section">
            <h3>Appointment Details</h3>
            <label>
              Appointment Date:
              <input 
                type="text" 
                name="appointment_date" 
                value={formData.appointment_date} 
                onChange={handleChange} 
                required 
              />
            </label>
            <label>
              Reason:
              <textarea 
                name="reason" 
                value={formData.reason} 
                onChange={handleChange} 
                required 
              />
            </label>
          </div>

          <div className="form-section">
            <h3>Location Details</h3>
            <label>
              State:
              <input 
                type="text" 
                name="state" 
                value={formData.state} 
                onChange={handleChange} 
                required 
              />
            </label>
            <label>
              District:
              <input 
                type="text" 
                name="district" 
                value={formData.district} 
                onChange={handleChange} 
                required 
              />
            </label>
            <label>
              Taluka:
              <input 
                type="text" 
                name="taluka" 
                value={formData.taluka} 
                onChange={handleChange} 
                required 
              />
            </label>
            <label>
              Village:
              <input 
                type="text" 
                name="village" 
                value={formData.village} 
                onChange={handleChange} 
                required 
              />
            </label>
          </div>

          <button type="submit" className="submit-btn">Book Appointment</button>
        </form>
      </div>

    </>
  )
}

export default Bookappointment