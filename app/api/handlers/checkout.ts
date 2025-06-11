import { Context } from "hono";
import { stripePaymentIntent } from "@/services/checkout";

export const stripePaymentIntentHandle = async (c:Context) => {
    try {
        const db = c.env.DB;
        const stripeSecretKey = c.env.STRIPE_SECRET_KEY;
        const { items, currency, description } = await c.req.json();
        if (!Array.isArray(items) || items.length === 0) {
            return c.json({ error: 'items must be a non-empty array' }, 400);
        }
        const result = await stripePaymentIntent(db, stripeSecretKey, { items, currency, description });
        return c.json({
            clientSecret: result.client_secret,
            id: result.id,
            amount: result.amount,
            currency: result.currency,
            status: result.status,
            items: result.items
        });
    } catch (error: any) {
        console.error('Checkout error:', error);
        return c.json({ error: error.message || 'Unknown error' }, 500);
    }
};