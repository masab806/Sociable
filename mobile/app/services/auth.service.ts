import api from "../api/api";
import { UserLoginForm, UserRegisterForm, UserType } from "../lib/types";
import { useAuthStore } from "../store/auth.store";


const authService = {
    userRegister: async (data: UserRegisterForm)=> {
        const authStore = useAuthStore.getState()
        try {
            const res = await api.post('/api/auth/register', data)
            
            const responseData = res.data
            
            authStore.setUser(responseData.user, responseData.token)

            return responseData

        } catch (error) {
            console.log("Error In Auth Service: ", error)
            throw error
        }
    },

    userLogin: async (data: UserLoginForm)=> {
        try {
            const res = await api.post('/api/auth/login', data)

            return res.data

        } catch (error) {
            console.log("Error In Auth Service: ", error)
            throw error
        }
    }
}

export default authService