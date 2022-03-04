const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, lowercase: true, required: [true, "can't be blank"]},
  last_name: { type: String, lowercase: true, required: [true, "can't be blank"]},
  email: { type: String, lowercase: true, required: [true, "can't be blank"], unique: true },
  password: { type: String, required: [true, "can't be blank"]},
  contact_number: { type: String, default: null}, 
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);
