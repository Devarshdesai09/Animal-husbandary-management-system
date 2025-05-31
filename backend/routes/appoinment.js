const express = require("express");
const router = express.Router();
const appoinment = require('../models/appointment')
const sendEmail = require('../emailservices/emailser')
const user = require('../models/user');
const appointment = require("../models/appointment");


// Book an Appointment
// router.post("/appointment", async (req, res) => {
//     try {
//         const { user_id, doctor_id, animal_id,  appointment_date, status, reason,animalname,
//             state,
//             district,
//             taluka,
//             village, } = req.body;

      
//         // Check if appointment slot is already booked
//         // const existingAppointment = await appoinment.findById({   appointment_date });
//         // if (existingAppointment) {
//         //     return res.status(400).json({ error: "This time slot is already booked" });
//         // }

//         // Create new appointment
//         const newAppointment = new appoinment({
//             user_id,
//             appointment_date,
//             status,
//             reason,
//             animalname,
//             state,
//             district,
//             taluka,
//             village,
//         });

//         await newAppointment.save();
        
//         // const User = await user.findById(user_id);
//         // if (!User) {
//         //     return res.status(404).json({ error: "User not found" });
//         // }
//             return res.status(201).json({message: "appointment book successfully" });

//         //Send Email Notification
//         const subject = "📅 Appointment Confirmation - Animal Husbandry System";
//         const message = `Hello ,\n\nYour appointment has been successfully booked on ${appointment_date}.\n\n\nReason: ${reason}\n\nPlease wait for the doctor's confirmation.\n\nBest Regards,\nAnimal Care Team`;

//         await sendEmail(User.email, subject, message);

//         res.status(201).json({ message: "Appointment booked successfully", appoinment: newAppointment });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
router.post("/appointment", async (req, res) => {
    try {
      const {
        user_id,
        doctor_id,
        animal_id,
        appointment_date,
        status,
        reason,
        animalname,
        state,
        district,
        taluka,
        village,
      } = req.body;
  
      const newAppointment = new appoinment({
        user_id,
        doctor_id,
        appointment_date,
        status,
        reason,
        animalname,
        state,
        district,
        taluka,
        village,
      });
  
      await newAppointment.save();
  
      // ✅ Get user details for sending email
      const User = await user.findById(user_id);
      if (!User) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // ✅ Send email
      const subject = "📅 Appointment Confirmation - Animal Husbandry System";
      const message = `Hello ${User.name || "User"},\n\nYour appointment has been successfully booked on ${appointment_date}.\n\nReason: ${reason}\n\nPlease wait for the doctor's confirmation.\n\nBest Regards,\nAnimal Care Team`;
  
      await sendEmail(User.email, subject, message);
  
      // ✅ Return response only after sending the email
      res.status(201).json({
        message: "Appointment booked and email sent successfully",
        appointment: newAppointment,
      });
  
    } catch (error) {
      console.error("Error booking appointment:", error);
      res.status(500).json({ error: error.message });
    }
  });


  // GET /appointment/doctor/:doctorId
router.get("/appointment/doctor/:doctorId", async (req, res) => {
  const doctorId = req.params.doctorId;

  try {
    const appointments = await appointment.find({ doctor_id: doctorId });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments by doctor ID" });
  }
});

  
module.exports = router;
