const {getConversationMessage} = require("../services/message.service")

async function FetchConversationMessages(req,res) {
    try {
        const {conversationId} = req.query

        if(!conversationId){
            return res.status(401).json({
                message: "No Conversation Id!"
            })
        }

        const result = await getConversationMessage(conversationId)

        if(!result.success){
            return res.status(401).json(result)
        }

        return res.status(200).json(result)

    } catch (error) {
        console.log("Error In Fetching Conversation (Controller): ", error)      
    }
}

module.exports = {
    FetchConversationMessages
}