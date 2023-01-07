import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { URL_DECK } from "../../constants/constants";
import { UserApp } from "../../interfaces/auth";
import { Card, Deck, DeckCards } from "../../interfaces/dataStructure";
import { DeckCreationSuccessful, DeckCreationUnsuccessful, DeckDeleteSuccessful, DeckDeleteUnsuccessful, DeckGetSuccessful, DeckGetUnsuccessful, DeckUploadSuccessful, DeckUploadUnsuccessful, WordAddSuccessful, WordAddUnsuccessful, WordDeleteSuccessful, WordDeleteUnsuccessful } from "../../interfaces/deckResponses";
import { displayModalMsgWith, hideModalMsg } from "../ModalMsg/ModalMsgSlice";
import { modalityType } from "../StudyPage/StudyPageSlice";

interface State {
    decks: Deck[];
    currentDeck: Deck;
    currentCard: Card
}

const initialState: State = {
    decks: [],
    currentDeck: {} as Deck,
    currentCard: {} as Card
}

export const createDeck = createAsyncThunk('deckPage/createDeck', 
    async (name: string, {dispatch, getState}) => {
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({name})
        };

        try {
            const { authentication : { user : { id } } } = getState() as {authentication: UserApp},
                req = await fetch(`${URL_DECK.CREATE}?idUser=${id}`, options),
                response: DeckCreationSuccessful | DeckCreationUnsuccessful = await req.json();

            if(!response.success){
                dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
                setTimeout(() => dispatch(hideModalMsg()), 3500)
                return {ok: false, idDeck: ""}    
            }

            dispatch(displayModalMsgWith(`Deck "${name}" crated successfully.`))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
            return {ok: true, idDeck: response.payload.result.insertId}
          
        } catch (error) {
            dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
            return {ok: false, idDeck: ""}
        }

    }
)

export const getDecks = createAsyncThunk('deckPage/getDecks', 
    async (id: string, {dispatch}) => {
        try {
            const req = await fetch(`${URL_DECK.GET_DECKS}?idUser=${id}`),
                response: DeckGetSuccessful | DeckGetUnsuccessful = await req.json()

            if(!response.success){
                dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
                setTimeout(() => dispatch(hideModalMsg()), 3500)
                return
            }

            if(!response.payload.decks.length) {
                dispatch(setDecks([]))
                // return dispatch(paginate({
                //     totalElements: 0, 
                //     elements: [],
                //     section: "home"
                // }))
                return
            }

            response.payload.decks.forEach(deck => {
                deck.deck =  JSON.parse(deck.deck)
            })
    
            const decks = response.payload.decks as unknown as Deck[]
            dispatch(setDecks(decks))
            // dispatch(paginate({
            //     totalElements: decks.length, 
            //     elements: decks,
            //     section: "home"
            // }))
        } catch (error) {
            dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
        }
    }
)

export const uploadDeck = createAsyncThunk('deckPage/uploadDeck',
    async (cards: Card[], { dispatch, getState }) => {
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({cards})
        };

        try {
            const {deckState : {currentDeck : {id}}} = getState() as {deckState: State},
                req = await fetch(`${URL_DECK.UPLOAD}?idDeck=${id}`, options),
                response: DeckUploadSuccessful | DeckUploadUnsuccessful = await req.json();

            if(!response.success){
                dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
                setTimeout(() => dispatch(hideModalMsg()), 3500)
                return false
            }
          
            dispatch(displayModalMsgWith('Words uploaded successfully'))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
            return true

        } catch (error) {
            dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
            return false
        }
    }
)

export const renameDeck = createAsyncThunk('deckPage/renameDeck',
    async (name: string, { dispatch, getState }) => {
        const options: RequestInit = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({name})
        };

        try {
            const {deckState : {currentDeck : {id}}} = getState() as {deckState: State},
                req = await fetch(`${URL_DECK.RENAME}?idDeck=${id}`, options),
                response: DeckUploadSuccessful | DeckUploadUnsuccessful = await req.json();
            console.log(response)
            if(!response.success){
                dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
                setTimeout(() => dispatch(hideModalMsg()), 3500)
                return false
            }
          
            dispatch(displayModalMsgWith("Deck's name changed successfully."))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
            return true

        } catch (error) {
            dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
            return false
        }
    }
)

export const deleteDeck = createAsyncThunk('deckPage/deleteDeck', 
    async (idDeck: string, {dispatch, getState}) => {
        const options: RequestInit = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        };

        try {
            const req = await fetch(`${URL_DECK.DELETE}?idDeck=${idDeck}`, options),
                response: DeckDeleteSuccessful | DeckDeleteUnsuccessful = await req.json();

            if(!response.success){
                dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
                setTimeout(() => dispatch(hideModalMsg()), 3500)
                return false
            }

            const { authentication : { user : { id } } } = getState() as {authentication: UserApp}
            dispatch(getDecks(id))
            dispatch(displayModalMsgWith('Deck deleted.'))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
            return true

        } catch (error) {
            dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
            return false
        }
    }
)

export const addWord = createAsyncThunk('deckPage/addWord', 
    async (card: Card, {dispatch, getState}) => {
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({card})
        };
        
        try {
            const { deckState : { currentDeck : { id: idDeck } } } = getState() as {deckState: State},
                req = await fetch(`${URL_DECK.ADD_WORD}?idDeck=${idDeck}`, options),
                response: WordAddSuccessful | WordAddUnsuccessful = await req.json()

            if(!response.success){
                dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
                setTimeout(() => dispatch(hideModalMsg()), 3500)
                return false
            }

            dispatch(displayModalMsgWith(`Card ${card.targetWord} created successfully.`))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
            return true

        } catch (error) {
            console.log(error)
            dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
            return false
        }
    }
)

export const updateWord = createAsyncThunk('deckPage/updateWord', 
    async (editedWord: {id: string, word: string, translation: string}, {dispatch, getState}) => {
        const options: RequestInit = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({editedWord})
        };
        
        try {
            const { deckState : { currentDeck : { id: idDeck } } } = getState() as {deckState: State},
                req = await fetch(`${URL_DECK.UPDATE_WORD}?idDeck=${idDeck}`, options),
                response: WordAddSuccessful | WordAddUnsuccessful = await req.json()
            console.log(response)
            if(!response.success){
                dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
                setTimeout(() => dispatch(hideModalMsg()), 3500)
                return false
            }

            dispatch(displayModalMsgWith(`Card updated successfully.`))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
            return true

        } catch (error) {
            console.log(error)
            dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
            return false
        }
    }
)

export const deleteWord = createAsyncThunk('deckPage/deleteWord', 
    async (id: string, {dispatch, getState}) => {
        const options: RequestInit = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        };

        try {
            const { deckState : { currentDeck : { id: idDeck } } } = getState() as {deckState: State},
                req = await fetch(`${URL_DECK.DELETE_WORD}?id=${id}&idDeck=${idDeck}`, options),
                response: WordDeleteSuccessful | WordDeleteUnsuccessful = await req.json();
            
            if(!response.success){
                dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
                setTimeout(() => dispatch(hideModalMsg()), 3500)
                return false
            }

            dispatch(displayModalMsgWith('Card deleted.'))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
            return true

        } catch (error) {
            dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
            return false
        }
    }
)





const deckPageSlice = createSlice({
    name: "deckState",
    initialState,
    reducers: {
        pushNewDeck: (state, {payload} : PayloadAction<Deck>) => {state.decks.push(payload)},
        setDecks: (state, {payload} : PayloadAction<Deck[]>) => {state.decks = payload},
        changeDeckame: (state, {payload} : PayloadAction<string>) => {state.currentDeck.name = payload},
        removeDeck: (state, {payload} : PayloadAction<string>) => {
            state.decks = state.decks.filter(deck => deck.id !== payload)
        },
        setCurrentDeck: (state, {payload}: PayloadAction<Deck>) => {state.currentDeck = payload},
        setCurrentCard: (state, {payload}: PayloadAction<Card>) => {state.currentCard = payload},
        pushWord: (state, {payload} : PayloadAction<Card>) => {
            const {currentDeck: {deck}} = state;
            
            deck.cards.push(payload)
            deck.totalWords++
            deck.learningWords++
        },
        pushUploadedhWords: (state, {payload} : PayloadAction<Card[]>) => {
            const {currentDeck: {deck}} = state;
            
            deck.cards = deck.cards.concat(payload)
            deck.totalWords += payload.length
            deck.learningWords += payload.length
        },
        editWord: (state, {payload} : PayloadAction<{id: string, word: string, translation: string}>) => {
            let {currentDeck : {deck : {cards}}} = state;

            cards.forEach(card => {
                if(card.id === payload.id){
                    card.targetWord = payload.word
                    card.nativeWord = payload.translation
                }
            })
        },
        removeWord: (state, {payload} : PayloadAction<{id: string, modality: modalityType}>) => {
            let {currentDeck : {deck}} = state;
            
            deck.cards = deck.cards.filter(card => card.id !== payload.id)
            deck.totalWords--
        
            payload.modality === "learning_words"? deck.learningWords-- : deck.matureWords--
            
        },
        updateStudy: (state, {payload : cards} : PayloadAction<{[key: string] : Card}>) => {
            const {currentDeck : {deck}} = state

            for (let i = 0; i < deck.cards.length; i++) {
                const card = deck.cards[i];
                
                if(!cards[card.targetWord]) continue
    
                const updatedCard = cards[card.targetWord]
    
                if(card.modality === "learning_words" && updatedCard.modality === "mature_words"){
                    deck.learningWords--
                    deck.matureWords++
                }
                if(card.modality === "mature_words" && updatedCard.modality === "learning_words"){
                    deck.matureWords--
                    deck.learningWords++
                }
    
                card.points = updatedCard.points
                card.dayRepeatUnix = updatedCard.dayRepeatUnix
                card.dayRepeatStr = updatedCard.dayRepeatStr
                card.state = "active"
                card.modality = updatedCard.modality
            }
        }

    }
})

export const {
    pushNewDeck, 
    setDecks, 
    changeDeckame,
    removeDeck, 
    setCurrentDeck, 
    setCurrentCard,
    pushWord, 
    pushUploadedhWords, 
    editWord, 
    removeWord,
    updateStudy
} = deckPageSlice.actions;
export default deckPageSlice.reducer;