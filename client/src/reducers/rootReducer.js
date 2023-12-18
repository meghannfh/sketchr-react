// rootReducer.js
import { combineReducers } from 'redux';
import postsReducer from './postsSlice';
import authReducer from './authSlice';
// Import other slices as needed

const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
  // ... other slices
});

export default rootReducer;