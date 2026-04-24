const { eq } = require("drizzle-orm")
const {db} = require("../config/db")
const { messages } = require("../models/schema")

async function SendMessage(message, senderId, conversationId) {
    try {
        const [newMessage] = await db
        .insert(messages)
        .values({
            senderId: senderId,
            conversationId: conversationId,
            messageText: message
        })
        .returning()

        if(!newMessage){
            return {
                success: false,
                message: "Message Not Sent!"
            }
        }

        return {
            success: true,
            message: newMessage
        }

    } catch (error) {
        console.log("Error In Send Message (Service): ", error)
    }
}

async function getConversationMessage(conversationId) {
    try {
        const conversationMessages = await db
        .select()
        .from(messages)
        .where(eq(messages.conversationId, conversationId))

        if(conversationMessages.length < 0){
            return {
                success: false,
                message: "No Messages Found!"
            }
        }

        return {
            success: true,
            messages: conversationMessages
        }

    } catch (error) {
        console.log("Error In Get Conversation Messages (Service): ", error)
    }
}

module.exports = {
    SendMessage,
    getConversationMessage
}