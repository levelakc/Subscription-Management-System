const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  email: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Member', memberSchema);