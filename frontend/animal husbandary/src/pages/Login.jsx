import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // First step: State to hold form values
  const [Values, setValues] = useState({
    email:"",
    password: "",
  });

 // Second step: Handle input changes
  const change = (e) => {
    const { name, value } = e.target;
    setValues({
      ...Values,
      [name]: value,
    });
  }

  // third step perform the submit event, Third step: Handle form submission
  const submit = async()=>{
    try {
      if( 
        Values.email === ""||
        Values.password === ""
       
        
      ){
        alert("All fields are required")
      }
      else{
       // fouth step conect to the bakcend
       const response = await axios.post("http://localhost:8080/api/v1/sign-in",Values)
       
      const user = response.data.user || {};
       const { id, role, token ,email} = response.data;
      
       dispatch(authActions.login());
       dispatch(authActions.setUser({ id: user._id, role: user.role,  email : user.email }));
       
      
      // store the data in the localsotreage 
      localStorage.setItem("id",response.data.id)
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("role",response.data.role)
      localStorage.setItem("email",response.data.email)

      localStorage.setItem("user", JSON.stringify(response.data));
      console.log("Raw localStorage user:", localStorage.getItem("user"));

      
      
       if (role === "farmer") {
         navigate("/");
       } else if (role === "doctor") {
         navigate("/docdashboard");
       }  

      
      }
      
      
    } catch (error) {
      console.error("Full error:", error);
      const message = error.response?.data?.message || 
                     error.message || 
                     "Login failed. Please try again.";
      alert(message);}

      



  };  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Animal Husbandry Portal Login</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={Values.email}
              onChange={change}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={Values.password}
              onChange={change}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>

          <p className="auth-switch">
            Don't have an account?{" "}
            <a
              href="/signup"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              Sign up here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;