import React from 'react'
import './Docdashboard.css'; 
const Docdashboard = () => {
  return (
    <>

   <div className="doctor-form-container">
      <h2>Doctor Registration</h2>
      <form  className="doctor-form">
        <input type="text" name="name" placeholder="Full Name"  required />
        <input type="email" name="email" placeholder="Email"required />
        <input type="password" name="password" placeholder="Password"  required />
        <input type="text" name="phoneNumber" placeholder="Phone Number"  required />
        <input type="text" name="specialization" placeholder="Specialization" />
        <input type="text" name="qualification" placeholder="Qualification"  />
        <input type="text" name="experience" placeholder="Experience (e.g., 5 years)"  />
        <input type="number" name="fees" placeholder="Consultation Fees" />
        <textarea name="address" placeholder="Clinic Address"  required />
        
        <button type="submit">Register</button>
      </form>
    </div>
    </>
  )
}

export default Docdashboard