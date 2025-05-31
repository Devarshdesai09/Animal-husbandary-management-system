const express = require("express");
const router = express.Router();
exports.router = router;
const VeterinaryOfficer = require("../models/doctor");
const appointment = require("../models/appointment");

//  1. Register a New Veterinary Officer
router.post("/doctor", async (req, res) => {
    try {
        const { name, email, password, phoneNumber, qualification, experience, specialization,  address , fees} = req.body;

        // Check if doctor already exists
        const existingDoctor = await VeterinaryOfficer.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ error: "Doctor already registered with this email" });
        }

        // Create new doctor
        const newDoctor = new VeterinaryOfficer({
            name, email, password, phoneNumber, qualification, experience, specialization, address , fees
        });

        await newDoctor.save();
        res.status(201).json({ message: "Doctor registered successfully", doctor: newDoctor });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
});

// 2. Get All Veterinary Officers
router.get("/getalldoctor", async (req, res) => {
    try {
        const doctors = await VeterinaryOfficer.find();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//  3. Get a Single Doctor by ID
router.get("/doctor/:id", async (req, res) => {
    try {
        const doctor = await VeterinaryOfficer.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



//4. Update a Doctor's Information
router.put("/updatedoctor/:id", async (req, res) => {
    try {
        const { name, phone, qualification, experience, specialization, address } = req.body;

        const updatedDoctor = await VeterinaryOfficer.findByIdAndUpdate(
            req.params.id,
            { name, phone, qualification, experience, specialization, address },
            { new: true }
        );

        if (!updatedDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.json(updatedDoctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Delete a Doctor
router.delete("/deletedoctor/:id", async (req, res) => {
    try {
        const deletedDoctor = await VeterinaryOfficer.findByIdAndDelete(req.params.id);
        if (!deletedDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.json({ message: "Doctor deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// search doctor 
router.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const doctors = await VeterinaryOfficer.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { address: { $regex: query, $options: "i" } },
      ],
    });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


module.exports = router;
