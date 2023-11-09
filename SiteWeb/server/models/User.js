
const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, 'Please enter an email'],           
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'], 
        minlength: [6, 'Minimum password length must be 6 characters']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'userModel'
    },
    userModel: {
        type: String,
        required: true,
        enum: ['admin', 'student', 'teacher']
    }
})

module.exports = User = mongoose.model("user", UserSchema, 'AuthDB');