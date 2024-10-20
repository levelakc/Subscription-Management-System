// src/routes/members.js
const express = require('express');
const router = express.Router();
const Member = require('../models/memberModel');
const User = require('../models/userModel');
const Subscription = require('../models/subscriptionModel'); // Ensure this path is correct

// GET all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching members', error: err.message });
  }
});

// GET member by ID and populate user details
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id).populate('userId', 'fullName');
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.status(200).json(member);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching member details', error: err.message });
  }
});

// PUT update member by ID
router.put('/:id', async (req, res) => {
  const { email, city, userId, fullName } = req.body;

  try {
    // Find the member by ID
    const member = await Member.findById(req.params.id);

    if (!member) return res.status(404).json({ message: 'Member not found' });

    // Update the member details
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      { email, city, userId },
      { new: true }
    );

    if (!updatedMember) return res.status(404).json({ message: 'Member not found' });

    // If userId is provided, update the corresponding user's fullName
    if (userId) {
      await User.findByIdAndUpdate(userId, { fullName }, { new: true });
    }

    res.status(200).json(updatedMember);
  } catch (err) {
    res.status(400).json({ message: 'Error updating member', error: err.message });
  }
});

// DELETE member by ID and also delete the associated user and subscriptions
router.delete('/:id', async (req, res) => {
  try {
    // Find the member by ID
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Delete subscriptions associated with the member
    await Subscription.deleteMany({ memberId: req.params.id });

    // Delete the associated user if userId exists
    if (member.userId) {
      await User.findByIdAndDelete(member.userId);
    }

    // Delete the member
    await Member.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Member, associated user, and subscriptions deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting member', error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { email, city } = req.body;

  try {
    // Create a new member with the provided userId
    const newMember = new Member({ email, city });
    const savedMember = await newMember.save();

    res.status(201).json(savedMember);
  } catch (error) {
    res.status(400).json({ message: 'Error creating member', error });
  }
});

module.exports = router;