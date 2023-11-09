
const mongoose = require("mongoose");
const { isEmail } = require("validator");

const TeacherSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
        required: [true, 'Please enter the first name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please enter the last name']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    desc: {
        type: String,
    },
    subjects: [{
        _id: false,
        subjectID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subject'
        },
        type: {
            type: String,
            enum: ['Cours', 'TD', 'TP']
        }
    }
    ]
}, { timestamps: true });

module.exports = Teacher = mongoose.model('teacher', TeacherSchema, 'TeacherDB');