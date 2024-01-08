import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';

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

export type initialStateType = {
    posts: PostsType[]
    newPostText: string
    profile: ProfileType
}

let initialState = {
    newPostText: 'change me',
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
        userId: '2',
        photos: {
            small: '',
            large: ''
        }
    }

}

const profileReducer = (state: initialStateType = initialState, action: ActionsTypesOfProfile): initialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostsType = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
             return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''

            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        default:
            return state;
        }
}

export type ActionsTypesOfProfile =
    ReturnType<typeof updateNewPostTextCreator>
    | ReturnType<typeof addPostCreator>
    | ReturnType<typeof setUserProfile>

export const addPostCreator = (postText: string) => ({
    type: ADD_POST,
    postText: postText
} as const)

export const updateNewPostTextCreator = (text: string) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
} as const)

export const setUserProfile = (profile: ProfileType) => ({
    type: SET_USER_PROFILE,
    profile
} as const )
//_______________thunk
export const getUserProfileThunk = (userId: string) => (dispatch: Dispatch) => {
    usersAPI.getProfile(userId)
        .then(res => {
           dispatch(setUserProfile(res.data))
        })
}

export default profileReducer;