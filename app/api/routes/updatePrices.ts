import { Hono } from "hono"
import { updatePrices } from "../handlers/updatePrices"
import { authMiddleware } from "../middlewares/auth"

export const updatePricesRouter = new Hono()

updatePricesRouter.get("/", updatePrices)