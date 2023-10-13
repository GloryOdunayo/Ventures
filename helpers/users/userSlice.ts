import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type Social = {
    facebook: string;
    linkedin: string;
    instagram: string;
    twitter: string;
}
type User = {
    id: string,
    name: string,
    email: string,
    password: string,
    phone: string,
    gender: string,
    avatar: string,
    nationality: string,
    dob: string,
    bio: string,
    website: string,
    skills: string[],
    facebook: string;
    linkedin: string;
    instagram: string;
    twitter: string;
    socials: Social;
}

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

export const fetchUser = createAsyncThunk ('users/fetchUser',() => {
    return axios.get(`https://api.venturenation.co/api/v1/users/current-user`, {
        headers: {
            Authorization:  `Bearer ${token}`
        }
    })
    .then((response)=>response.data.data);
    }
)
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