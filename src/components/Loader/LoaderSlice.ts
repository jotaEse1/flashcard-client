import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoaderOpen: true
}

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        openLoader: (state) => {
            state.isLoaderOpen = true
        },
        closeLoader: (state) => {
            state.isLoaderOpen = false
        },
    }
})

export const {openLoader, closeLoader} = loaderSlice.actions;
export default loaderSlice.reducer;