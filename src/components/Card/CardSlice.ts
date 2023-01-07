import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isRotated: false
}

const cardSlice = createSlice({
    name: "cardState",
    initialState,
    reducers: {
        showFront: (state) => {state.isRotated = false},
        showBack: (state) => {state.isRotated = true},
    }
})

export const {showFront, showBack} = cardSlice.actions;
export default cardSlice.reducer