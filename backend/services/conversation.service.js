const { eq, and, inArray, or, ne, like } = require("drizzle-orm")
const { db } = require("../config/db")
const { conversation, conversationParticipants, user } = require("../models/schema")

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
        if (!userId) return "No UserID"

        const userConvos = await db
            .select()
            .from(conversationParticipants)
            .where(eq(conversationParticipants.userId, userId))

        if (!userConvos.length) {
            return { success: false, message: "No Conversations Found!" }
        }

        const conversationIds = userConvos.map(p => p.conversationId)

        const otherParticipants = await db
            .select({
                conversationId: conversationParticipants.conversationId,
                username: user.username, 
            })
            .from(conversationParticipants)
            .innerJoin(user, eq(conversationParticipants.userId, user.id))
            .where(
                and(
                    inArray(conversationParticipants.conversationId, conversationIds),
                    ne(conversationParticipants.userId, userId) 
                )
            )

        const nameMap = Object.fromEntries(
            otherParticipants.map(p => [p.conversationId, p.username])
        )

        const allUserConversations = await db
            .select()
            .from(conversation)
            .where(inArray(conversation.id, conversationIds))

        const withDisplayName = allUserConversations.map(c => ({
            ...c,
            conversationName: nameMap[c.id] || c.conversationName
        }))

        return { success: true, allUserConversations: withDisplayName }

    } catch (error) {
        console.log("An Error Occurred: ", error)
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


async function GetConversationById(conversationId, currentUserId) {  
    try {
        const existingConversation = await db
            .select()
            .from(conversation)
            .where(eq(conversation.id, conversationId))
            .limit(1)
            .then(r => r[0])

        if (!existingConversation) {
            return { success: false, message: "No Conversation Found!" }
        }

        const otherParticipant = await db
            .select({ username: user.username })
            .from(conversationParticipants)
            .innerJoin(user, eq(conversationParticipants.userId, user.id))
            .where(
                and(
                    eq(conversationParticipants.conversationId, conversationId),
                    ne(conversationParticipants.userId, currentUserId) 
                )
            )
            .limit(1)
            .then(r => r[0])

        return {
            success: true,
            data: {
                ...existingConversation,
                conversationName: otherParticipant?.username || existingConversation.conversationName
            }
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