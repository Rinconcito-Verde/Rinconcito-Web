import { Hono } from 'hono'
import { showRoutes } from 'hono/dev'
import { createApp } from 'honox/server'
import Server from './api/index'
const app = new Hono()
const honoxApp = createApp()

app.route('/api', Server)
app.route('/', honoxApp)

showRoutes(app)

export default app
