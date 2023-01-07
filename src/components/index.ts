import { configureStore } from "@reduxjs/toolkit";
import AuthenticationSlice from "./Authentication/AuthenticationSlice";
import DeckPageSlice from "./DeckPage/DeckPageSlice";
import LoaderSlice from "./Loader/LoaderSlice";
import ModalMsgSlice from "./ModalMsg/ModalMsgSlice";
import ModalSlice from "./Modal/ModalSlice";
import PaginationSlice from "./Pagination/PaginationSlice";
import SideBarSlice from "./SideBar/SideBarSlice";
import StudyPageSlice from "./StudyPage/StudyPageSlice";
import CardSlice from "./Card/CardSlice";

export const store = configureStore({
    reducer: {
        authentication: AuthenticationSlice,
        deckState: DeckPageSlice,
        studyState: StudyPageSlice,
        cardState: CardSlice,
        modal: ModalSlice,
        pagination: PaginationSlice,
        modalMsg: ModalMsgSlice,
        sideBar: SideBarSlice,
        loader: LoaderSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch