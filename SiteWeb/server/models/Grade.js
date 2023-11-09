
const mongoose = require('mongoose');

const gradeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
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

module.exports = mongoose.model('grade', gradeSchema);