import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMovie } from '../redux/movieSlice';
import './AddMovie.css'; // Ensure to import the CSS file

const AddMovie = ({ setCurrentView }) => {
  const [name, setName] = useState('');
  const [yearPremiere, setYearPremiere] = useState('');
  const [genres, setGenres] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const dispatch = useDispatch();

  const handleAdd = async () => {
    if (!name || !yearPremiere || !genres || !imageUrl) {
      alert('Please fill in all fields before adding the movie.');
      return;
    }
  
    const genresArray = genres.split(',').map(genre => genre.trim()).filter(Boolean);
    const validYear = !isNaN(yearPremiere) && yearPremiere > 0 ? parseInt(yearPremiere, 10) : null;
  
    const newMovie = {
      name,
      yearPremiere: validYear, // Use valid year or null
      genres: genresArray,
      imageUrl,
    };
  
    if (!validYear) {
      alert('Please enter a valid year.');
      return;
    }
  
    try {
      await dispatch(addMovie(newMovie)).unwrap();
      alert('Movie added successfully!');
      setCurrentView('allMovies');
    } catch (error) {
      console.error('Failed to add movie:', error);
      alert('Failed to add movie. Please try again.');
    }
  };  

  const handleCancel = () => {
    setCurrentView('allMovies');
  };

  return (
    <div>
      <h2>Add Movie</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Year Premiered"
        value={yearPremiere}
        onChange={(e) => setYearPremiere(e.target.value)}
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
      <div className="button-group">
        <button className="styled-button" onClick={handleAdd}>Add Movie</button>
        <button className="styled-button" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default AddMovie;