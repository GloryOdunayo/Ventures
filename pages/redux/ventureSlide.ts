import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type Venture = {
    name: string,
    id: string,
    owner: string,
    slug: string,
    description: string,
    link: string,
    stage: string,
    sector: [],
    location: string,
    businessModel: [],
    dateFounded: string,
    tagline: string,
    // data: []
}

type InitialState = {
    loading: boolean,
    ventures : Venture,
    error: string
}

const initialState: InitialState = {
    loading: false,
    ventures: {
        name: "",
        id: "",
        owner: "",
        slug: "",
        description: "",
        link: "",
        stage: "",
        sector: [],
        location: "",
        businessModel: [],
        dateFounded: "",
        tagline: "",
        // data: []
    },
    error: '',
};

let token: any;
let slug:any;
if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
    slug = localStorage.getItem("slug");
}

export const fetchVenture = createAsyncThunk ('users/fetchVenture',() => {
    return axios.get(`https://api.venturenation.co/api/v1/ventures/${slug}`, {
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
        builder.addCase(fetchVenture.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchVenture.fulfilled, (state, action: PayloadAction<Venture> ) => {
            state.loading = false;
            state.ventures = action.payload;
            state.error = '';
        })
        builder.addCase(fetchVenture.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong";
        })
    }
})  

export default ventureSlice.reducer;