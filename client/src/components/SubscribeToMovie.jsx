// src/components/SubscribeToMovie.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/movieSlice';
import { addSubscription } from '../redux/subscriptionSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SubscribeToMovie = ({ memberId }) => {
  const [selectedMovie, setSelectedMovie] = useState('');
  const [subscriptionDate, setSubscriptionDate] = useState(new Date().toISOString().split('T')[0]);
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const navigate = useNavigate(); // Add useNavigate hook

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSubscription({ memberId, movieId: selectedMovie, date: subscriptionDate }))
      .then(() => {
        navigate('/main/movies'); // Navigate after successful subscription
      })
      .catch((error) => {
        console.error('Subscription failed:', error);
      });
    setSelectedMovie('');
    setSubscriptionDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div>
      <h4>Add Subscription</h4>
      <form onSubmit={handleSubmit}>
        <label>
          Movie:
          <select value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)}>
            <option value="">Select a movie</option>
            {movies.map((movie) => (
              <option key={movie._id} value={movie._id}>{movie.name}</option>
            ))}
          </select>
        </label>
        <label>
          Date:
          <input
            type="date"
            value={subscriptionDate}
            onChange={(e) => setSubscriptionDate(e.target.value)}
          />
        </label>
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
};

export default SubscribeToMovie;
