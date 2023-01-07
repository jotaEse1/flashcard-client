import { modalityType } from "../components/StudyPage/StudyPageSlice"

export interface Card {
    id: string,
    nativeWord: string,
    targetWord: string,
    dayAddedUnix: number,
    dayAddedStr: string,
    points: number,
    dayRepeatUnix: number,
    dayRepeatStr: string,
    state: "active" | "inactive"
    modality: modalityType
}

export interface DeckCards {
    cards: Card[],
    totalWords: number,
    learningWords: number,
    matureWords: number
}

/* 
export interface DeckCards {
    cards: Card[],
    totalWords: number,
    learningWords: {
        cards: Card[],
        total: number
    },
    matureWords: {
        cards: Card[],
        total: number
    }
}
*/

export interface Deck {
    id: string,
    id_user: string,
    name: string,
    deck: DeckCards
}

export interface DeckResponse {
    id: string,
    id_user: string,
    name: string,
    deck: string
}

