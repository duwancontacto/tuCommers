import mongoose from "mongoose"

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
  role: {
    type: String,
    default: null
  },
  groupId: {
    type: String,
    default: null
  },

  register: {
    type: Date,
    default: Date.now(),
  },
  lastRegister: {
    type: Date,
    default: Date.now(),
  },


});

module.exports = mongoose.model("User", UserSchema);
