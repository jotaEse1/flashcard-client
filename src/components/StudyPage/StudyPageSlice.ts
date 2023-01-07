import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { URL_STUDY } from "../../constants/constants";
import { Card, Deck } from "../../interfaces/dataStructure";
import { DeckCreationSuccessful, DeckCreationUnsuccessful } from "../../interfaces/deckResponses";
import { displayModalMsgWith, hideModalMsg } from "../ModalMsg/ModalMsgSlice";

export type modalityType = "all_words" | "learning_words" | "mature_words"

interface State {
    modality: modalityType;
    totalWords: number;
    limitArr: number;
    currentCardIndex: number;
    modalityWords: Card[];
    currentModalityWord: Card;
    cardsChanged: {
        [key: string] : Card
    },
    studyFinished: boolean
}

interface StudyPayload {
    modality: modalityType; 
    totalWords: number;
    limitArr: number;  
    modalityWords: Card[];
    currentModalityWord: Card;
}

const initialState : State = {
    modality: "" as modalityType,
    totalWords: 0,
    limitArr: 0,
    currentCardIndex: 0,
    modalityWords: [] as Card[],
    currentModalityWord: {} as Card,
    cardsChanged: {},
    studyFinished: false
}

export const saveWordsChanges = createAsyncThunk('studyPage/saveWordsChanges', 
    async (cards: { [key: string] : Card }, {dispatch, getState}) => {
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({cards})
        };

        try {
            const {deckState : {currentDeck : {id}}} = getState() as {deckState: {currentDeck: Deck}},
                req = await fetch(`${URL_STUDY.UPDATE}?idDeck=${id}`, options),
                response: DeckCreationSuccessful | DeckCreationUnsuccessful = await req.json();

            console.log(response)
            if(!response.success){
                dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
                setTimeout(() => dispatch(hideModalMsg()), 3500)
                return    
            }
            
            return
          
        } catch (error) {
            dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
            return 
        }

    }
)


const studyPageSlice = createSlice({
    name: "studyState",
    initialState,
    reducers: {
        setStudyElements: (state, {payload} : PayloadAction<StudyPayload>) => {
            state.modality = payload.modality
            state.totalWords = payload.totalWords
            state.limitArr = payload.limitArr
            state.modalityWords = payload.modalityWords
            state.currentModalityWord = payload.currentModalityWord
        },
        changeToNextCard: (state, {payload} : PayloadAction<{card: Card, wordDeleted: number}>) => {
            let nextCardIndex = state.currentCardIndex + 1

            //change the current card information in modality array
            state.modalityWords[state.currentCardIndex] = payload.card

            //change the cardsChange
            if(!state.cardsChanged[payload.card.targetWord]) state.cardsChanged[payload.card.targetWord] = {} as Card
            state.cardsChanged[payload.card.targetWord] = payload.card 

            //find the next card to render in the app
            if(state.totalWords - payload.wordDeleted === 0){
                state.studyFinished = true
                return
            }
            if(nextCardIndex > state.limitArr) nextCardIndex = 0

            for (let i = nextCardIndex; i <= state.limitArr + 1; i++) {
                const nextCard = state.modalityWords[i];
                
                if(i > state.limitArr) {
                    i = 0
                    continue
                }
                if(nextCard.state === "inactive") continue

                state.currentCardIndex = i
                state.currentModalityWord = nextCard
                break
            }

            if(payload.card.state === "inactive") state.totalWords--            
        },
        changeToNextCardAllWords: (state) => {
            let nextCardIndex = state.currentCardIndex + 1
            
            if(nextCardIndex > state.limitArr) nextCardIndex = 0

            for (let i = nextCardIndex; i <= state.limitArr + 1; i++) {
                const nextCard = state.modalityWords[i];
                
                if(i > state.limitArr) {
                    i = 0
                    continue
                }

                state.currentCardIndex = i
                state.currentModalityWord = nextCard
                break
            }
        },
        resetStudyCounter: (state) => {
            state.currentCardIndex = 0
            state.studyFinished = false
            state.cardsChanged = {}
        }
        
    }
})

export const {
    setStudyElements,
    changeToNextCard,
    changeToNextCardAllWords,
    resetStudyCounter
} = studyPageSlice.actions;
export default studyPageSlice.reducer