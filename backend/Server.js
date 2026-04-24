const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const AuthRouter = require("./routes/auth.route")
const ConversationRouter = require("./routes/coversation.route")
const UserRouter = require("./routes/user.route")
const MessageRouter = require("./routes/message.route")
const { createServer } = require("http")
const { initSocket } = require("./services/socket.service")

dotenv.config()

app.use(cors({
    origin: "*"
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const server = createServer(app)

initSocket(server)

app.use("/api/auth", AuthRouter)
app.use("/api/conversation", ConversationRouter)
app.use("/api/user", UserRouter)
app.use("/api/message", MessageRouter)


server.listen(process.env.PORT, () => {
    console.log("Server Is Listening To PORT")
})