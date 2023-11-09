
const mongoose = require("mongoose");
const { isEmail } = require("validator");

const AdminSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    }
}, { timestamps: true });

module.exports = Admin = mongoose.model('admin', AdminSchema);