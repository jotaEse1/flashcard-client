import { Deck, DeckResponse } from "./dataStructure"

export interface DeckCreationSuccessful {
    success: true,
    payload: {
        status: 200,
        result: {
            fieldCount: string,
            affectedRows: string,
            insertId: string,
            serverStatus: string,
            warningCount: string,
            message: string,
            protocol41: string,
            changedRows: string
        }
    }
}

export interface DeckCreationUnsuccessful {
    success: false,
    payload: {
        error: Error
    }
}

export interface DeckGetSuccessful {
    success: true,
    payload: {
        status: 200,
        decks: DeckResponse[]
    }
}

export interface DeckGetUnsuccessful {
    success: false,
    payload: {
        error: Error
    }
}

export interface DeckUploadSuccessful {
    success: true,
    payload: {
        status: 200,
        result: {
            fieldCount: string,
            affectedRows: string,
            insertId: string,
            serverStatus: string,
            warningCount: string,
            message: string,
            protocol41: string,
            changedRows: string
        }
    }
}

export interface DeckUploadUnsuccessful {
    success: false,
    payload: {
        error: Error
    }
}

export interface DeckDeleteSuccessful {
    success: true,
    payload: {
        status: 200,
        result: {
            fieldCount: string,
            affectedRows: string,
            insertId: string,
            serverStatus: string,
            warningCount: string,
            message: string,
            protocol41: string,
            changedRows: string
        }
    }
}

export interface DeckDeleteUnsuccessful {
    success: false,
    payload: {
        error: Error
    }
}

export interface WordAddSuccessful {
    success: true,
    payload: {
        status: 200,
        decks: Deck[]
    }
}

export interface WordAddUnsuccessful {
    success: false,
    payload: {
        error: Error
    }
}

export interface WordDeleteSuccessful {
    success: true,
    payload: {
        status: 200,
        result: {
            fieldCount: string,
            affectedRows: string,
            insertId: string,
            serverStatus: string,
            warningCount: string,
            message: string,
            protocol41: string,
            changedRows: string
        }
    }
}

export interface WordDeleteUnsuccessful {
    success: false,
    payload: {
        error: Error
    }
}