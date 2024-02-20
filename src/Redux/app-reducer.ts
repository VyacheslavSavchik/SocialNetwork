import {stopSubmit} from "redux-form";
import {getAuthUserDataThunk} from "./auth-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_INITIALIZED = 'SET_INITIALIZED';

export type initialStateType = {
    initialized: boolean
}

let initialState = {
    initialized: false,
}

const appReducer = (state:initialStateType = initialState, action: AppActionTypes): initialStateType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export type AppActionTypes = ReturnType<typeof initializedSuccess> | ReturnType<typeof stopSubmit>

export const initializedSuccess = () => ({
    type:  SET_INITIALIZED
} as const)


export const initializeApp = () => (dispatch: ThunkDispatch<AppStateType,unknown,AppActionTypes>) => {
    const promise = dispatch(getAuthUserDataThunk())
    promise.then(() => {
        dispatch(initializedSuccess())
    })

}

export default appReducer;