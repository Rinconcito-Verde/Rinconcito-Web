import { Hono } from "hono"
import { stripePaymentIntentHandle } from "../handlers/checkout"

export const checkoutHRouter = new Hono()

checkoutHRouter.post("/stripe", stripePaymentIntentHandle)