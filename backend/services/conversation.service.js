const { eq, and, inArray, or, ne, like } = require("drizzle-orm")
const { db } = require("../config/db")
const { conversation, conversationParticipants } = require("../models/schema")

async function AddConversation(userId, participantId, conversationName) {
    try {


        const existing = await db
            .select()
            .from(conversationParticipants)
            .where(
                or(
                    eq(conversationParticipants.userId, userId),
                    eq(conversationParticipants.userId, participantId)
                )
            );

       const convoMap = new Map();

        for (const row of existing) {
            if (!convoMap.has(row.conversationId)) {
                convoMap.set(row.conversationId, new Set());
            }
            convoMap.get(row.conversationId).add(row.userId);
        }

        for (const [_, users] of convoMap.entries()) {
            if (users.has(userId) && users.has(participantId)) {
                return {
                    success: false,
                    message: "Conversation Already Exists!"
                };
            }
        }

        const newConversation = await db
            .insert(conversation)
            .values({
                conversationName,
                createdBy: userId
            })
            .returning();

        const convoId = newConversation[0].id;



        await db.insert(conversationParticipants).values([
            {
                conversationId: convoId,
                userId: userId
            },
            {
                conversationId: convoId,
                userId: participantId
            }
        ]);

        return {
            success: true,
            newConversation: newConversation[0]
        };


    } catch (error) {
        console.log("Error On Adding Conversation: ", error)

        return {
            success: false,
            message: "Failed To Add Conversation!"
        }
    }
}

async function GetAllUserConversations(userId) {
    try {

        if(!userId){
            return "No UserID"
        }

        const ConversationParticipants = await db
        .select()
        .from(conversationParticipants)
        .where(eq(conversationParticipants.userId, userId))
        
        if(!ConversationParticipants || ConversationParticipants.length === 0){
             return {
                success: false,
                message: "No Conversations Found!"
            }
        }

        const conversationIds = ConversationParticipants.map(
            p => p.conversationId
        )

        const allUserConversations = await db
        .select()
        .from(conversation)
        .where(inArray(conversation.id, conversationIds))


        return {
            success: true,
            allUserConversations
        }

    } catch (error) {
        console.log("An Error Occured: ", error)
    }
}

async function SearchConversationByName(userId, query) {
    try {
        const ConversationParticipants = await db
        .select()
        .from(conversationParticipants)
        .where(eq(conversationParticipants.userId, userId))

        const conversationIds = ConversationParticipants.map(
            p => p.conversationId 
        )

        const searchConversations = await db
        .select()
        .from(conversation)
        .where(and(
            inArray(conversation.id, conversationIds),
            like(conversation.conversationName, `%${query}%`)
        ))


        return {
            success: true,
            data: searchConversations
        }
    } catch (error) {
        console.log("An Error Occured: ", error)
    }
}


async function GetConversationById(conversationId) {
    try {
        const existingConversation = await db
        .select()
        .from(conversation)
        .where(eq(conversation.id, conversationId))
        .limit(1)
        .then(r => r[0])

        if(!existingConversation){
            return {
                success: false,
                message: "No Conversation Found!"
            }
        }

        return {
            success: true,
            data: existingConversation
        }



    } catch (error) {
        console.log("Error In Getting Conversation By Id (Service): ", error)
    }
}

module.exports = {
    AddConversation,
    GetAllUserConversations,
    SearchConversationByName,
    GetConversationById
}