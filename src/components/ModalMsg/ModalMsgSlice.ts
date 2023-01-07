import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    msg: "",
    isModalMsgOpen: false
}

const modalMsgSlice = createSlice({
    name: "modalMsg",
    initialState,
    reducers: {
        displayModalMsgWith: (state, action: PayloadAction<string>) => {
            state.msg = action.payload
            state.isModalMsgOpen = true
        },
        hideModalMsg: (state) => {
            state.isModalMsgOpen = false
        }

    }
})

export const {displayModalMsgWith, hideModalMsg} = modalMsgSlice.actions;
export default modalMsgSlice.reducer;