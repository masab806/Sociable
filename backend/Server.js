const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const AuthRouter = require("./routes/auth.route")

dotenv.config()

app.use(cors({
    origin: "*"
}))

app.use("/api/auth", AuthRouter)


app.listen(process.env.PORT, ()=> {
    console.log("Server Is Listening To Port")
})