import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {formDataType} from "../login/Login";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET-USER-DATA';

export type initialStateType = {
    userId: string
    email: string | null
    login: string | null
    isAuth: boolean
}

let initialState = {
    userId: '',
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state:initialStateType = initialState, action: ActionsTypesOfUsers): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export type ActionsTypesOfUsers = ReturnType<typeof setAuthUserData> | ReturnType<typeof stopSubmit>

export const setAuthUserData = (userId: string | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {
        userId,
        email,
        login,
        isAuth
    }
} as const)

//_______________thunk

export const getAuthUserDataThunk = () => (dispatch: Dispatch) => {
    return authAPI.me()
        .then(res => {
            if(res.data.resultCode === 0) {
                let {id, login, email} = res.data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        })
}

export const login = (data: formDataType) => (dispatch: ThunkDispatch<AppStateType,unknown,ActionsTypesOfUsers>) => {
    authAPI.login(data)
        .then(res => {
            if(res.data.resultCode === 0) {
               dispatch(getAuthUserDataThunk())
            } else {
                const message = res.data.messages.length > 0 ? res.data.messages[0] : 'Some error'
                dispatch(stopSubmit('login', {_error: message}))
            }
        })
}

export const logout = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(res => {
            if(res.data.resultCode === 0) {
              dispatch(setAuthUserData(null, null, null, false))
            }
        })
}
export default authReducer;