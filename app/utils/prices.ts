export function priceDiscount(basePrice: number, discount: number) {
  if (!discount || discount <= 0) return null;
  const result = basePrice / (1 - discount / 100);
  return Math.round(result);
}
export function formatPrice(amount: number, currency: string, locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount / 100);
}
export function calculateTotal(products: { price: number, quantity: number }[]){
  const total = products.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  return total
}

async function convertCurrency(amount: number, from: string, to: string) {

  return Math.round(0* 100) / 100;
}
