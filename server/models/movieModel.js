const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: String,
  yearPremiered: Number,
  genres: [String],
  imageUrl: String
});

module.exports = mongoose.model('Movie', movieSchema);
