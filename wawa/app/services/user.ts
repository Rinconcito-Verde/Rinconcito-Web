export const createUser = async (db: D1Database, username: string, password: string) => {
  return await db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').bind(username, password).run()
}

export const findUserByUsername = async (db: D1Database, username: string) => {
  return await db.prepare('SELECT * FROM users WHERE username = ?').bind(username).first()
}

export const updateUserPassword = async (db: D1Database, username: string, newPassword: string) => {
  return await db
    .prepare('UPDATE users SET password = ? WHERE username = ?')
    .bind(newPassword, username)
    .run();
};

export const deleteUser = async (db: D1Database, username: string) => {
  return await db
    .prepare('DELETE FROM users WHERE username = ?')
    .bind(username)
    .run();
};
