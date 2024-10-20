const express = require('express');
const router = express.Router();
const Subscription = require('../models/subscriptionModel');

// GET all subscriptions
router.get('/', async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate('movieId')
      .populate({
        path: 'memberId',
        populate: {
          path: 'userId',
          model: 'User',
        },
      });
    res.json(subscriptions)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET subscriptions by movie ID
router.get('/movie/:movieId', async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ movieId: req.params.movieId })
      .populate({
        path: 'memberId',         // Populate the memberId field
        populate: {
          path: 'userId',         // Further populate the userId field within memberId
          model: 'User'
        }
      })
      .populate({
        path: 'movieId',          // Populate the movieId field to include movie details
        model: 'Movie'
      });

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


// POST a new subscription
router.post('/', async (req, res) => {
  try {
    const { memberId, movieId, date } = req.body;

    if (!memberId || !movieId || !date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newSubscription = new Subscription({ memberId, movieId, date });
    await newSubscription.save();
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(400).json({ message: 'Error creating subscription', error });
  }
});

// DELETE a subscription by ID
router.delete('/:id', async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    res.status(200).json({ message: 'Subscription deleted', subscription });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Fetch subscriptions by member ID
router.get('/member/:memberId', async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ memberId: req.params.memberId });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscriptions', error });
  }
});

module.exports = router;
