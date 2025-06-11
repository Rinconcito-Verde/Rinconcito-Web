import { Hono } from "hono"
import { getCartById, createCart, updateCart, deleteCart } from "../handlers/cart"

export const cartRouter = new Hono()

cartRouter.get("/:id", getCartById) 
cartRouter.post("/", createCart) 
cartRouter.put("/:id", updateCart) 
cartRouter.delete("/:id", deleteCart) 
