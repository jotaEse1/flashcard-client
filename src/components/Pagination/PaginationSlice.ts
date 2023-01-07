import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card, Deck } from "../../interfaces/dataStructure";

interface StateValue {
    currentPage: number,
    allPages: any[][],
    totalElements: number,
    elementsXPage: number,
    pages: number
}

interface State {
    [key: string]: StateValue
}

const initialState: State = {}

const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        incrementPage: (state, { payload }: PayloadAction<{ section: string }>) => {
            state[payload.section].currentPage++
        },
        decrementPage: (state, { payload }: PayloadAction<{ section: string }>) => {
            state[payload.section].currentPage--
        },
        // initialicePagination: (state, { payload }: PayloadAction<string>) => {
        //     state[payload] = {}
        // },
        paginate: (state, { payload }: PayloadAction<{ totalElements: number, elements: any[], section: string }>) => {
            const elementsXPage = 20;

            if (!state[payload.section]) state[payload.section] = {} as StateValue

            let pagesT = Math.ceil(payload.totalElements / elementsXPage),
                allPagesT = [],
                minLong = 0,
                maxLong = elementsXPage;

            for (let index = 0; index < pagesT; index++) {
                allPagesT.push(payload.elements.slice(minLong, maxLong))

                minLong += elementsXPage
                maxLong += elementsXPage
            }

            console.log("pagination called")
            state[payload.section].currentPage = 1
            state[payload.section].allPages = allPagesT
            state[payload.section].totalElements = payload.totalElements
            state[payload.section].elementsXPage = elementsXPage
            state[payload.section].pages = pagesT

        }
    }
})

export const { incrementPage, decrementPage, paginate } = paginationSlice.actions;
export default paginationSlice.reducer;