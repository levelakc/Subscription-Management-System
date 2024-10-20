import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks
export const fetchSubscriptions = createAsyncThunk(
  'subscriptions/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8000/api/subscriptions');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSubscriptionsByMemberId = createAsyncThunk(
  'subscriptions/fetchByMemberId',
  async (memberId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/subscriptions/member/${memberId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addSubscription = createAsyncThunk(
  'subscriptions/addSubscription',
  async (subscriptionData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/subscriptions', subscriptionData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    subscriptions: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subscriptions = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchSubscriptionsByMemberId.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSubscriptionsByMemberId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subscriptions = action.payload;
      })
      .addCase(fetchSubscriptionsByMemberId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addSubscription.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addSubscription.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subscriptions.push(action.payload); // Add new subscription to the list
      })
      .addCase(addSubscription.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default subscriptionSlice.reducer;