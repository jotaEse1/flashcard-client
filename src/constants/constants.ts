export enum URL_AUTH {
    SIGNIN = "http://localhost:5000/api/v1/auth/signin",
    LOGIN = "http://localhost:5000/api/v1/auth/login",
    LOGOUT = "http://localhost:5000/api/v1/auth/logout",
    REFRESH_TOKEN = "http://localhost:5000/api/v1/auth/refresh_token"
}

export enum URL_DECK {
    GET_DECKS = "http://localhost:5000/api/v1/deck/getDecks",
    CREATE = "http://localhost:5000/api/v1/deck/create",
    UPLOAD = "http://localhost:5000/api/v1/deck/upload",
    DELETE = "http://localhost:5000/api/v1/deck/delete",
    RENAME = "http://localhost:5000/api/v1/deck/rename",
    ADD_WORD = "http://localhost:5000/api/v1/deck/addWord",
    UPDATE_WORD = "http://localhost:5000/api/v1/deck/updateWord",
    DELETE_WORD = "http://localhost:5000/api/v1/deck/deleteWord",
}

export enum URL_STUDY {
    UPDATE =  "http://localhost:5000/api/v1/study/update"
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