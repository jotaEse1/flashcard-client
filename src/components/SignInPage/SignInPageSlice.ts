import {createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    email: "",
    password: ""
}

const signInSlice = createSlice({
    name: "signIn",
    initialState,
    reducers: {
        signInAction: () => {}
    }
})