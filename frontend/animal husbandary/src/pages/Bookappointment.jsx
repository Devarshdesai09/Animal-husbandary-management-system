import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
// import vetImg from "/appointment.jpg"; 
import vetImg from "../assets/cardiologist_17.jpg"; // Adjust the path as necessary
import "./Bookappointment.css";

const Bookappointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = useSelector((state) => state.auth.user?.id);
  const selectedDoctor = location.state?.selectedDoctor || null;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    user_id: userId || "",
    doctor_id: selectedDoctor?._id || "",
    animalname: "",
    appointment_date: "",
    status: "Pending",
    reason: "",
    state: "",
    district: "",
    taluka: "",
    village: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        user_id: userId,
        doctor_id: selectedDoctor._id,
      };
      await axios.post("http://localhost:8080/api/v1/appointment", payload);
      alert("Appointment booked successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Please Fill All Details");
    }
  };

  const renderProgress = () => {
    const labels = ["Service", "Reason", "Location", "Confirm"];
    return (
      <div className="progress-container">
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${(step - 1) * 33.33}%` }} />
        </div>
        <div className="step-circles">
          {labels.map((label, i) => (
            <div key={i} className="progress-step">
              <div className={`circle ${step > i ? "active" : ""}`}>{i + 1}</div>
              <div className="label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
           <label>UserId:
              <input type="text" name="UserId" value={formData.user_id} onChange={handleChange} required />
            </label>
             <label>DoctorId:
              <input type="text" name="DoctorId" value={formData.doctor_id} onChange={handleChange} required />
            </label>
            <label>Animal Name:
              <input type="text" name="animalname" value={formData.animalname} onChange={handleChange} required />
            </label>
            <label>Appointment Date:
              <input type="date" name="appointment_date" value={formData.appointment_date} onChange={handleChange} required />
            </label>
          </>
        );
      case 2:
        return (
          <label>Reason:
            <textarea name="reason" value={formData.reason} onChange={handleChange} required />
          </label>
        );
      case 3:
        return (
          <>
            <label>State:
              <input type="text" name="state" value={formData.state} onChange={handleChange} required />
            </label>
            <label>District:
              <input type="text" name="district" value={formData.district} onChange={handleChange} required />
            </label>
            <label>Taluka:
              <input type="text" name="taluka" value={formData.taluka} onChange={handleChange} required />
            </label>
            <label>Village:
              <input type="text" name="village" value={formData.village} onChange={handleChange} required />
            </label>
          </>
        );
      case 4:
        return (
          <div className="preview">
            <h4>Confirm Details</h4>
            <p><strong>Animal:</strong> {formData.animalname}</p>
            <p><strong>Date:</strong> {formData.appointment_date}</p>
            <p><strong>Reason:</strong> {formData.reason}</p>
            <p><strong>Location:</strong> {formData.village}, {formData.taluka}, {formData.district}, {formData.state}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <h1>Book an Appointment</h1>
      
      <div className="page-container">
        <div className="form-section-container">
          <h2>Appointment Booking</h2>
          {selectedDoctor && (
            <div className="selected-doctor-summary">
              <h3>Booking With:</h3>
              <p><strong>ID:</strong> {selectedDoctor._id}</p>
              <p><strong>Email:</strong> {selectedDoctor.email}</p>
              <p><strong>Specialization:</strong> {selectedDoctor.specialization}</p>
            </div>
          )}
          {renderProgress()}
          <form onSubmit={handleSubmit}>
            <div className="form-section">{renderStep()}</div>
            <div className="button-group">
              {step > 1 && <button type="button" onClick={handleBack}>Back</button>}
              {step < 4 ? (
                <button type="button" onClick={handleNext}>Next</button>
              ) : (
                <button type="submit">Book Appointment</button>
              )}
            </div>
          </form>
        </div>
        <div className="image-side">
          <img src={vetImg} alt="Appointment" />
        </div>
      </div>
    </>
  );
};

export default Bookappointment;

