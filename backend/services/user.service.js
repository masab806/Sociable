const { user } = require("../models/schema")
const { db } = require("../config/db")
const { eq, ilike, and, ne } = require("drizzle-orm")

async function fetchUserByName(username, currentuserId) {
    try {
        const existingUsers = await db
            .select({
                userId: user.id,
                username: user.username
            })
            .from(user)
            .where(
                and(
                    ilike(user.username, `%${username}%`),
                    ne(user.id, currentuserId)
                )
            )

        if (existingUsers.length <= 0) {
            return {
                success: false,
                message: "No Users Found!"
            }
        }

        return {
            success: true,
            data: existingUsers
        }



    } catch (error) {
        console.log("Error Occured In User Service: ", error)
    }
}

module.exports = {
    fetchUserByName
}