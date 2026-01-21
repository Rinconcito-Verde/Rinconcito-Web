import { Context, Next } from 'hono'
import { jwt } from 'hono/jwt'
import { secureHeaders } from 'hono/secure-headers'

export const secureHeadersMiddleware = secureHeaders()
export async function authMiddleware(c: Context, next: Next) {
    const JwtSecret = c.env.JWT_SECRET
    const jwtMiddleware = jwt({
        secret: JwtSecret,
        alg: 'HS256'
    })
    return jwtMiddleware(c, next)
}