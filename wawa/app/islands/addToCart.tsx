import { useState } from 'hono/jsx';

export default function AddToCart({ id }: { id: string }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <div class="mt-6">
        <p class="mb-2 font-bold">Cantidad:</p>
      </div>

      <div class="mt-4">
        <div class="flex items-center gap-4">
          <button onClick={() => { if (quantity > 1) setQuantity(quantity - 1) }} class="px-3 py-1 border">-</button>
          <span class="w-6 text-center">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} class="px-3 py-1 border">+</button>
        </div>
      </div>

      <a
        href={`/carrito?add=${id}&quantity=${quantity}`}
        class="w-full bg-black text-white py-3 mt-6 text-lg rounded text-center block transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
        role="button"
        tabIndex={0}
        aria-label="Añadir al carrito"
      >
        Añadir al carrito
      </a>
    </div>
  );
}