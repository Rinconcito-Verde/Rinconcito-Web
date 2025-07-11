import { createRoute } from 'honox/factory'
import { Layout } from '@/components/Layout'
import { Card } from '@/components/Card';
import { getProductsCategoryBySlug } from '@/context/ProductsContext';
import { setC } from '@/context/GlobalC';
import { cache } from 'hono/cache';



export default createRoute(cache({
    cacheName: 'rinconcito-verde',
    cacheControl: 'max-age=10800'
  }),
  async (c) => {
  setC(c)
  const { category } = c.req.param();
 const products = await getProductsCategoryBySlug(category)
  return c.render(
    <Layout>
      <Card products={products}/>
    </Layout>
  );
})
 