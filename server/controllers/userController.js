const User = require('../models/userModel');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const checkPassword = async (req, res) => {
  try {
    const { username, password } = req.query;
    const user = await User.findOne({ username, password });
    res.json(!!user); // true if user exists, false otherwise
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getUsers,
  getUserById,
  checkPassword
};