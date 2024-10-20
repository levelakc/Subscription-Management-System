const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true , unique: true},
  username: { type: String },
  password: { type: String }
});

module.exports = mongoose.model('User', userSchema);