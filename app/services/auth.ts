import { sign, verify } from 'hono/jwt'
import { hash, compare } from 'bcryptjs'
import { Context } from 'hono'
import { SignatureKey } from 'hono/utils/jwt/jws'

export const hashPassword = async (password: string) => {
  return await hash(password, 10)
}

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword)
}

export const generateToken = async (JwtSecret: SignatureKey, payload: any) => {
  return await sign(payload, JwtSecret)
}

export const validateToken = async (c:Context, JwtSecret: SignatureKey, token: string) => {
  return await verify(token, JwtSecret)
}
