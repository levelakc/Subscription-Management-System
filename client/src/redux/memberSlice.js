import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching all members
export const fetchMembers = createAsyncThunk('members/fetchMembers', async () => {
  const response = await axios.get('http://localhost:8000/api/members');
  return response.data;
});

// Async thunk for fetching a single member
export const fetchMember = createAsyncThunk('members/fetchMember', async (id) => {
  const response = await axios.get(`http://localhost:8000/api/members/${id}`);
  return response.data;
});

// Async thunk for adding a member
export const addMember = createAsyncThunk('members/addMember', async (newMember) => {
  const response = await axios.post('http://localhost:8000/api/members', newMember);
  return response.data;
});

// Async thunk for editing a member
export const editMember = createAsyncThunk('members/editMember', async ({ id, updatedMember }) => {
  const response = await axios.put(`http://localhost:8000/api/members/${id}`, updatedMember);
  return response.data;
});

// Async thunk for deleting a member
export const deleteMember = createAsyncThunk('members/deleteMember', async (id) => {
  await axios.delete(`http://localhost:8000/api/members/${id}`);
  return id;
});

const memberSlice = createSlice({
  name: 'members',
  initialState: {
    members: [],
    currentMember: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.members = action.payload;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMember.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMember.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentMember = action.payload;
      })
      .addCase(fetchMember.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.members.push(action.payload);
      })
      .addCase(editMember.fulfilled, (state, action) => {
        state.members = state.members.map(member =>
          member._id === action.payload._id ? action.payload : member
        );
        state.currentMember = action.payload;
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.members = state.members.filter(member => member._id !== action.payload);
      });
  },
});

export default memberSlice.reducer;
