import { Context } from "hono"
import { getCart, saveCart, modifyCart, removeCart } from "@/services/cart"

export async function getCartById(c: Context) {
  const db = c.env.DB
  const id = c.req.param("id")

  const cart = await getCart(db, id)
  if (!cart) return c.json({ error: "Cart not found" }, 404)

  return c.json(cart)
}

export async function createCart(c: Context) {
  const db = c.env.DB
  const body = await c.req.json()
  if (!body.items || !Array.isArray(body.items)) {
    return c.json({ error: "Invalid cart format" }, 400)
  }

 
  try {
    const cartId = await saveCart(db, body.items);
    return c.json({ message: "Cart created", cartId });
  } catch (error:any) {
    return c.json({ error: error.message }, 400);
  }
}

export async function updateCart(c: Context) {
  const db = c.env.DB
  const id = c.req.param("id")
  const body = await c.req.json()

  if (!body.items || !Array.isArray(body.items)) {
    return c.json({ error: "Invalid cart format" }, 400)
  }

  const updated = await modifyCart(db, id, body.items)
  if (!updated) return c.json({ error: "Cart not found or no changes made" }, 404)

  return c.json({ message: "Cart updated successfully" })
}

export async function deleteCart(c: Context) {
  const db = c.env.DB
  const id = c.req.param("id")

  const deleted = await removeCart(db, id)
  if (!deleted) return c.json({ error: "Cart not found" }, 404)

  return c.json({ message: "Cart deleted successfully" })
}
