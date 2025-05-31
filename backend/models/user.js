// here the user  is the farmer 

const mongoose = require("mongoose");

const baseUserSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true,
    },
    lastname : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String,
        required : true,
    },
    phoneNumber: {
        type: String,
        required : true
    },
    age : {
        type : Number,
    
    },
   
    role : {
        type : String,
        enum : ['farmer', 'doctor', 'admin'],
        default : 'farmer', 
        required: true
    }
}, { timestamps: true });

const BaseUser = mongoose.model('BaseUser', baseUserSchema);

module.exports = BaseUser;