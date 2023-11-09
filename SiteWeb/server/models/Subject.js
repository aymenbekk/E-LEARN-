
const mongoose = require("mongoose")

const SubjectSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    semestre: {
        type: String,
        required: true
    },
    promoID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'promo',
        required: true
    },
    percentage: {
        cc: {
            type: Number,
            max: [100, 'Percentage can not be greater than 100%']
        },
        exam1: {
            type: Number,
            max: [100, 'Percentage can not be greater than 100%']
        },
        exam2: {
            type: Number,
            max: [100, 'Percentage can not be greater than 100%']
        }
    },
    ressources: [{
        ressource: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ressources'
        }
    }],
    teachers: [{
        _id: false,
        teacherID : {
            //type: [String],
            //enum:["tdTeacher", "courseTeacher"],
            //ref:'Teacher'
            type: mongoose.Schema.Types.ObjectId,
            ref: 'teacher'
        },
        type: {
            type: String,
            enum: ['Cours', 'TD', 'TP']
        }
    }]
}, { timestamps: true });

module.exports = Subject = mongoose.model('subject', SubjectSchema, 'SubjectDB');