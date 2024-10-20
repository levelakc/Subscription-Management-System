const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Member = require('../models/memberModel'); // Import Member model

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users); // Send users as response
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

// GET user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user details', error: err.message });
  }
});

// POST new user
router.post('/', async (req, res) => {
  try {
    const { fullName } = req.body;

    if (!fullName) {
      return res.status(400).json({ message: 'Full name is required' });
    }

    // Create a new user with only the fullName
    const newUser = new User({ fullName ,username: '', password:'' });
    await newUser.save();

    res.status(201).json({ userId: newUser._id }); // Return only userId
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});


module.exports = router;
