const maxAttempts = 5

export const incrementFailedAttempts = async (db:D1Database, username: string) => {
  await db.prepare('UPDATE users SET attempts = attempts + 1 WHERE username = ?').bind(username).run()
}

export const resetFailedAttempts = async (db:D1Database, username: string) => {
  await db.prepare('UPDATE users SET attempts = 0 WHERE username = ?').bind(username).run()
}

export const isAccountLocked = async (user: any) => {
  const attempts = user.attempts
  return attempts >= maxAttempts
}
 