import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages ではリポジトリ名のパス（https://xiv-y.github.io/claude-quiz/）で公開されるため。
  // 開発サーバーでも同じパスにして、パスの解決漏れに開発中から気づけるようにする。
  base: '/claude-quiz/',
  plugins: [vue(), tailwindcss(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
