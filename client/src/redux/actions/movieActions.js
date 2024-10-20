import axios from 'axios';

// Base URL for your API
const BASE_URL = 'http://localhost:8000/api/movies';

// Action to fetch all movies
export const fetchMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(BASE_URL);
    dispatch({ type: 'FETCH_MOVIES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_MOVIES_FAILURE', payload: error.message });
  }
};

// Action to fetch a single movie by ID
export const fetchMovie = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    dispatch({ type: 'FETCH_MOVIE_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_MOVIE_FAILURE', payload: error.message });
  }
};

// Action to add a new movie
export const addMovie = (movie) => async (dispatch) => {
  try {
    const response = await axios.post(BASE_URL, movie);
    dispatch({ type: 'ADD_MOVIE_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'ADD_MOVIE_FAILURE', payload: error.message });
  }
};

// Action to edit an existing movie
export const editMovie = (id, updatedMovie) => async (dispatch) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedMovie);
    dispatch({ type: 'EDIT_MOVIE_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'EDIT_MOVIE_FAILURE', payload: error.message });
  }
};

// Action to delete a movie
export const deleteMovie = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    dispatch({ type: 'DELETE_MOVIE_SUCCESS', payload: id });
  } catch (error) {
    dispatch({ type: 'DELETE_MOVIE_FAILURE', payload: error.message });
  }
};
