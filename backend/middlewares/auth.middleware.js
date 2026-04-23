const jwt = require("jsonwebtoken")

async function AuthMiddleware(req, res, next) {
    try {
        const authHeader = req.headers['authorization']
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({
                message: "Unauthorized!"
            })
        }

        const token = authHeader.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()

    } catch (error) {
        console.log("Error In Auth Middleware: ", error)
        return res.status(401).json({
            success: false,
            message: "Invalid Token!"
        })
    }
}

module.exports = { AuthMiddleware }