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

    // ✅ Push appointment to user's appointments array
    await user.findByIdAndUpdate(user_id, {
      $push: { appointments: newAppointment._id }
    });

    // ✅ Get user details for sending email
    const User = await user.findById(user_id);
    if (!User) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ Send email
    const subject = "📅 Appointment Confirmation - Animal Husbandry System";
    const message = `Hello ${User.name || "User"},\n\nYour appointment has been successfully booked on ${appointment_date}.\n\nReason: ${reason}\n\nPlease wait for the doctor's confirmation.\n\nBest Regards,\nAnimal Care Team`;

    await sendEmail(User.email, subject, message);

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



const mongoose = require("mongoose");

// router.get('/appointment/user/:userId', async (req, res) => {
//   try {
//     const { userId } = req.params;
//     console.log("Fetching for userId:", userId);

//     const appointments = await appointment.find({
//       userId: new mongoose.Types.ObjectId(userId)
//     });

//     if (appointments.length === 0) {
//       return res.status(404).json({ message: "No appointments found for this user." });
//     }

//     res.json(appointments);
//   } catch (err) {
//     console.error("Error fetching appointments:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });
// routes/appointment.js

// Get all appointment history for a specific user


// router.get("/appointment/history", async (req, res) => {
//   try {
//     const { id } = req.headers; // user's ID from headers

//     if (!id) {
//       return res.status(400).json({ message: "User ID missing in headers" });
//     }

//     // ✅ Get all appointments for the user
//     const appointments = await appoinment.find({ user_id: id })
//       .populate("doctor_id", "name specialization email") // optional
//       .sort({ appointment_date: -1 }); // recent first

//     if (appointments.length === 0) {
//       return res.status(404).json({ message: "No appointment history found" });
//     }

//     res.status(200).json({
//       status: "success",
//       appointments,
//     });

//   } catch (error) {
//     console.error("Error fetching appointment history:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// GET /appointment/history/:id
router.get("/appointment/history/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const appointments = await appoinment
      .find({ user_id: id })
      .populate("doctor_id", "name email specialization")
      .sort({ appointment_date: -1 });

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointment history found" });
    }

    res.status(200).json({
      status: "success",
      appointments,
    });

  } catch (error) {
    console.error("Error fetching appointment history:", error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
