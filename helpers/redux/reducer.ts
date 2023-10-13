// src/redux/reducers.ts
import { combineReducers } from '@reduxjs/toolkit';
import UserReducer from "./userSlide";
import CourseReducer from "./courseSlide";
import ventureSlice from "./ventureSlide";
// Import your individual reducers here
// For example: import counterReducer from './counterSlice';

const rootReducer = combineReducers({
  // Add your reducers here
  // For example: counter: counterReducer,
    user: UserReducer,
    course: CourseReducer,
    venture: ventureSlice,
});

export default rootReducer;
