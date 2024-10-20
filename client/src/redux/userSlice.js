import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for user creation
export const createUser = createAsyncThunk('user/createUser', async (userData) => {
  try {
    const response = await axios.post('http://localhost:8000/api/users', userData);
    return response.data; // This should include the userId or any relevant data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error creating user');
  }
});

// Async thunk for user login
export const loginUser = createAsyncThunk('user/loginUser', async (userData) => {
  const response = await axios.post('http://localhost:8000/api/users/login', userData);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'idle',
    error: null
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Optionally, you can update the user state or perform other actions here
        // state.user = action.payload; // if needed
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
