import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateMovie, fetchMovies } from '../redux/movieSlice';

const EditMovie = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movie = useSelector((state) => state.movies.movies.find((movie) => movie._id === id));

  const [name, setName] = useState('');
  const [yearPremiered, setYearPremiered] = useState('');
  const [genres, setGenres] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!movie) {
      dispatch(fetchMovies());
    } else {
      setName(movie.name);
      setYearPremiered(movie.yearPremiered);
      setGenres(movie.genres.join(', '));
      setImageUrl(movie.imageUrl);
    }
  }, [movie, dispatch]);

  const handleUpdateMovie = async () => {
    const updatedMovie = {
      _id: id,
      name,
      yearPremiered,
      genres: genres.split(',').map((genre) => genre.trim()),
      imageUrl,
    };

    try {
      await dispatch(updateMovie(updatedMovie)).unwrap();
      alert('Movie updated successfully!');
      navigate('/main/movies');
    } catch (error) {
      alert('Failed to update movie. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/main/movies');
  };

  return (
    <div>
      <h2>Edit Movie</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Year Premiered"
        value={yearPremiered}
        onChange={(e) => setYearPremiered(e.target.value)}
      />
      <input
        type="text"
        placeholder="Genres (comma separated)"
        value={genres}
        onChange={(e) => setGenres(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={handleUpdateMovie}>Update Movie</button>
      <button onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancel</button>
    </div>
  );
};

export default EditMovie;
