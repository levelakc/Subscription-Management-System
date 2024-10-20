const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  movieId: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',  // Reference to the Movie model
    required: true,
  },
  memberId: {
    type: Schema.Types.ObjectId,
    ref: 'Member',  // Reference to the Member model
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = Subscription;
