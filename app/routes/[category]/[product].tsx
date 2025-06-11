import { createRoute } from 'honox/factory'
import { Layout } from '@/components/Layout'
import { ChevronLeft } from 'lucide-static';
import { Icon } from '@/components/Icon';
import BackButton from '@/islands/backButton';
import { getProductBySlug } from '@/context/ProductsContext';
import { setC } from '@/context/GlobalC';
import AddToCart from '@/islands/addToCart';
import { formatPrice, priceDiscount } from '@/utils/prices';


export default createRoute(async (c) => {
  setC(c)
  const params = c.req.param();
  const { id, image, name, price, short_description, description, discount, currency } = await getProductBySlug(params.product);
  const oldPrice = priceDiscount(price, discount);

  return c.render(
    <Layout>
      <BackButton />
      <div class="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-8">

        <div class="flex-1">
          <img src={image} alt={name} class="w-full h-full max-h-96 flex items-center justify-center object-contain mb-4" />
        </div>

        <div class="flex-[1.2]">
          <h2 class="text-2xl font-bold">{name}</h2>
          <div class="text-green-600 text-xl font-semibold"><span class="line-through text-gray-500 text-base">{oldPrice &&formatPrice(oldPrice, currency)} </span>{formatPrice(price, currency)} {currency}</div>
          <div class="mt-4 space-x-4 text-green-600 text-sm">
            <span>✅ Envío gratis</span>
          </div>
          <AddToCart id={id} />
        </div>
      </div>
      <div class="max-w-7xl mx-auto p-4 mt-10 ">
        <h3 class="text-xl font-bold mb-4">Descripción del producto</h3>
         <div dangerouslySetInnerHTML={{ __html: description }}></div>
      </div>
    </Layout>
  );
})
