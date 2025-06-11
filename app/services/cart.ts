export async function getCart(db: D1Database, id: string) {
  const cartExists = await db
    .prepare(`SELECT id FROM cart WHERE id = ?`)
    .bind(id)
    .first()

  const { results } = await db
    .prepare(`
      SELECT  
        ci.quantity, 
        p.id, 
        p.name, 
        p.short_description, 
        p.price, 
        p.discount, 
        p.currency, 
        p.image
      FROM cart c
      JOIN cart_items ci ON ci.cart_id = c.id
      JOIN product p ON ci.product_id = p.id
      WHERE c.id = ?
    `)
    .bind(id)
    .all()

  return cartExists?.id ? results : null
}

export async function saveCart(db: D1Database, items: any[]) {
  const cartId = crypto.randomUUID()

  try {
    await db
      .prepare("INSERT INTO cart (id) VALUES (?)")
      .bind(cartId)
      .run()
    for (const item of items) {
      const productCheck = await db
        .prepare("SELECT id FROM product WHERE id = ?")
        .bind(item.id)
        .first()

      if (!productCheck) {
        throw new Error(`Product with ID ${item.id} does not exist.`)
      }
      await db
        .prepare("INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)")
        .bind(cartId, item.id, item.quantity)
        .run()
    }
    return cartId
  } catch (error: any) {
    throw new Error("An error occurred while saving the cart:" + error.message)
  }
}


export async function modifyCart(db: D1Database, id: string, items: any[]) {
  for (const item of items) {
    const existingItem = await db
      .prepare("SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?")
      .bind(id, item.id)
      .first();
    if (existingItem) {
      await db
        .prepare("UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?")
        .bind(item.quantity, id, item.id)
        .run();
    } else {
      await db
        .prepare("INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)")
        .bind(id, item.id, item.quantity)
        .run();
    }
  }

  const ids = items.map(item => item.id);

  await db
    .prepare("DELETE FROM cart_items WHERE cart_id = ? AND product_id NOT IN (" + ids.map(() => "?").join(",") + ")")
    .bind(id, ...ids)
    .run();

  return true;
}

export async function removeCart(db: D1Database, id: string) {
  const result = await db.prepare("DELETE FROM cart WHERE id = ?").bind(id).run()
  return result.meta.changes > 0
}
