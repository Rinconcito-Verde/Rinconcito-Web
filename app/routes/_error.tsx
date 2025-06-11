import { Layout } from '@/components/Layout'
import type { ErrorHandler } from 'hono'

const handler: ErrorHandler = (e, c) => {
  if ('getResponse' in e) {
    return e.getResponse()
  }
  console.error(e.message)
  c.status(500)
  return c.render(

      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
        <h1 className="text-7xl font-bold text-red-400 m-0">500</h1>
        <h2 className="text-2xl font-semibold m-0">¡Vaya! Algo salió mal</h2>
        <p>
          Ha ocurrido un error inesperado.<br />
          Por favor, intenta de nuevo más tarde.
        </p>
        <a
          href="/"
          className="px-8 py-3 bg-red-400 text-white rounded-lg font-bold transition-colors duration-200 hover:bg-red-500"
        >
          Volver al inicio
        </a>
      </div>
  )
}

export default handler
