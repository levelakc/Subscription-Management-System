import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubscriptionsByMemberId } from '../redux/subscriptionSlice';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './MoviesWatched.css';

const MoviesWatched = ({ memberId }) => {
  const dispatch = useDispatch();
  const { subscriptions, status, error } = useSelector(state => state.subscriptions);

  const [moviesWatched, setMoviesWatched] = useState([]);

  useEffect(() => {
    if (memberId) {
      dispatch(fetchSubscriptionsByMemberId(memberId));
    }
  }, [dispatch, memberId]);

  useEffect(() => {
    if (status === 'succeeded' && subscriptions.length > 0) {
      const filteredSubscriptions = subscriptions.filter(sub => sub.memberId === memberId);

      const fetchMoviesDetails = async () => {
        try {
          const movieRequests = filteredSubscriptions.map(subscription =>
            axios.get(`http://localhost:8000/api/movies/${subscription.movieId}`)
          );

          const movieResponses = await Promise.all(movieRequests);

          const movies = movieResponses.map((response, index) => ({
            movieId: response.data._id, // Include movieId here
            movieName: response.data.name,
            date: new Date(filteredSubscriptions[index].date).toLocaleDateString()
          }));

          setMoviesWatched(movies);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      };

      fetchMoviesDetails();
    }
  }, [status, subscriptions, memberId]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error fetching movies watched: {error}</div>;

  return (
    <div>
      <h4>Movies Watched</h4>
      {moviesWatched.length > 0 ? (
        <ul>
          {moviesWatched.map((movie, index) => (
            <li key={index}>
              <Link to={`/main/movies/${movie.movieId}`}>{movie.movieName}</Link> - Date: {movie.date}
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies watched.</p>
      )}
    </div>
  );
};

export default MoviesWatched;
