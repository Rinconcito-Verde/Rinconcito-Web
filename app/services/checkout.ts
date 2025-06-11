import { createPaymentIntent } from "./stripe";
import { getProductsByIds } from "./products"
import { calculateTotal } from "@/utils/prices";
import { cartProduct } from "@/types/types";

export async function stripePaymentIntent(db: D1Database, stripeSecretKey: string, { items, currency, description }: {
  items: { id: number, quantity: number }[];
  currency: string;
  description: string;
}) {
  const products = await getItems(db, items);
  const amount = calculateTotal(products);
  const maxAttempts = 3;
  let attempt = 0;
  const metadata: Record<string, string> = {};
  products.map((product) =>
    metadata[product.id] = `quantity: ${product.quantity}`
  );

  while (attempt < maxAttempts) {
    try {
      const payInt = await createPaymentIntent(stripeSecretKey, { amount, currency: 'usd', description, metadata });
      const items = products.map(item => ({
        id: item.id,
        price: item.price,
        totalPrice: item.price * item.quantity,
        quantity: item.quantity,
        name: item.name,
        image: item.image,
      }))
      return { ...payInt, items };
    } catch (error: any) {
      if (error.status >= 500 && error.status < 600) {
        attempt++;
        if (attempt === maxAttempts) throw error;
        await new Promise((res) => setTimeout(res, 500));
      } else {
        throw error;
      }
    }
  }
}

async function getItems(db: D1Database, items: { id: number, quantity: number }[]) {
  const ids = items.map(item => item.id);
  let products = await getProductsByIds(db, ids);
  if (!products) {
    throw new Error('No products found');
  }
  return products.map(item => ({
    ...item,
    quantity: items.find(i => i.id === item.id)?.quantity ?? 1
  })) as cartProduct[];
}