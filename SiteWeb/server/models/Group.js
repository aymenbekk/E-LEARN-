
const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    studentNumber: {
        type: Number,
        required: true
    },
    promoID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'promo'
    }
    
}, { timestamps: true });

module.exports = Group = mongoose.model('group', GroupSchema);