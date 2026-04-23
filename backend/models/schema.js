
const { integer } = require("drizzle-orm/pg-core")
const {pgTable, serial, varchar, text, timestamp} = require("drizzle-orm/pg-core")

const user = pgTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username").notNull(),
    email: varchar("email").notNull(),
    password: text("password").notNull()
})

const conversation = pgTable("conversations", {
    id: serial("id").primaryKey(),
    conversationName: varchar("conversation_name").notNull(),
})

const conversationParticipants = pgTable("conversation_participants", {
    id: serial("id").primaryKey(),
    conversationId: integer("conversation_id").references(() => conversation.id),
    userId: integer("user_id").references(() => user.id),
    joinedAt: timestamp("joined_at").defaultNow()
});

const messages = pgTable("messages", {
    id: serial("id").primaryKey(),
    messageText: text("message"),
    conversationId: integer("conversation_id").references(() => conversation.id),
    senderId: integer("sender_id").references(() => user.id),
    createdAt: timestamp("created_at").defaultNow()
});



module.exports = {
    user,
    conversation,
    messages,
    conversationParticipants
}