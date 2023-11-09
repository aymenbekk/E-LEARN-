
const mongoose = require("mongoose");
const { isEmail } = require("validator");

const StudentSchema = new mongoose.Schema({
    
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
    year: {
        type: String,
        required: true,
        enum: ['1', '2', '3', '4', '5']
    },  
    group: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    subjectS1List: [{
        subjectID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject'
        },
        noteCC: {
            type: Number,
            min: [0, 'Note can not be less than 0'],
            max: [20, 'Note ca not be greater than 20']
        },
        noteExam1: {
            type: Number,
            min: [0, 'Note can not be less than 0'],
            max: [20, 'Note ca not be greater than 20']
        },
        noteExam2: {
            type: Number,
            min: [0, 'Note can not be less than 0'],
            max: [20, 'Note ca not be greater than 20']
        },
    }],
    subjectS2List: [{
        subjectID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject'
        },
        noteCC: {
            type: Number,
            min: [0, 'Note can not be less than 0'],
            max: [20, 'Note ca not be greater than 20']
        },
        noteExam1: {
            type: Number,
            min: [0, 'Note can not be less than 0'],
            max: [20, 'Note ca not be greater than 20']
        },
        noteExam2: {
            type: Number,
            min: [0, 'Note can not be less than 0'],
            max: [20, 'Note ca not be greater than 20']
        },
    }],
    promoID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'promo'
    },
    groupID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group'
    }
}, { timestamps: true });

module.exports = Student = mongoose.model('student', StudentSchema, 'StudentDB');