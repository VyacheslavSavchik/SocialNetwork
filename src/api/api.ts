import axios from "axios";
import {formDataType} from "../login/Login";
import {ProfileType} from "../Redux/profile-reducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': '4d43ae7e-4605-44de-86ee-0a5c699ed420'}
})

export const usersAPI = {
    getUsers(page: number, pageSize: number) {
        return instance.get(`users?page=${page}&count=${pageSize}`)
    },
    followUsers(userId: string) {
        return instance.post(`follow/${userId}`)
    },
    unFollowUsers(userId: string){
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId: string){
        console.warn('Obsolete method. Please profileAPI object.')
        return profileAPI.getProfile(userId)
    }
}
export const profileAPI = {
    getProfile(userId: string){
        return instance.get(`profile/` + userId)
    },
    getStatus(userId: string){
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status})
    },
    savePhoto(photoFile: string | Blob) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`/profile`, profile)
    }
}
export const authAPI = {
   me() {
     return instance.get(`auth/me`)
   },
    login(params: formDataType) {
        return instance.post<ResponseType>(`auth/login`, params)
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}



export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}



