import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth";
import AnimalHusbandry from "./components/AnimalHusbandry";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Appointment from "./pages/Appointment";
import Profile from "./pages/Profile";
import Bookappointment from "./pages/Bookappointment";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // on refresh, rehydrate from localStorage
    const id    = localStorage.getItem("id");
    const role  = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (id && role && token) {
      dispatch(authActions.login());
      dispatch(authActions.setUser({ id, role }));
    }
  }, [dispatch]);

  return (
    
      <Routes>
        <Route path="/"         element={<AnimalHusbandry />} />
        <Route path="/login"    element={<Login />}            />
        <Route path="/signup"   element={<SignUp />}           />
        <Route path="/appointment" element={<Appointment />}    />
        <Route path="/bookappointment" element={<Bookappointment />}    />
        <Route path="/profile" element={<Profile/>}    />

      </Routes>
  
  );
};

export default App;
