import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': '4d43ae7e-4605-44de-86ee-0a5c699ed420'}
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    followUsers(userId: string) {
        return instance.post(`follow/${userId}`)
    },
    unFollowUsers(userId: string){
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId: string){
        return instance.get(`profile/` + userId)
    }
}

export const authAPI = {
   me() {
     return instance.get(`auth/me`)
   }
}








