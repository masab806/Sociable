const { eq } = require("drizzle-orm")
const { db } = require("../config/db")
const {conversation, conversationParticipants} = require("../models/schema")

async function AddConversation(userId, conversationName) {
    try {
        
        const existingConversation = await db
        .select()
        .from(conversationParticipants)
        .where(eq(conversationParticipants.userId, userId))
        .limit(1)
        .then(r => r[0])

        if(existingConversation){
            return {
                success: false,
                message: "Conversation Already Exists!"
            }
        }

        const newConversation = await db
        .insert(conversation)
        .values({
            userId: userId,
            conversationName: conversationName
        })

        return {
            success: true,
            newConversation
        }

    } catch (error) {
        console.log("Error On Adding Conversation: ", error)
    }
}

async function DeleteConversation(conversationId) {
    try {
        const existingConversation = await db
        .select()
        .from(conversation)
        .where(eq(conversation.id, conversationId))
        .limit(1)
        .then(r=> r[0])

        if(!existingConversation){
            return {
                success: false,
                message: "No Conversation Exists!"
            }
        }

        await db.delete(existingConversation)

        return {
            success: true
        }

    } catch (error) {
        
    }
}

async function GetAllUserConversations(userId) {
    try {
        const allConversations = await db
        .select()
        .from(conversationParticipants)
        .where(eq(conversationParticipants.userId, userId))
        
        return {
            success: true,
            allConversations
        }

    } catch (error) {
        console.log("Error While Getting All Conversations: ", error)
    }
}

module.exports = {
    AddConversation,
    DeleteConversation,
    GetAllUserConversations
}