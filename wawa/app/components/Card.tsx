import { formatPrice, priceDiscount } from "@/utils/prices";

export function Card({products}: { products: [] }) {

  if (!products || products.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <p className="text-center text-gray-500">No hay productos disponibles</p>
      </div> 
    );
  }
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 m">
        {products.map((product:any) => { 
          const { id, name, price, image, slug, category_slug, short_description, discount, currency } = product;
          const oldPrice = priceDiscount(price, discount);
          return (
            <div
              key={id}
              className="rounded-lg border border-[#f6e5bf] overflow-hidden transition-all hover:shadow-md bg-[#f4e6c057] flex flex-col h-full justify-between"
              onclick={`window.location.href = "/${category_slug}/${slug}"`}
            >
              <div>
                <div className="relative h-50 w-full">
                  <img
                    src={image}
                    alt={name}
                    className="object-cover w-full h-full"
                  />
                 {discount > 0 && <div
                    className="absolute bottom-2 left-2 rounded-full bg-[#b1bb58] px-3 py-1 text-xs font-medium text-white"
                  >
                    {discount}% OFF
                  </div>}
                </div>
                <div className="bg-[#f4e6c086] p-4 pb-2">
                  <p className="text-sm font-bold h-full">
                    {short_description}
                  </p>
                </div>
              </div>
              <div>
                <div className="p-4 pt-6">
                  <div className="flex items-center gap-1">
                    {oldPrice && (
                      <p className="text-sm text-[#4a6d0a] line-through">{formatPrice(oldPrice, currency)}</p>
                    )}
                    <p className="text-1xl font-bold text-[#415f09]">{formatPrice(price, currency)} {currency}</p>
                  </div>
                </div>
                <div className="p-4 pt-0 flex gap-2">
                <a
                    href={`/${category_slug}/${slug}`}
                    className="flex-1 border border-[#00000063] text-black hover:bg-[#dbdd7862] px-4 py-2 rounded-md font-medium text-sm transition-colors hidden sm:block text-center"
                  >
                    Ver detalles
                  </a>
                   <a
                    href={`/carrito?add=${id}`}
                    className="flex-1 bg-[#71af0c] text-white hover:bg-[#48af0cab] px-4 py-2 rounded-md font-medium text-sm transition-colors sm:block text-center"
                  >
                    Comprar
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}