import { useEffect, useRef, useState } from 'hono/jsx';
import { loadStripe, Stripe, StripeElements, Appearance } from '@stripe/stripe-js';
import { formatPrice } from '@/utils/prices';

export default function Checkout({stripePublicKey}: {stripePublicKey: string}) {
  const [loading, setLoading] = useState(true);
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [elements, setElements] = useState<StripeElements | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [items, setItems] = useState<{ id: number; quantity: number }[]>([]);
  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [errorLoading, setErrorLoading] = useState<string | null>(null);

  const addressContainerRef = useRef<HTMLDivElement>(null);
  const paymentContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('cartItems');
    const parsed = stored ? JSON.parse(stored) : [];
    setItems(parsed);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!items.length) return;

    let mounted = true;

    async function initialize() {
      try {
        const stripeInstance = await loadStripe(stripePublicKey);
        if (!stripeInstance) throw new Error("No se pudo cargar Stripe");
        if (mounted) setStripe(stripeInstance);

        const response = await fetch("/api/checkout/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        });

        if (!response.ok) throw new Error("Error al comunicarse con el servidor");

        const data = await response.json();
        if (mounted) {
          setCheckoutData(data);
        }
        // Forzamos el tipo de data para evitar error de tipo unknown
        const clientSecret = (data as any).clientSecret;
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

        const elementsInstance = stripeInstance.elements({ appearance, clientSecret });
        if (mounted) setElements(elementsInstance);

        const linkElement = elementsInstance.create("linkAuthentication");
        linkElement.mount("#link-authentication-element");

        const addressElement = elementsInstance.create("address", {
          mode: "shipping",
          fields: {
            phone: "always",
          },
        });

        const paymentElement = elementsInstance.create("payment", {
          layout: "tabs",
        });

        addressElement.mount(addressContainerRef.current!);
        paymentElement.mount(paymentContainerRef.current!);
      } catch (err: any) {
        if (mounted) {
          setErrorLoading(err.message || "Ocurrió un error al inicializar el pago.");
          setLoading(false);
        }
      }
    }

    initialize();

    return () => {
      mounted = false;
    };
  }, [items]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!stripe || !elements || !checkoutData) return;
    setMessage(null);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/pago/status`,
        
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
      <div className="flex flex-col items-center justify-center w-full h-full">
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
    <div className="flex flex-col md:flex-row w-full justify-between px-8 py-4 pb-0 gap-3">
      <div className="p-6 rounded shadow w-full h-[50%] md:max-w-[500px] border">
        <form id="payment-form" onSubmit={handleSubmit}>
          <div id="link-authentication-element" className="mb-4"></div>
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
        {!checkoutData?.items || checkoutData.items.length === 0 ? (
          <div className="text-gray-500">No hay productos en el carrito.</div>
        ) : (
          <>
            {checkoutData.items.map((item: any) => (
              <div key={item.id} className="mb-2 border rounded px-4 py-2 flex gap-2 items-center">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                <div className="flex-1">
                  <p className="text-gray-700 font-medium">{item.name}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">Cantidad: {item.quantity}</span>
                    <span className="text-gray-700">{formatPrice(item.totalPrice, checkoutData.currency)} {checkoutData.currency}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total</span>
              <span>{formatPrice(checkoutData.amount, checkoutData.currency)} {checkoutData.currency}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
