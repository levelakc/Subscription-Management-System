import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, deleteMovie } from '../redux/movieSlice';
import { useNavigate } from 'react-router-dom';
import AddMovie from './AddMovie';
import SubscriberList from './SubscriberList';
import './Movies.css'; // Import the CSS file for styling

const Movies = () => {
  const [search, setSearch] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentView, setCurrentView] = useState('allMovies');
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  const handleSearch = () => {
    setFilteredMovies(
      movies.filter((movie) =>
        movie.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const handleAllMovies = () => {
    setSearch('');
    setFilteredMovies(movies);
    setCurrentView('allMovies');
  };

  const handleAddMovie = () => {
    setCurrentView('addMovie');
  };

  const handleMovieAdded = () => {
    setCurrentView('allMovies');
    dispatch(fetchMovies());
  };

  return (
    <div>
      <nav className="nav-buttons">
        <button onClick={handleAllMovies}>All Movies</button>
        <button onClick={handleAddMovie}>Add Movie</button>
        <span className="find-movie-label">Find Movie:</span>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Find</button>
      </nav>
      {currentView === 'allMovies' ? (
        <div className="movies-container">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div key={movie._id} className="movie-card">
                <div className="movie-image">
                  <img
                    src={movie.imageUrl}
                    alt={movie.name}
                    className="movie-img"
                  />
                  <div className="movie-actions">
                    <button onClick={() => navigate(`/main/movies/edit/${movie._id}`)}>Edit</button>
                    <button onClick={() => handleDelete(movie._id)}>Delete</button>
                  </div>
                </div>
                <div className="movie-details">
                  <h3>
                    {movie.name} ({movie.yearPremiered})
                  </h3>
                  <p>Genres: {movie.genres.join(', ')}</p>
                  <SubscriberList movieId={movie._id} />
                </div>
              </div>
            ))
          ) : (
            <p>No movies found</p>
          )}
        </div>
      ) : (
        <AddMovie onMovieAdded={handleMovieAdded} setCurrentView={setCurrentView} />
      )}
    </div>
  );
};

export default Movies;
