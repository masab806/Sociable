const express = require("express")
const router = express.Router()
const { UserRegister, UserLogin } = require("../controllers/auth.controller")

router.post("/register", UserRegister)
router.post("/login", UserLogin)

module.exports = router