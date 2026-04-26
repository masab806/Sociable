import { io } from "socket.io-client"
import { useAuthStore } from "../store/auth.store"

let socket = null

const socketService = {
    connectSocket: () => {
        if (socket?.connected) return socket

        const token = useAuthStore.getState().token

        socket = io("http://192.168.100.17:3000", {
            auth: {
                token
            },
            forceNew: true
        })

        socket.on("connect", () => {
            console.log("Connected!", socket.id)
        })

        socket.on("disconnect", (reason) => {
            console.log("Disconnected: ", reason)
        })

        socket.on("error", (error) => {
            console.log("Socket Error: ", error)
        })

        return socket;
    },

    getSocket: () => socket,

    joinConversation: (conversationId: number) => {
        if (!socket) return

        socket.emit("joinConversation", { conversationId })
    },

    sendMessage: (data, callback) => {
        if (!socket) return

        socket.emit("sendMessage", data, callback)
    },

    off: (event) => {
        if (!socket) return;

        socket.off(event);
    },

    onNewMessage: (callback)=>{
        if(!socket) return

        socket.on("newMessage", callback)
    }
};

    




export default socketService