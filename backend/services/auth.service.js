const bcrypt = require("bcrypt")
const {db} = require("../config/db")
const {user} = require("../models/schema")
const {eq} = require('drizzle-orm')
const jwt = require('jsonwebtoken')

async function registerUser(username, email, password) {
    try {
        const existingUser = await db
        .select()
        .from(user)
        .where(eq(user.email, email))
        .limit(1)
        .then(r => r[0])

        if(existingUser){
            return {
                success: false,
                message: "User Already Exists!"
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const createdUser = await db
        .insert(user)
        .values({
            username: username,
            email: email,
            password: hashedPassword
        })

        return {
            success: true,
            createdUser
        }
        

    } catch (error) {
        console.log("An Error Occured! ", error)
    }
}

async function loginUser(email, password) {
    try {
        const existingUser = await db
        .select()
        .from(user)
        .where(eq(user.email, email))
        .limit(1)
        .then(r => r[0])

        if(!existingUser){
            return {
                success: false,
                message: "Invalid Credentials!"
            }
        }

        const isMatch = await bcrypt.compare(password, existingUser.password)

        if(!isMatch){
            return {
                success: false,
                message: "Invalid Credentials!"
            }
        }

        const payload = {
            username: existingUser.username,
            email: existingUser.email
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })


        return {
            success: true,
            user: payload,
            token
        }



    } catch (error) {
        console.log("An Error Occured! ", error)   
    }
}

module.exports = {
    registerUser,
    loginUser
}