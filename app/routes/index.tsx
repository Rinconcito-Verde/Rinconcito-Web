import { createRoute } from 'honox/factory'
import { setC } from '@/context/GlobalC'
import { Layout } from '@/components/Layout'
import { Welcome } from '@/components/Welcome'
import { Card } from '@/components/Card'
import { getProducts } from '@/context/ProductsContext'
import { cache } from 'hono/cache'

export default createRoute(cache({
    cacheName: 'rinconcito-verde',
    cacheControl: 'max-age=10800'
  }),
  async (c) => {
  setC(c)
  const products = await getProducts()
  
  return c.render(
    <Layout>
      <Welcome/>
      <Card products={products}/>
    </Layout>
  )
}) 
