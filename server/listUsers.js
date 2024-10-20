const mongoose = require('mongoose');
const User = require('./models/userModel'); // Adjust the path to your user model
const mongoURI = 'mongodb://admin:admin@localhost:27017/usersDB?authSource=admin';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', async () => {
  console.log('Connected to MongoDB');
  try {
    const users = await User.find({});
    console.log('Users:', users);
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    mongoose.connection.close();
  }
});
