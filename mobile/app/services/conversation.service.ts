import api from "../api/api";
import { useAuthStore } from "../store/auth.store";

const conversationService = {
    addConversation: async (
        userId: number,
        participantId: number,
        conversationName: string
    ) => {
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

            const responseData = res.data

            return responseData

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

    searchConversations: async (q: string) => {
        try {
            const token = useAuthStore.getState().token

            const res = await api.get(`/api/conversation/searchConvo?q=${q}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const responseData = res.data.data


            return responseData
        } catch (error) {
            console.log("Error In Searching Conversations: ", error)
            throw error
        }
    },

    fetchConversationById: async (conversationId: number) => {
        try {
            const token = useAuthStore.getState().token

            const res = await api.get(`/api/conversation/fetchConvo?conversationId=${conversationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const responseData = res.data.data ?? null

            return responseData

        } catch (error) {
            console.log("Error In Fetching Conversation By Id: ", error)
            throw error
        }
    },

    fetchConversationMessages: async (conversationId: number)=>{
        try {
            const token = useAuthStore.getState().token

            const  res = await api.get(`/api/message/getMessages?conversationId=${conversationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const responseData = res.data.messages

            return responseData
        } catch (error) {
            console.log("Error In Fetching Conversation Messages: ", error)
            throw error
        }
    }

}

export default conversationService