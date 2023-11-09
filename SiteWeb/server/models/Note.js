
const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    },
    color: {
        type: String
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    
}, { timestamps: true });

module.exports = mongoose.model('note', NoteSchema);