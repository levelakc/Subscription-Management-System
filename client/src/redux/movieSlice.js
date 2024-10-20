// src/redux/movieSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get('http://localhost:8000/api/movies');
  return response.data;
});

export const fetchMovieById = createAsyncThunk('movies/fetchMovieById', async (movieId) => {
  const response = await axios.get(`http://localhost:8000/api/movies/${movieId}`);
  return response.data;
});

export const addMovie = createAsyncThunk('movies/addMovie', async (newMovie) => {
  try {
    const response = await axios.post('http://localhost:8000/api/movies', newMovie);
    return response.data;
  } catch (error) {
    console.error('Error adding movie:', error.response ? error.response.data : error.message);
    throw error;
  }
});

export const updateMovie = createAsyncThunk('movies/updateMovie', async (updatedMovie) => {
  const response = await axios.put(`http://localhost:8000/api/movies/${updatedMovie._id}`, updatedMovie);
  return response.data;
});

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id) => {
  console.log(`Deleting movie with ID: ${id}`); // Log the ID
  await axios.delete(`http://localhost:8000/api/movies/${id}`);
  return id;
});


const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex(movie => movie._id === action.payload._id);
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter(movie => movie._id !== action.payload);
      });
  },
});

export default movieSlice.reducer;
