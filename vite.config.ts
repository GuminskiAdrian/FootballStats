import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const token = env.FOOTBALL_DATA_TOKEN

  if (!token) {
    throw new Error(
      'Brak FOOTBALL_DATA_TOKEN. Uzupełnij plik .env (wzór: .env.example).',
    )
  }

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'https://api.football-data.org',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, '/v4'),
          headers: { 'X-Auth-Token': token },
        },
      },
    },
  }
})