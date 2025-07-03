import { Hono } from 'hono'
import { registerHandler, loginHandler, changePasswordHandler, deleteUserHandler } from '../handlers/auth'
import { authMiddleware } from '../middlewares/auth'

import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const registerSchema = z.object({
    username: z.string().min(3, "Username is required"),
    password: z.string().min(8, "Password must be at least 8 characters")
})

const loginSchema = z.object({
    username: z.string(),
    password: z.string()
})

const changePasswordSchema = z.object({
    username: z.string(),
    oldPassword: z.string(),
    newPassword: z.string().min(8, "New password must be at least 8 characters")
})

export const authRoutes = new Hono()

authRoutes.post('/register',authMiddleware, zValidator('json', registerSchema), registerHandler)
authRoutes.post('/login', zValidator('json', loginSchema), loginHandler)
authRoutes.put('/password', authMiddleware, zValidator('json', changePasswordSchema), changePasswordHandler);
authRoutes.delete('/users/:username', authMiddleware, deleteUserHandler);