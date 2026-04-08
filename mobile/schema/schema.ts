import { z } from 'zod'

export const registerSchema = z.object({
    username: z.string().min(1, "Username is Required!"),
    email: z.email(),
    password: z.string().min(5, "Atleast 5 characters Password!"),
    confirmPassword: z.string()

})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords Donot Match!",
        path: ['confirmPassword']
    })

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(5, "Invalid Password!"),
})
