export enum URL_AUTH {
    SIGNIN = "https://flashcard-server-plpi.onrender.com/api/v1/auth/signin",
    LOGIN = "https://flashcard-server-plpi.onrender.com/api/v1/auth/login",
    LOGOUT = "https://flashcard-server-plpi.onrender.com/api/v1/auth/logout",
    REFRESH_TOKEN = "https://flashcard-server-plpi.onrender.com/api/v1/auth/refresh_token"
}

export enum URL_DECK {
    GET_DECKS = "https://flashcard-server-plpi.onrender.com/api/v1/deck/getDecks",
    CREATE = "https://flashcard-server-plpi.onrender.com/api/v1/deck/create",
    UPLOAD = "https://flashcard-server-plpi.onrender.com/api/v1/deck/upload",
    DELETE = "https://flashcard-server-plpi.onrender.com/api/v1/deck/delete",
    RENAME = "https://flashcard-server-plpi.onrender.com/api/v1/deck/rename",
    ADD_WORD = "https://flashcard-server-plpi.onrender.com/api/v1/deck/addWord",
    UPDATE_WORD = "https://flashcard-server-plpi.onrender.com/api/v1/deck/updateWord",
    DELETE_WORD = "https://flashcard-server-plpi.onrender.com/api/v1/deck/deleteWord",
}

export enum URL_STUDY {
    UPDATE =  "https://flashcard-server-plpi.onrender.com/api/v1/study/update"
}

export enum MODAL {
    SEARCH_WORD = "search_W",
    REMOVE_WORD = "remove_W",
    ADD_WORD = "add_W",
    UPLOAD_WORD = "upload_W",
    UPDATE_WORD = "update_W",
    CREATE_DECK = "create_D",
    REMOVE_DECK = "remove_D",
    RENAME_DECK = "rename_D",
    STUDY_DECK = "study_D"
}