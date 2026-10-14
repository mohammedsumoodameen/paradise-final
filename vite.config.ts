import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

/**
 * Serves the Vercel functions in api/ from the dev server, so the forms save to Sanity locally
 * exactly as they will once deployed. Server-only settings such as SANITY_WRITE_TOKEN are read
 * from .env here; Vite never puts them in the browser bundle.
 */
const devApi = (): Plugin => ({
  name: 'dev-api',
  apply: 'serve',
  configureServer(server) {
    Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ''))
    server.middlewares.use('/api/submit', async (req, res) => {
      const chunks: Buffer[] = []
      for await (const chunk of req) chunks.push(chunk as Buffer)
      const { POST } = await server.ssrLoadModule('/api/submit.ts')
      const response: Response =
        req.method === 'POST'
          ? await POST(new Request('http://localhost/api/submit', { method: 'POST', body: Buffer.concat(chunks) }))
          : new Response(null, { status: 405 })
      res.statusCode = response.status
      response.headers.forEach((value, key) => res.setHeader(key, value))
      res.end(await response.text())
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devApi()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    reportCompressedSize: false,
  },
})
