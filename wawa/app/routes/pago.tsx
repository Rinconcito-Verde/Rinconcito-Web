import { createRoute } from 'honox/factory'
import { Layout } from '@/components/Layout'
import BackButton from '@/islands/backButton';
import { setC } from '@/context/GlobalC';
import Checkout from '@/islands/checkout';
import { stripePublicKey } from '@/context/CheckoutContext';


export default createRoute(async(c) => {
  setC(c)
  const publicKey = await stripePublicKey()
  return c.render(
    <Layout>
      <Checkout stripePublicKey={publicKey}/>
    </Layout>
  );
})
