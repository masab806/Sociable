const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const AuthRouter = require("./routes/auth.route")
const ConversationRouter = require("./routes/coversation.route")
const UserRouter = require("./routes/user.route")

dotenv.config()

app.use(cors({
    origin: "*"
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use("/api/auth", AuthRouter)
app.use("/api/conversation", ConversationRouter)
app.use("/api/user", UserRouter)

app.listen(process.env.PORT, ()=> {
    console.log("Server Is Listening To PORT")
})