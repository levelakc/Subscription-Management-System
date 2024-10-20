import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieById } from '../redux/movieSlice';
import { useParams } from 'react-router-dom';
import SubscriberList from './SubscriberList'; 

const SingleMovie = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector(state => state.movies.movies.find(movie => movie._id === id));
  const status = useSelector(state => state.movies.status);
  const error = useSelector(state => state.movies.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id));
    }
  }, [dispatch, id]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div>
      {movie ? (
        <div>
          <div className="movie-image">
            <img src={movie.imageUrl} alt={movie.name} className="movie-img" />
          </div>
          <div className="movie-details">
            <h2>{movie.name}</h2>
            <p>Year: {movie.yearPremiered}</p>
            <p>Genres: {movie.genres.join(', ')}</p>
            <SubscriberList movieId={movie._id} />
          </div>
        </div>
      ) : (
        <p>Movie not found.</p>
      )}
    </div>
  );
};

export default SingleMovie;
