import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";

const initialState = {
    isSidebarOpen: false
}

const sideBarSlice = createSlice({
    name: 'sideBar',
    initialState,
    reducers: {
        openBar: (state) => {
            state.isSidebarOpen = true
        },
        closeBar: (state) => {
            state.isSidebarOpen = false
        }
        
    }
})

export const {openBar, closeBar} = sideBarSlice.actions;
//export const sideBarModal = (state: RootState) => state.sideBar.sidebarOpen
export default sideBarSlice.reducer;