import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {FormAction, stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS_PROFILE = 'SET-STATUS-PROFILE';
const DELETE_POST = 'DELETE-POST';
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS';

export type ProfileType = {
    aboutMe: string | null,
    contacts: ContactsType,
    lookingForAJob: boolean,
    lookingForAJobDescription: string | null,
    fullName: string | null,
    userId: string | null,
    photos: {
        small: string | null,
        large: string | null
    }
}

export type ContactsType =  {
    facebook: string | null ,
    website: string | null ,
    vk: string | null ,
    twitter: string | null ,
    instagram: string | null ,
    youtube: string | null ,
    github: string | null ,
    mainLink: string | null
}

export type PostsType = {
    id: number
    message: string
    likesCount: number
}

export type InitialStateType = {
    posts: PostsType[]
    newPostText: string
    profile: ProfileType
    status: string
    isOwner: boolean
}

const initialState = {
    newPostText: 'change me',
    status: '',
    isOwner: false,
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: 'It\'s my first post', likesCount: 30},
    ],
    profile: {
        aboutMe:'',
        contacts: {
            facebook:'',
            website:'',
            vk:'',
            twitter:'',
            instagram:'',
            youtube:'',
            github:'',
            mainLink:''
        },
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: '',
        userId: '',
        photos: {
            small: '',
            large: ''
        }
    }
}

const profileReducer = (state: InitialStateType = initialState, action: ActionsTypesOfProfile): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostsType = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''

            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS_PROFILE:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state, profile: {...state.profile, photos: action.photos}
            }
        default:
            return state;
    }
}

export type ActionsTypesOfProfile =
    | ReturnType<typeof addPostCreator>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatusProfile>
    | ReturnType<typeof deletePost>
    | ReturnType<typeof savePhotoSuccess>

export const addPostCreator = (newPostText: string) => ({
    type: ADD_POST,
    newPostText
} as const)

export const setUserProfile = (profile: ProfileType) => ({
    type: SET_USER_PROFILE,
    profile
} as const)

export const setStatusProfile = (status: string) => ({
    type: SET_STATUS_PROFILE,
    status
} as const)

export const deletePost = (postId: number) => ({
    type: DELETE_POST,
    postId
} as const)

export const savePhotoSuccess = (photos: {small: string, large: string}) => ({
    type: SAVE_PHOTO_SUCCESS,
    photos
} as const)

export const getUserProfileThunk = (userId: string) => async(dispatch: Dispatch) => {
   const res = await usersAPI.getProfile(userId)
            dispatch(setUserProfile(res.data))
}

export const getStatus = (userId: string) => async(dispatch: Dispatch) => {
    const res = await profileAPI.getStatus(userId)
            dispatch(setStatusProfile(res.data))
}

export const updateStatus = (status: string) => async(dispatch: Dispatch) => {
    const res = await profileAPI.updateStatus(status)
            if(res.data.resultCode === 0) {
                dispatch(setStatusProfile(status))
            }
}

export const savePhoto = (file: string) => async(dispatch: Dispatch) => {
    const res = await profileAPI.savePhoto(file)
    if(res.data.resultCode === 0) {
        dispatch(savePhotoSuccess(res.data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType) => async(dispatch: ThunkDispatch<AppStateType,unknown, FormAction>, getState: any) => {
    const userId = getState().auth.userId
    const res = await profileAPI.saveProfile(profile)
    if(res.data.resultCode === 0) {
        dispatch(getUserProfileThunk(userId))
    } else {
        dispatch(stopSubmit('edit-profile', {_error: res.data.messages[0]}))
        return Promise.reject(res.data.messages[0])
    }
}
export default profileReducer;