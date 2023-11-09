
const mongoose = require('mongoose');

const journalSchema = mongoose.Schema(
  {
    title: {
      type: String
    },
    body: {
        type: String
    },
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'userModel',
        required: true
    },
    userModel: {
        type: String,
        required: true,
        enum: ['admin', 'teacher']
    },
    promoID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'promo',
      required: true
  },
    groupID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group',
        required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('journal', journalSchema);