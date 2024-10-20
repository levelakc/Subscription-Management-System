const express = require('express');
const router = express.Router();
const Movie = require('../models/movieModel');

// POST a new movie
router.post('/', async (req, res) => {
  const { name, yearPremiere, genres, imageUrl } = req.body;

  // Validate request data
  if (!name || !yearPremiere || !genres || !imageUrl) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newMovie = new Movie({ name, yearPremiere, genres, imageUrl });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add movie', error: err.message });
  }
});

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching movies', error: err.message });
  }
});

// Get movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching movie', error: err.message });
  }
});

// Update a movie
router.put('/:id', async (req, res) => {
  const { name, yearPremiered, genres, imageUrl } = req.body;
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { name, yearPremiered, genres, imageUrl },
      { new: true }
    );
    if (!updatedMovie) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: 'Error updating movie', error: err.message });
  }
});

// Delete a movie
router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting movie', error: err.message });
  }
});

module.exports = router;
