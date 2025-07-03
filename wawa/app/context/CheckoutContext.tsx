import { getC } from "./GlobalC";

export async function stripePublicKey() {
  const c = getC();
 const publicKey = c.env.STRIPE_PUBLIC_KEY
 return publicKey
}   