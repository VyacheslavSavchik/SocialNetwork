import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS_PROFILE = 'SET-STATUS-PROFILE';
const DELETE_POST = 'DELETE-POST';

export type ProfileType = {
    aboutMe: string,
    contacts: {
        facebook: string,
        website: string,
        vk: string,
        twitter: string,
        instagram: string,
        youtube: string,
        github: string,
        mainLink: string
    },
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: string,
    photos: {
        small: string,
        large: string
    }
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
}

const initialState = {
    newPostText: 'change me',
    status: '',
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: 'It\'s my first post', likesCount: 30},
    ],
    profile: {
        aboutMe: '',
        contacts: {
            facebook: '',
            website: '',
            vk: '',
            twitter: '',
            instagram: '',
            youtube: '',
            github: '',
            mainLink: ''
        },
        lookingForAJob: true,
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
        default:
            return state;
    }
}

export type ActionsTypesOfProfile =
    | ReturnType<typeof addPostCreator>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatusProfile>
    | ReturnType<typeof deletePost>

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
//_______________thunk
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

export default profileReducer;