import { cartProduct } from '@/types/types';
import { formatPrice } from '@/utils/prices';
import { useState, useEffect } from 'hono/jsx';


export function CartProducts({ addProduct }: any) {
  const [items, setItems] = useState<{ id: number; quantity: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorLoading, setErrorLoading] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<cartProduct[]>([]);
  const [currency, setCurrency] = useState('USD')

  useEffect(() => {
    const stored = localStorage.getItem('cartItems');
    if (!stored) {
      localStorage.setItem('cartItems', JSON.stringify([]));
    } else {
      setItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (addProduct?.add) {
      const productId = Number(addProduct.add);
      const productQuantity = Number(addProduct.quantity) || 1;

      setItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === productId);
        if (existingItem) {
          return prevItems.map(item =>
            item.id === productId
              ? { ...item, quantity: item.quantity + productQuantity }
              : item
          );
        } else {
          return [...prevItems, { id: productId, quantity: productQuantity }];
        }
      });

      const url = new URL(window.location.href);
      url.searchParams.delete('add');
      url.searchParams.delete('quantity');
      history.replaceState(null, '', url.toString());
    }
  }, [addProduct]);

  // Actualizar localStorage y productos
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));

    const fetchProducts = async () => {
      if (items.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const ids = items.map(p => p.id);
        let products = await getProducts(ids);

        products = products.map(item => ({
          ...item,
          quantity: items.find(i => i.id === item.id)?.quantity ?? 1
        }));
        setLoading(false);
        setCartItems(products);
        setCurrency(products[0].currency)
      } catch (error) {
        setErrorLoading('Ocurrió un error al cargar el carrito. Inténtalo de nuevo.');
        console.error('Error al cargar productos del carrito', error);
      }
    };

    fetchProducts();
  }, [items]);

  const getProducts = async (ids: number[]) => {
    const response = await fetch(`/api/products/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ids)
    });
    if (!response.ok) {
      console.error('Error al obtener los productos');
      return [];
    }
    const data = await response.json();
    return data as cartProduct[];
  };

  const updateQuantity = (id: number, delta: number) => {
    setItems(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
    );
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  if (items.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <p className="text-lg mb-8">Tu carrito está vacío.</p>
        <a
          href="/"
          className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          role="button"
        >
          Volver a la tienda
        </a>
      </div>
    );
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
    <div className="flex flex-col md:flex-row w-full min-h-[80dvh] justify-between md:px-8 py-4 pb-0 gap-3">
      <div className="flex flex-col w-full">
        <div className="w-full text-left mb-8 space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex flex-row justify-between items-center shadow-md rounded p-4 border gap-4 transition-transform">
              <div className="flex items-center gap-6 w-full md:w-auto">
                <img
                  className="w-[90px] h-[100%] object-cover"
                  src={item.image}
                  alt={`Imagen de ${item.name}`}
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm">Precio unitario: {formatPrice(item.price, currency)} {currency}</p>
                  <p className="text-sm">Cantidad: {item.quantity}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex flex-col justify-between items-center gap-0">
                  <p>{formatPrice((item.price * item.quantity), currency)} {currency}</p>
                </div>
                <div className="flex flex-row gap-1">
                  <button
                    className="flex items-center justify-center w-8 h-7 px-2 py-1 text-red-500 font-bold rounded border border-red-500 hover:bg-red-500 hover:text-white transition"
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <button
                    className="flex items-center justify-center w-8 h-7 px-2 py-1 text-green-500 font-bold rounded border border-green-600 hover:bg-green-600 hover:text-white transition"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  onClick={() => removeItem(item.id)}
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full lg:w-[350px] border rounded p-6 space-y-4 h-[1%]">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{formatPrice(total, currency)} {currency}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Envío</span>
          <span>Gratis</span>
        </div>
        <div className="flex justify-between text-lg font-bold border-t pt-2">
          <span>Total</span>
          <span>{formatPrice(total, currency)} {currency}</span>
        </div>
        <a
          href="/pago"
          className="inline-block w-full py-2 rounded bg-green-600 hover:bg-green-700 text-white transition text-lg text-center cursor-pointer"
          role="button"
        >
          Proceder al pago
        </a>
      </div>
    </div>
  );
}
