import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


type Venture = {
    name: string,
    ventureId: string,
    data: []
}

type InitialState = {
    loading: boolean,
    ventures : Venture[],
    error: string
}

const initialState: InitialState = {
    loading: false,
    ventures: [],
    error: '',
};

let email:any;
let token: any;
if (typeof window !== "undefined") {
    email = localStorage.getItem('email');
    token = localStorage.getItem("token");
}

export const fetchventure = createAsyncThunk ('users/fetchventure',() => {
    return axios.get(`https://api.venturenation.co/api/v1/users/${email}/ventures`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then((response)=>response.data);
    }
)
const ventureSlice = createSlice({
    name: "venture",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchventure.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchventure.fulfilled, (state, action: PayloadAction<Venture[]> ) => {
            state.loading = false;
            state.ventures = action.payload;
            state.error = '';
        })
        builder.addCase(fetchventure.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        })
    }
})  

export default ventureSlice.reducer;