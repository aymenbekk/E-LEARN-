
const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
    promoID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'promo'
    },
    semestre: {
        type: String,
        required: true,
        enum: ["1", "2"]
    },
    classList:[{
            day: {
                type: String,
                required: true,
            },
            subjectID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'subject',
                required: true
            },
            teacherID:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'teacher',
                required: true
            },
            type: {
                type: String,
                required: true,
                enum: ['Cours', 'TD', 'TP']
            },
            groupID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'group',
                required: true
            },
            salleID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'salle',
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
        }]
}, { timestamps: true });

module.exports = mongoose.model('schedule', ScheduleSchema);