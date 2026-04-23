import api from "../api/api";
import { useAuthStore } from "../store/auth.store";

const userService = {
    searchUsers: async (q: string)=> {
        try {
            const token = useAuthStore.getState().token

            const res = await api.get(`/api/user/search?q=${q}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const responseData = res.data

            return responseData
        } catch (error) {
            console.log("Error In User Service: ", error)
            throw error
        }
    }
}

export default userService