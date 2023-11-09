
const mongoose = require("mongoose");

const PromoSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
        //unique: true
    },
    speciality : {
        type: String,
        required: true
    },
    groupList : [{
        
       _id: false,
       groupID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group',
        required: true
       }
    }
    ],
    firstSubjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject'
    }],
    secondSubjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject'
    }],
    scholarYear: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ScholarYear'
    }
}, { timestamps: true });

module.exports = Promo = mongoose.model('promo', PromoSchema, 'PromoDB');