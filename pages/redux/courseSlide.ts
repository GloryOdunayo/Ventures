import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


type Course = {
    name: string,
    courseId: string,
    data: []
}

type InitialState = {
    loading: boolean,
    courses : Course[],
    error: string
}

const initialState: InitialState = {
    loading: false,
    courses: [],
    error: '',
};

let email:any;
let token: any;
if (typeof window !== "undefined") {
    email = localStorage.getItem('email');
    token = localStorage.getItem("token");
}

export const fetchCourse = createAsyncThunk ('users/fetchCourse',() => {
    return axios.get(`https://api.venturenation.co/api/v1/users/${email}/courses`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then((response)=>response.data);
    }
)
const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchCourse.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchCourse.fulfilled, (state, action: PayloadAction<Course[]> ) => {
            state.loading = false;
            state.courses = action.payload;
            state.error = '';
        })
        builder.addCase(fetchCourse.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        })
    }
})  

export default courseSlice.reducer;