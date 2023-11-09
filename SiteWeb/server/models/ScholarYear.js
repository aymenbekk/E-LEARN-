
const mongoose = require("mongoose");

const scholarYearSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter Scholar Year name'],
        unique: true
    },
    promoList:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Promo'
    }]
}, { timestamps: true });

module.exports = ScholarYear = mongoose.model('scholarYear', scholarYearSchema);