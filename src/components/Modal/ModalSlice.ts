import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type modalAction = "" 
    | "search_W" 
    | "remove_W" 
    | "add_W" 
    | "upload_W"  
    | "update_W" 
    | "remove_D" 
    | "create_D"
    | "rename_D"
    | "study_D"

interface State {
    modalOpened: modalAction
}

const initialState: State = {
    modalOpened: ""
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModalOf: (state, {payload}: PayloadAction<modalAction>) => {
            state.modalOpened = payload
        },
        closeModal: (state) => {state.modalOpened = ""}
    }
})

export const {openModalOf, closeModal} = modalSlice.actions;
export default modalSlice.reducer;