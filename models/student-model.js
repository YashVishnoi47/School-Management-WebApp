const mongoose = require("mongoose");

const studenSchema = mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
  },
  studentPassword: {
    type: String,
    required: true,
  },
  studentClass: {
    type: String,
  },
  studentNumber: {
    type: Number,
    required: true,
  },
  studentADD: {
    type: String,
    required: true,
  },
  class: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "class",
  }],
});

module.exports = mongoose.model("student", studenSchema);
