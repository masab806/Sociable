const express = require("express")
const { FetchConversationMessages } = require("../controllers/message.controller")
const router = express.Router()

router.get("/getMessages", FetchConversationMessages)

module.exports = router