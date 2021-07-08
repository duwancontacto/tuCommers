const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },
  theme: {
    type: String,
    default: "light"
  },
  registerComplete: {
    type: Boolean,
    default: false
  },
  personalData: {
    type: Array,
    default: {}
  },
  bussinessData: {
    type: Array,
    default: {}
  },
  register: {
    type: Date,
    default: Date.now(),
  },

});

module.exports = mongoose.model("User", UserSchema);
