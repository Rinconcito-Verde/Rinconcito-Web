import { createRoute } from 'honox/factory'
import { Layout } from '@/components/Layout'
import { Card } from '@/components/Card';
import { getProductsCategoryBySlug } from '@/context/ProductsContext';
import { setC } from '@/context/GlobalC';



export default createRoute(async (c) => {
  setC(c)
  const { category } = c.req.param();
 const products = await getProductsCategoryBySlug(category)
  return c.render(
    <Layout>
      <Card products={products}/>
    </Layout>
  );
})
 