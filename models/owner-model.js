const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  fullname: {
    type: String,
    reqired: true,
  },
  username: {
    type: String,
    reqired: true,
  },
  password: {
    type: String,
    reqired: true,
  },
  email: {
    type: String,
    reqired: true,
  },
  otherStaff: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("owner", ownerSchema);
