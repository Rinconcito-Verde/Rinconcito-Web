import { Context } from 'hono'
import { generateToken, hashPassword, verifyPassword } from '@/services/auth'
import { createUser, deleteUser, findUserByUsername, updateUserPassword } from '@/services/user'
import { incrementFailedAttempts, isAccountLocked, resetFailedAttempts } from '@/services/loginAttempts';

export const registerHandler = async (c: Context) => {
  const db = c.env.DB;
  const { username, password } = await c.req.json()
  if (!username || !password) {
    return c.json({ error: 'Required username and password' }, 400)
  }

  const hashedPassword = await hashPassword(password)
  await createUser(db, username, hashedPassword)

  return c.json({ message: 'Successfully registered user' })
}

export const loginHandler = async (c: Context) => {
  const db = c.env.DB;
  const expirationHours = c.env.JWT_EXPIRATION_HOURS;
  const JwtSecret = c.env.JWT_SECRET
  const { username, password } = await c.req.json()
  if (!username || !password) {
    return c.json({ error: 'Required username and password' }, 400)
  }

  const user:any = await findUserByUsername(db, username)
  if (!user) {
    return c.json({ error: 'Invalid username or password' }, 401)
  }
  if (await isAccountLocked(user)) {
    return c.json({ error: 'Account locked due to multiple failed login attempts' }, 403)
  }
  const isValid = await verifyPassword(password, user.password)
  if (!isValid) {
    await incrementFailedAttempts(db ,username)
    return c.json({ error: 'Invalid username or password' }, 401)
  }
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + (expirationHours * 60 * 60);
  await resetFailedAttempts(db, username)
  const token = await generateToken(JwtSecret, { username, iat: iat, exp: exp })
  return c.json({ token })
}

export const changePasswordHandler = async (c: Context) => {
  try {
    const db = c.env.DB;
    const { username, oldPassword, newPassword } = await c.req.json();

    if (!username || !oldPassword || !newPassword) {
      return c.json({ error: 'Username, old password, and new password are required' }, 400);
    }

    const user: any = await findUserByUsername(db, username);
    if (!user) {
      return c.json({ error: 'Invalid username or password' }, 401);
    }

    const isValid = await verifyPassword(oldPassword, user.password);
    if (!isValid) {
      return c.json({ error: 'Invalid old password' }, 401);
    }

    const hashedNewPassword = await hashPassword(newPassword);
    await updateUserPassword(db, username, hashedNewPassword);

    return c.json({ message: 'Password updated successfully' });
  } catch (error: any) {
    return c.json({ error: error.message || 'Internal Server Error' }, 500);
  }
};

export const deleteUserHandler = async (c: Context) => {
  try {
    const db = c.env.DB;
    const username = c.req.param("username");

    const user: any = await findUserByUsername(db, username);
    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }
    await deleteUser(db, username);

    return c.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    return c.json({ error: error.message || 'Internal Server Error' }, 500);
  }
};