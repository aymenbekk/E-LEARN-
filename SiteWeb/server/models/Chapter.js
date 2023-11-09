
const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        unique: true
    },
    subjectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject'
    }
    
}, { timestamps: true });

module.exports = mongoose.model('chapter', ChapterSchema);