const {GetAllUserConversations, AddConversation} = require("../services/conversation.service")

async function GetUserConversations(req,res) {
    try {
        const {userId} = req.user

        if(!userId){
            return res.status(400).json({
                message: "Unauthorized!"
            })
        }
        
        const result = await GetAllUserConversations(userId)

        if(!result?.success){
            return res.status(400).json(result)
        }

        return res.status(200).json(result)

    } catch (error) {
        console.log("Error In Get User Conversation Controller: ", error)
    }
}

module.exports = {
    GetUserConversations
}