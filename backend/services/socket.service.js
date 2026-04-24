const { Server } = require("socket.io")
const { SendMessage } = require("./message.service")

let io

const initSocket = ({ server }) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })

    io.on("connection", (socket) => {
        console.log("User Connected With Server: ", socket.id)

        socket.on("joinConversation", ({ conversationId }) => {
            socket.join(`conversation_${conversationId}`)
            console.log(`User Joined Conversation ${conversationId}`)
        })

        socket.on("sendMessage", async (data) => {
            try {
                const { senderId, conversationId, message } = data

                const result = await SendMessage(message, senderId, conversationId)

                if (!result.success) {
                    return socket.emit("errorMessage", result.message)
                }

                socket.to(`conversation_${conversationId}`).emit(
                    "newMessage",
                    result.message
                )
            } catch (error) {
                console.log("Socket sendMessage Error: ", error)
            }
        })
    })
}

module.exports = {
    initSocket
}