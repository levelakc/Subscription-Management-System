import axios from 'axios';

// Action to log in a user
export const loginUser = (username, password) => async dispatch => {
  try {
    const res = await axios.post('/api/login', { username, password });
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: 'LOGIN_FAIL',
      payload: err.response ? err.response.data.message : 'An error occurred'
    });
  }
};

// Action to add a user
export const addUser = (fullName) => async dispatch => {
  try {
    const res = await axios.post('/api/users', { fullName });
    dispatch({
      type: 'ADD_USER_SUCCESS',
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: 'ADD_USER_FAIL',
      payload: err.response ? err.response.data.message : 'An error occurred'
    });
  }
};
