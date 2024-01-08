import {Dispatch} from "redux";
import {authAPI} from "../api/api";

const SET_USER_DATA = 'SET-USER-DATA';

export type initialStateType = {
    userId: string
    email: string
    login: string
    isAuth: boolean
}

let initialState = {
    userId: '',
    email: '',
    login: '',
    isAuth: false
}

const authReducer = (state:initialStateType = initialState, action: ActionsTypesOfUsers): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }

        default:
            return state;
    }
}

export type ActionsTypesOfUsers = ReturnType<typeof setAuthUserData>

export const setAuthUserData = (userId: string, email: string, login: string) => ({
    type: SET_USER_DATA,
    data: {
        userId,
        email,
        login
    }
} as const)

//_______________thunk

export const getAuthUserDataThunk = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if(res.data.resultCode === 0) {
                let {id, login, email} = res.data.data
                dispatch(setAuthUserData(id, email, login))
            }
        })
}

export default authReducer;