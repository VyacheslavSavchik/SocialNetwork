import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'


export type UsersType = {
    portionSize: number
    id: string
    name: string
    status: string
    followed: boolean
    photos: {
        small: string
        large: string
    }
}

export type initialStateType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<string>
    userId: string
    portionSize: number
    photos: {
        small: string
        large: string
    }
}

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    userId: '',
    portionSize: 10,
    photos: {
        small: '',
        large: ''
    }
}

const usersReducer = (state: initialStateType = initialState, action: ActionsTypesOfUsers): initialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_USERS_TOTAL_COUNT:
            return {...state, totalUsersCount: action.count}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state, followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id != action.userId)
            }
        default:
            return state;
    }
}

export type ActionsTypesOfUsers =
    ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>

export const followSuccess = (userId: string) => ({
    type: FOLLOW,
    userId
} as const)

export const unfollowSuccess = (userId: string) => ({
    type: UNFOLLOW,
    userId
} as const)

export const setUsers = (users: UsersType[]) => ({
    type: SET_USERS,
    users
} as const)

export const setCurrentPage = (currentPage: number) => ({
    type: SET_CURRENT_PAGE,
    currentPage
} as const)

export const setTotalCount = (totalUsersCount: number) => ({
    type: SET_USERS_TOTAL_COUNT,
    count: totalUsersCount
} as const)

export const toggleIsFetching = (isFetching: boolean) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
} as const)

export const toggleFollowingProgress = (isFetching: boolean, userId: string) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
} as const)

export const getUsersTC = (page: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))
    const res = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(res.data.items))
    dispatch(setTotalCount(res.data.totalCount))
}

export const follow = (userId: string) => async (dispatch: Dispatch) => {
    const apiMethod = usersAPI.followUsers(userId)
    dispatch(toggleFollowingProgress(true, userId))
    const res = await apiMethod
    if (res.data.resultCode === 1) {
        dispatch(followSuccess(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const unFollow = (userId: string) => async (dispatch: Dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    const res = await usersAPI.unFollowUsers(userId)
    if (res.data.resultCode === 1) {
        dispatch(unfollowSuccess(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export default usersReducer;