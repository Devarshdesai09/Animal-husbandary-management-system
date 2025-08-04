import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Don't forget to import axios
import "./Login.css"; // Reuse the same CSS file

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
  });
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Changed from Values to formData
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (
        formData.firstname === "" || // Changed from Values to formData
        formData.lastname === "" ||
        formData.email === "" ||
        formData.password === "" ||
        formData.phoneNumber === "" ||
        formData.role === ""
      ) {
        alert("All fields are required");
      } else {
        // Connect to the backend
        const response = await axios.post(
          "http://localhost:8080/api/v1/sign-up",
          formData // Changed from Values to formData
        );
        console.log(response.data);
        if (formData.role === "doctor") {
          navigate("/docdashboard");
        } else {
          navigate("/login");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Fix-N-Meet SignUp Portal</h2>
        <form onSubmit={submit}>
          <div className="input-group">
            <label>First Name:</label>
            <input
              type="text"
              name="firstname" // Changed from "name" to "firstname"
              value={formData.firstname} // Changed from setFormData to formData
              onChange={change}
              required
              placeholder="Enter your first name"
            />
          </div>

          <div className="input-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastname" // Changed from "name" to "lastname"
              value={formData.lastname} // Changed from setFormData to formData
              onChange={change}
              required
              placeholder="Enter your last name"
            />
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email} // Changed from setFormData to formData
              onChange={change}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label>Phone No:</label>
            <input
              type="text"
              name="phoneNumber" // Changed from "username" to "phoneNumber"
              value={formData.phoneNumber} // Changed from setFormData to formData
              onChange={change}
              required
              placeholder="Enter your phone number"
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password} // Changed from setFormData to formData
              onChange={change}
              required
              placeholder="Create a password"
            />
          </div>

          <div className="input-group">
            <label>Role:</label>
            <select name="role" value={formData.role} onChange={change}>
              <option value="">Select a role</option>
              <option value="farmer">Farmer</option>
              <option value="veterinary">Veterinary Officer</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          <button type="submit" className="login-button">
            Sign Up
          </button>
          <p className="auth-switch">
            Already have an account?{" "}
            <a
              href="/login"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Log in here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;