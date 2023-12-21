// rootReducer.js
import { combineReducers } from 'redux';
import postsReducer from './postsSlice';
import persistedAuthReducer from './authSlice';
// Import other slices as needed

const rootReducer = combineReducers({
  posts: postsReducer,
  auth: persistedAuthReducer,
  // ... other slices
});

export default rootReducer;