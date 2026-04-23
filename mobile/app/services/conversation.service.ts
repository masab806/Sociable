import api from "../api/api";
import { useAuthStore } from "../store/auth.store";

const conversationService = {
    addConversation: async (userId, participantId, conversationName) => {
        try {
            const token = useAuthStore.getState().token;

            const res = await api.post(
                "/api/conversation/addConversation",
                { userId, participantId, conversationName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(res.data)

            return res.data;

        } catch (error) {
            console.log("Error In conversation Service: ", error);
            throw error;
        }
    },

    getAllUserConversation: async () => {
        try {
            const token = useAuthStore.getState().token

            const res = await api.get("/api/conversation/getAllConvo", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const responseData = res.data.allUserConversations


            return responseData
        } catch (error) {
            console.log("Error In Getting Conversations: ", error)
            throw error
        }
    },

    searchConversations: async (q: string)=> {
        try {
              const token = useAuthStore.getState().token

              console.log(q)

            const res = await api.get(`/api/conversation/searchConvo?q=${q}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const responseData = res.data.data

            console.log(responseData)

            return responseData
        } catch (error) {
            console.log("Error In Searching Conversations: ", error)
            throw error
        }
    }

}

export default conversationService