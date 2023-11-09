
const mongoose = require('mongoose');

const fileSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      require: true,
      enum: ['Cours', 'TD', 'TP']
    },
    chapterID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chapter',
        required: true
    },
    subjectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',
        required: true
    },
    file_path: {
      type: String,
      required: true
    },
    file_mimetype: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('file', fileSchema);