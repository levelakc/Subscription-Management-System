import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/userSlice';
import movieReducer from './redux/movieSlice';
import memberReducer from './redux/memberSlice';
import subscriptionReducer from './redux/subscriptionSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
    members: memberReducer,
    subscriptions: subscriptionReducer
  }
});

export default store;
