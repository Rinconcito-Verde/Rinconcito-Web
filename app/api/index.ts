import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { router } from './routes';
import { secureHeadersMiddleware } from './middlewares/auth';

const app = new Hono();

  app.use('*', cors({
  origin: '*', 
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'], 
  exposeHeaders: ['Content-Length', 'X-Custom-Header'], 
  credentials: true,
  maxAge: 86400,
}));

app.use('*', secureHeadersMiddleware);

app.route('', router);

export default app;