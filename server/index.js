const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/configDB');

// Import routers
const userRouter = require('./routes/userRouter');
const movieRouter = require('./routes/movieRouter');
const memberRouter = require('./routes/memberRouter');
const subscriptionRouter = require('./routes/subscriptionRouter');
const authRouter = require('./routes/authRouter'); // Ensure correct path

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRouter); // Ensure this is the correct path
app.use('/api/users', userRouter);
app.use('/api/movies', movieRouter);
app.use('/api/members', memberRouter);
app.use('/api/subscriptions', subscriptionRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
