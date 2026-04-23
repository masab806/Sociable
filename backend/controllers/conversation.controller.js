const { GetAllUserConversations, AddConversation, SearchConversationByName } = require("../services/conversation.service")

async function GetUserConversations(req, res) {
    try {
        const { userId } = req.user

        console.log("User Id is: ", userId)

        if (!userId) {
            return res.status(400).json({
                message: "Unauthorized!"
            })
        }

        const result = await GetAllUserConversations(userId)

        console.log(result)

        if (!result?.success) {
            return res.status(401).json(result)
        }

        return res.status(200).json(result)

    } catch (error) {
        console.log("Error In Get User Conversation Controller: ", error)
    }
}

async function SearchConversations(req, res) {
    try {
        const { userId } = req.user
        const { q } = req.query

        if (!userId || !q) {
            return res.status(401).json({
                message: "Invalid User!"
            })
        }

        const result = await SearchConversationByName(userId, q)

        if (!result.success) {
            return res.status(401).json(result)
        }

        return res.status(200).json(result)
    } catch (error) {
        console.log("Error In Search Conversation (Controller): ", error)
    }
}

async function AddUserConversation(req, res) {
    try {
        const { userId } = req.user
        const { conversationName, participantId } = req.body

        const result = await AddConversation(userId, participantId, conversationName)

        if (!result.success) {
            console.log(result)
            return res.status(401).json(result)
        }

        return res.status(200).json(result)
    } catch (error) {
        console.log("An Error Occured While Adding Conversations: ", error)
    }
}

module.exports = {
    GetUserConversations,
    AddUserConversation,
    SearchConversations
}