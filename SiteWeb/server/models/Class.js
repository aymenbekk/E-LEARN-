
const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Cours', 'TD', 'TP']
    },
    salle: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    }
}, { timestamps: true });

//module.exports = mongoose.model('class', ClassSchema);