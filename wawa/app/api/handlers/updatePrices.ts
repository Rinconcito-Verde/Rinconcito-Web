import { Context } from "hono";
import { updateproducts } from '@/services/updatePrices';

export async function updatePrices(c: Context) {

  const db = c.env.DB;

  try {
    const result = await updateproducts(db);
    return c.json({ message: "Updated database", result });
  } catch (error: any) {
    return c.json({ error: "Failed to sync database", details: error.message }, 500);
  }

}
