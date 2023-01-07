import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { URL_AUTH } from "../../constants/constants";
import { CheckTokenResponseSuccessful, CheckTokenResponseUnSuccessful, LogInResponseSuccessful, LogInResponseUnsuccessful, SignInResponseSuccessful, SignInResponseUnsuccessful, User, UserApp } from "../../interfaces/auth";
import { closeLoader } from "../Loader/LoaderSlice";
import { displayModalMsgWith, hideModalMsg } from "../ModalMsg/ModalMsgSlice";

const initialState: UserApp = {
    isAuth: false,
    user: {
        id: "",
        username: "",
        email: "",
        token: ""
    }
}

export const signIn = createAsyncThunk('authentication/signIn',
    async (credentials: { username: string, email: string, password: string }, { dispatch }) => {
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(credentials)
        };

        try {
            const req = await fetch(URL_AUTH.SIGNIN, options)
            const response: SignInResponseSuccessful | SignInResponseUnsuccessful = await req.json()

            console.log(response)
            dispatch(closeLoader())

            if (!response.success) {
                dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
                setTimeout(() => dispatch(hideModalMsg()), 3500)
                return false
            }
            if (response.payload.status !== 201) {
                if (response.payload.status === 500) dispatch(displayModalMsgWith(response.payload.errors[0].msg))
                if (response.payload.status === 300) dispatch(displayModalMsgWith(response.payload.msg))

                setTimeout(() => dispatch(hideModalMsg()), 3500)
                return false
            }

            dispatch(displayModalMsgWith(`Welcome ${credentials.username}!`))
            dispatch(authUser({
                id: response.payload.createdUser.insertId,
                username: credentials.username,
                email: credentials.email,
                token: ""
            }))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
            return true

        } catch (error) {
            dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
            return false
        }
    }
)

export const logIn = createAsyncThunk('authentication/logIn',
    async (credentials: { email: string, password: string }, { dispatch }) => {
        const options: RequestInit = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(credentials)
        };

        try {
            const req = await fetch(URL_AUTH.LOGIN, options),
                response: LogInResponseSuccessful | LogInResponseUnsuccessful = await req.json();

            if (!response.success) {
                dispatch(closeLoader())
                dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
                setTimeout(() => dispatch(hideModalMsg()), 3500)
                return false
            }
            if (response.payload.status !== 200) {
                dispatch(closeLoader())

                if (response.payload.status === 500) dispatch(displayModalMsgWith(response.payload.errors[0].msg))
                if (response.payload.status === 404) dispatch(displayModalMsgWith(response.payload.msg))

                setTimeout(() => dispatch(hideModalMsg()), 3500)
                return false
            }


            dispatch(displayModalMsgWith(`Welcome back ${response.payload.username}`))
            dispatch(authUser({
                id: response.payload.id,
                username: response.payload.username,
                email: response.payload.email,
                token: response.payload.token
            }))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
            return true

        } catch (error) {
            dispatch(closeLoader())
            dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
            return false
        }
    }
)

export const logOut = createAsyncThunk('authentication/logOut',
    async (_, {dispatch}) => {
        const options: RequestInit = {
            method: 'POST',
            credentials: 'include'
        };

        try {
            const req = await fetch(URL_AUTH.LOGOUT, options)
            const response = await req.json()

            console.log(response)
            if (!response.success) {
                dispatch(closeLoader())
                dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
                setTimeout(() => dispatch(hideModalMsg()), 3500)
                return false
            } 

            dispatch(displayModalMsgWith("You've just logged out"))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
            return true

        } catch (error) {
            dispatch(closeLoader())
            dispatch(displayModalMsgWith('An error ocurred. Try again later.'))
            setTimeout(() => dispatch(hideModalMsg()), 3500)
            return false
        }
    }
)

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        authUser: (state, action: PayloadAction<User>) => {
            state.isAuth = true
            state.user = action.payload
        },
        logOutUser: (state) => { state.isAuth = false }
    }
})

export const { authUser, logOutUser } = authenticationSlice.actions;
export default authenticationSlice.reducer;