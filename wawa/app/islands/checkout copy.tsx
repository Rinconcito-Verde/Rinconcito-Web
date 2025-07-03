














import { useEffect, useRef, useState } from 'hono/jsx';
import { loadStripe, Stripe, StripeElements, Appearance } from '@stripe/stripe-js';
import { formatPrice } from '@/utils/prices';
import { product } from '@/types/types';

type CartProduct = product & { quantity: number };

export default function Checkout() {
  const [loading, setLoading] = useState(true);
  const addressContainerRef = useRef<HTMLDivElement>(null);
  const paymentContainerRef = useRef<HTMLDivElement>(null);
  const linkAuthRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<StripeElements | null>(null);
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [items, setItems] = useState<{ id: number; quantity: number }[]>([]);
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [currency, setCurrency] = useState('USD');
  const [errorLoading, setErrorLoading] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('cartItems');
    if (!stored) {
      localStorage.setItem('cartItems', JSON.stringify([]));
    } else {
      setItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));

    const fetchProducts = async () => {
      if (items.length === 0) {
        setLoading(false);
        setCartItems([]);
        setTotal(0);
        return;
      }

      try {
        const ids = items.map(p => p.id);
        let products 

        products = products.map(item => ({
          ...item,
          quantity: items.find(i => i.id === item.id)?.quantity ?? 1
        }));
        setLoading(false);
        setCartItems(products);
        setCurrency(products[0].currency);
        // Calcular el total
        const totalAmount = products.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotal(totalAmount);
      } catch (error) {
        setErrorLoading('Ocurrió un error al cargar el carrito. Inténtalo de nuevo.');
        console.error('Error al cargar productos del carrito', error);
      }
    };

    fetchProducts();
  }, [items]);

  useEffect(() => {
    let mounted = true;

    async function initialize() {
      const stripeInstance = await loadStripe("pk_test_51RW4FR4KAbpUTRTN06XaDRA3Uk71BlDGPHiuyW2ck6gK3RKwS5swKFIE1StoiCaFXFr5JuYUIjRicfpSGd6qL0Ay00GxgTWdDW");
      if (mounted) setStripe(stripeInstance);
      if (!stripeInstance) return;

      const response = await fetch("/api/checkout/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items,
        }),
      });
      const data: { clientSecret: string } = await response.json();
      if (mounted) setClientSecret(data.clientSecret);
setCartItems(data.items);
      const appearance: Appearance = {
        theme: 'stripe',
        variables: {
          colorPrimary: '#000000',
          colorBackground: '#d5dbb7',
          colorText: '#000000',
          colorDanger: '#df1b41',
          fontFamily: 'Quicksand',
          spacingUnit: '3px',
          borderRadius: '4px',
        }
      };

      const elementsInstance = stripeInstance.elements({ appearance, clientSecret: data.clientSecret });
      if (mounted) setElements(elementsInstance);

      // LINK AUTH ELEMENT
      const linkElement = elementsInstance.create("linkAuthentication");
      linkElement.mount("#link-authentication-element");
      linkElement.on("change", (event) => {
        setEmail(event.value.email || null);
      });

      // ADDRESS ELEMENT
      const addressOptions = {
        mode: 'shipping' as const,
        fields: {
          phone: 'always' as const,
        },
      };
      const addressElement = elementsInstance.create('address', addressOptions);

      // PAYMENT ELEMENT
      const paymentElementOptions = {
        layout: "tabs" as const
      };
      const paymentElement = elementsInstance.create("payment", paymentElementOptions);

      if (mounted) {
        addressElement.mount(addressContainerRef.current!);
        paymentElement.mount(paymentContainerRef.current!);
      }
    }

    if (cartItems.length > 0) {
      initialize();
    }
    return () => { mounted = false; };
  }, [cartItems]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    setMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/pago/status`,
        payment_method_data: {
          billing_details: {
            email: email ?? undefined,
          },
        },
      },
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message || 'Ocurrió un error al procesar el pago.');
    } else {
      setMessage('Pago procesado correctamente.');
    }

    setLoading(false);
  }
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        {errorLoading ? (
          <>
            <p className="text-lg mb-8">{errorLoading}</p>
            <a
              href="/carrito"
              className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              role="button"
            >
              Volver a intentar
            </a>
          </>
        ) : (
          <>
            <p className="text-lg mb-8">Cargando...</p>
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-green-500"></div>
          </>
        )}
      </div>
    );
  }
  return (
    <div className="flex flex-col md:flex-row w-full justify-between px-8 py-4 pb-0 gap-3 ">
      <div className="p-6 rounded shadow w-full h-[50%] md:max-w-[500px] border">
        <form id="payment-form" onSubmit={handleSubmit}>
          <div id="link-authentication-element" ref={linkAuthRef} className="mb-4"></div>
          <div id="address-element-container" ref={addressContainerRef} className="mb-4"></div>
          <div id="payment-element-container" ref={paymentContainerRef}></div>

          <button
            id="submit"
            type="submit"
            disabled={loading}
            className="mt-4 bg-black text-white p-2 rounded w-full"
          >
            {loading ? <div className="spinner" id="spinner"></div> : <span id="button-text">Pagar ahora</span>}
          </button>

          {message && (
            <div id="payment-message" className="mt-4 text-center text-red-500">{message}</div>
          )}
        </form>
      </div>

      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-2">Resumen</h2>
        {errorLoading && <div className="text-red-500 mb-2">{errorLoading}</div>}
        {cartItems.length === 0 ? (
          <div className="text-gray-500">No hay productos en el carrito.</div>
        ) : (
          <>
            {cartItems.map(item => (
              <div key={item.id} className="mb-2 border rounded px-4 py-2">
                <p className="text-gray-700">{item.name}</p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">Cantidad: {item.quantity}</p>
                  <p className="text-gray-700">{formatPrice(item.price * item.quantity, item.currency)} {item.currency}</p>
                </div>

              </div>
            ))}
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total</span>
              <span>{formatPrice(total, currency)} {currency}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
