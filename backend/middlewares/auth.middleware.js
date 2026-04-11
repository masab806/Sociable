const jwt = require("jsonwebtoken")

async function AuthMiddleware(req, res, next) {
    try {
        const authHeader = req.headers['authorization']
        if (!authHeader && !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({
                message: "Unauthorized!"
            })
        }

        const token = authHeader.split(' ')[1]

        const decoded = jwt.verify(process.env.SECRET_KEY, token)

        req.user = decoded

        next()

    } catch (error) {
        console.log("Error In Auth Middleware: ", error)
    }
}

module.exports = { AuthMiddleware }