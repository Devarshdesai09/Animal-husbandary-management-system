// import React from "react";
// import "./AnimalHusbandry.css";
// import "../store"
// import { Link } from "react-router-dom";
// import {useSelector} from "react-redux"
// import { useDispatch } from "react-redux";
// import { authActions } from "../store/auth";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";  
// import { useState } from "react";
// import axios from "axios";

// const AnimalHusbandry = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth.user);
//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

//   return (
  
//     <>
//      <div className="animal-husbandry">
//      {/* Header Section */}
//      <header className="header">
//        <div className="logo">
//          <img src="animal.jpg" alt="Farm Logo" />
//          <h1>Green Valley Animal Husbandry</h1>
//        </div>
//        <nav className="nav">
//          <ul>
//            <li>
//             <Link to="/">
//             <a href="#home">Home</a>
//             </Link> 
//            </li>
//            <li>
//              <a href="#about">About</a>
//            </li>
//   {isLoggedIn ? (
//     <>
//   <li>
//     <a href="/Appointment">Appointment</a>
//   </li>

//   <li>
//     <a href="/profile">Profile</a>
//   </li>

//    <li>
//     <a href="/store">Store</a>
//   </li>

//  <button className="logoutbtn"
//  onClick={()=>{
//   dispatch(authActions.logout());
//   dispatch(authActions.setUser("user"));
//   localStorage.clear("id");
//   localStorage.clear("token");
//   localStorage.clear("role");
//   navigate("/")
// }}
//  >
//   <img src="log-out_5791613.png" alt="logout" className="logout-icon"  
//     width="20"             
//     height="20"
//     />
//  </button>
//   </>
  
// ) : (
//   <li>
//     <Link to="/login" className="login-button-header">
//       Login
//     </Link>
//   </li>
// )}
//          </ul>
//        </nav>
//      </header>

//      {/* Hero Section */}
//      <section className="hero">
//          <div className="hero-content">
//            <img src="" alt="" srcset="" />
//            <h2>Professional Animal Care Services</h2>
//            <p>Ensuring healthy livestock through modern farming techniques</p>
//            <button className="cta-button">Learn More</button>
//          </div>
//        </section>

//        {/* Features Section */}
//        <section className="features">
//          <h3>Our Services</h3>
//          <div className="features-grid">
//            <div className="feature-card">
//              <img src="/cattle-care.jpg" alt="Cattle Care" />
//              <h4>Cattle Management</h4>
//              <p>Comprehensive care and nutrition for dairy and beef cattle</p>
//            </div>
//            <div className="feature-card">
//              <img src="/poultry.jpg" alt="Poultry" />
//              <h4>Poultry Farming</h4>
//              <p>Modern techniques for chicken rearing and egg production</p>
//            </div>
//            <div className="feature-card">
//              <img src="/veterinary.jpg" alt="Veterinary" />
//              <h4>Veterinary Services</h4>
//              <p>24/7 healthcare services for all types of livestock</p>
//            </div>
//          </div>
//        </section>

//        {/* Footer Section */}
//        <footer className="footer">
//          <p>&copy; 2023 Green Valley Animal Husbandry. All rights reserved.</p>
//        </footer>
//      </div>
    
//     </>
//   );
// };

// export default AnimalHusbandry;
import React from "react";
import "./AnimalHusbandry.css";
import "../store"
import { Link } from "react-router-dom";
import {useSelector} from "react-redux"
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";  
import { useState } from "react";
import axios from "axios";
import Card from "./Card";
import Footer from "./Footer";


const AnimalHusbandry = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
  
    <>
     <div className="animal-husbandry">
     {/* Header Section */}
     <header className="header">
       <div className="logo">
         <img src="logo image.jpg" alt="Farm Logo" />
         <h1>Fix-N-Meet</h1>
       </div>
       <nav className="nav">
         <ul>
           <li>
            <Link to="/">
            <a href="#home">Home</a>
            </Link> 
           </li>
  {isLoggedIn ? (
    <>
  <li>
    <a href="/Appointment">Appointment</a>
  </li>

  <li>
    <a href="/profile">Profile</a>
  </li>

   <li>
    <a href="/store">Store</a>
  </li>

 <button className="logoutbtn"
 onClick={()=>{
  dispatch(authActions.logout());
  dispatch(authActions.setUser("user"));
  localStorage.clear("id");
  localStorage.clear("token");
  localStorage.clear("role");
  navigate("/")
}}
 >
  <img src="log-out_5791613.png" alt="logout" className="logout-icon"  
    width="20"             
    height="20"
    />
 </button>
  </>
  
) : (
  <li>
    <Link to="/login" className="login-button-header">
      Login
    </Link>
  </li>
)}
         </ul>
       </nav>
     </header>

    {/* Hero Section */}
<section className="hero">
  <div className="hero-content">
    <h3>Welcome To Fix-N-Meet</h3>
    <h2>
      Get <span>Appointment</span> <br /> Easy and Fast
    </h2>
    <p>"Book in a click, skip the wait — your time matters."</p>
    <button className="bookbtn">
      <Link to="/Appointment"><span>Get Appointment</span></Link>
    </button>
  </div>
</section>


       {/* Features Section */}
       <section className="about-container">
       <h1 className="heading">About Us</h1>
          <p className="description">
            Our appointment booking website is designed to make scheduling fast,
            simple, and hassle-free. Whether you're booking a consultation,
            service, or meeting — it's just a few clicks away.
          </p>
          <div className="services">
            <Card
              icon="material-symbols:person-search"
              title="Search For Doctor"
              description="Search for the Best Doctor Near You"
            />
            <Card
              icon="material-symbols:person-check"
              title="Check Doctor Profile"
              description="Check Doctor Profile"
            />
            <Card
              icon="material-symbols:calendar-clock"
              title="Book Appointment"
              description="Book Your Appointment with variable data"
            />
            <Card
              icon="material-symbols:heart-check-rounded"
              title="Get Treatment"
              description="Get your treatment"
            />
          </div>
       </section>

       {/* Footer Section */}
       <footer className="footer">
         <Footer/>
       </footer>
     </div>
    
    </>
  );
};

export default AnimalHusbandry;
