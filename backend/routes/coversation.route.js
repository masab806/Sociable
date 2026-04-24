const express = require("express")
const { AuthMiddleware } = require("../middlewares/auth.middleware")
const {AddUserConversation, GetUserConversations, SearchConversations, FetchConversationById} = require("../controllers/conversation.controller")
const router = express.Router()

router.post("/addConversation", AuthMiddleware, AddUserConversation)
router.get("/getAllConvo", AuthMiddleware, GetUserConversations)
router.get("/searchConvo", AuthMiddleware, SearchConversations)
router.get("/fetchConvo", AuthMiddleware, FetchConversationById)

module.exports = router;