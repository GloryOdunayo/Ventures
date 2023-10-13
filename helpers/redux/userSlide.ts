import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "./types";

type InitialState = {
    loading: boolean,
    users : User,
    error: string
}

const initialState: InitialState = {
    loading: false,
    users: {
        id:"",
        name: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        avatar: "",
        nationality: "",
        dob: "",
        bio: "",
        website: "",
        skills: [],
        facebook: "",
        linkedin: "",
        instagram: "",
        twitter: "",
        socials: {facebook: "", linkedin: "", instagram: "", twitter: ""}
    },
    error: '',
};

let email:any;
let token:any;
if (typeof window !== "undefined") {
    email = localStorage.getItem('email');
    token = localStorage.getItem('token');
}
interface FetchUserResponse {
    data: User;
}

export const fetchUser = createAsyncThunk<User, void, { rejectValue: string }> ('users/fetchUser',(_, thunkAPI) => {
    return axios.get<FetchUserResponse>(`https://api.venturenation.co/api/v1/users/current-user`, {
        headers: {
            Authorization:  `Bearer ${token}`
        }
    }).then((response) => {
        // Return the data from the response
        return response.data.data;
    })
    .catch((error) => {
        return thunkAPI.rejectWithValue('Failed to fetch user data');
    });
})
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<User> ) => {
            state.loading = false;
            state.users = action.payload;
            state.error = '';
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        })
    }
})  

export default userSlice.reducer;