
const mongoose = require("mongoose");

const SalleSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Salle TD', 'Salle TP', 'Amphi']

    }
    
}, { timestamps: true });

module.exports = Salle = mongoose.model('salle', SalleSchema);