import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/users/userSlice";
import CourseReducer from "./features/courses/courseSlice";



const store = configureStore({
    reducer: {
        user: UserReducer,
        course: CourseReducer

    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;