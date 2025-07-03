import { Layout } from '@/components/Layout'
import { setC } from '@/context/GlobalC'
import type { NotFoundHandler } from 'hono'

const handler: NotFoundHandler = (c) => {
   setC(c)
  c.status(404)
  return c.render(
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
        <h1 className="text-7xl font-bold text-red-400 m-0">404</h1>
        <h2 className="text-2xl font-semibold m-0">¡Ups! Página no encontrada</h2>
        <p>
          La página que buscas no existe o fue movida.<br />
          ¿Quieres volver al inicio?
        </p>
        <a
          href="/"
          className="px-8 py-3 bg-red-400 text-white rounded-lg font-bold transition-colors duration-200 hover:bg-red-500"
        >
          Volver al inicio
        </a>
      </div>
    </Layout>
  )
}

export default handler
