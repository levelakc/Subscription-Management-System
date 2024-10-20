// src/seedDatabase.js
const mongoose = require('mongoose');
const User = require('./models/userModel');
const Movie = require('./models/movieModel');
const Member = require('./models/memberModel');
const Subscription = require('./models/subscriptionModel');

const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/usersDB');

    await User.deleteMany({});
    await Movie.deleteMany({});
    await Member.deleteMany({});
    await Subscription.deleteMany({});

    const users = [
      { fullName: 'John Doe', username: 'john', password: 'password' },
      { fullName: 'Jane Smith', username: 'jane', password: 'password' },
      { fullName: 'Alice Johnson', username: 'alice', password: 'password' },
      { fullName: 'Bob Brown', username: 'bob', password: 'password' },
    ];

    const createdUsers = await User.insertMany(users);

    const movies = [
      { name: 'Inception', yearPremiered: 2010, genres: ['Action', 'Sci-Fi'], imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRRyuWmayVBvqjd1MxTKpRgauq2cCtUzb7Q9QvaFTkAuxAU_EYMoCE3wBuJeftxIzf0grreIw' },
      { name: 'The Matrix', yearPremiered: 1999, genres: ['Action', 'Sci-Fi'], imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCWXVvfvZR3oe7PCMM0exwV0dObOTKvLfSM-bjvKpQ1VegKXuCtq6aBrxqbIgUNxMbfavy' },
      { name: 'Interstellar', yearPremiered: 2014, genres: ['Adventure', 'Drama'], imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSngBJ0B7UDrLUkDlp6DCQLsEYuWR-DiHwbnxFFCniB3HiP3f3NZmR1-lKSC34ge6YXu4LX' },
      { name: 'The Dark Knight', yearPremiered: 2008, genres: ['Action', 'Crime'], imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTfE_qrYMBZ_JB8om-34WGaZARhpX26yWRttqIDvn4_7l--UzX8mxKcPrc59IcvTpEA_G8gPA' },
    ];

    const createdMovies = await Movie.insertMany(movies);

    const members = [
      { email: 'john@example.com', city: 'New York', userId: createdUsers[0]._id },
      { email: 'jane@example.com', city: 'Los Angeles', userId: createdUsers[1]._id },
      { email: 'alice@example.com', city: 'Chicago', userId: createdUsers[2]._id },
      { email: 'bob@example.com', city: 'San Francisco', userId: createdUsers[3]._id },
    ];

    const createdMembers = await Member.insertMany(members);

    const subscriptions = [
      { movieId: createdMovies[0]._id, memberId: createdMembers[0]._id, date: '01/01/2022' },
      { movieId: createdMovies[1]._id, memberId: createdMembers[1]._id, date: '02/01/2022' },
      { movieId: createdMovies[2]._id, memberId: createdMembers[2]._id, date: '03/01/2022' },
      { movieId: createdMovies[3]._id, memberId: createdMembers[3]._id, date: '04/01/2022' },
    ];

    await Subscription.insertMany(subscriptions);

    console.log('Database seeded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
};

seedDatabase();
