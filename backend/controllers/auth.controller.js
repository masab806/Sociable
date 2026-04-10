const authService = require("../services/auth.service")

async function UserRegister(req, res) {
    try {
        const {username, email, password} = req.body


        if(!username || !email || !password){
            return res.status(400).json({
                message: "All Fields Required!"
            })
        }

        const result = await authService.registerUser(username, email, password)

        if(!result.success){
            console.log(result)
            return res.status(400).json(result)
        }

        return res.status(200).json(result)

    } catch (error) {
        console.log("An Error Occured In User Registration: ", error)
    }
}

async function UserLogin(req, res) {
    try {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({
                message: "All Fields Required!"
            })
        }

        const result = await authService.loginUser(email, password)

          if(!result.success){
            console.log(result)
            return res.status(400).json(result)
        }


        return res.status(200).json(result)

    } catch (error) {
        console.log("An Error Occured In User Login: ", error)
    }
}

module.exports = {
    UserRegister,
    UserLogin
}