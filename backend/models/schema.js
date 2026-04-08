import { int, serial, varchar } from "drizzle-orm/mysql-core"

const {pgTable} = require("drizzle-orm/pg-core")

const user = pgTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username").notNull(),
    email: varchar("email").notNull(),
    password: text("password").notNull()
})

module.exports = {
    user
}