import { createRoute } from 'honox/factory'
import { Layout } from '@/components/Layout'
import BackButton from '@/islands/backButton';
import { setC } from '@/context/GlobalC';
import { CartProducts } from '@/islands/cartProducts';



export default createRoute((c) => {
  const query = c.req.query();
   setC(c)
  return c.render(
    <Layout>
      <div>
        <BackButton />
        <h2 className="text-2xl font-bold  md:ml-7.5">Carrito de compras</h2>
      </div>
     <CartProducts addProduct={query} />
    </Layout>
  );
})
