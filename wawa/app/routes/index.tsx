import { createRoute } from 'honox/factory'
import { setC } from '@/context/GlobalC'
import { Layout } from '@/components/Layout'
import { Welcome } from '@/components/Welcome'
import { Card } from '@/components/Card'
import { getProducts } from '@/context/ProductsContext'

export default createRoute(async (c) => {
  setC(c)
  const products = await getProducts()
  
  return c.render(
    <Layout>
      <Welcome/>
      <Card products={products}/>
    </Layout>
  )
}) 
