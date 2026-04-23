const express = require("express")
const { FetchUsersByNames } = require("../controllers/user.controller")
const {AuthMiddleware} = require("../middlewares/auth.middleware")
const router = express.Router()

router.get("/search", AuthMiddleware, FetchUsersByNames)

module.exports = router