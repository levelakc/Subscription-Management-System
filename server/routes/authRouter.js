const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); // Ensure correct path to the user model

// Handle login requests
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // You might want to handle token generation and sending user details here
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
