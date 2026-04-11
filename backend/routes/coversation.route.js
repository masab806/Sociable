const express = require("express")
const { AuthMiddleware } = require("../middlewares/auth.middleware")
const { GetAllUserConversations } = require("../services/conversation.service")
const router = express.Router()

router.get("/getallconversations", AuthMiddleware, GetAllUserConversations)

module.exports = router;