import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: './',
  resolve: {
    alias: [{ find: '~', replacement: '/src' }]
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: (chunk) => {
          // Nếu là entry chính thì đặt là index.js, còn lại thêm hash
          return chunk.name === 'index'
            ? 'assets/index.js'
            : 'assets/[name]-[hash].js'
        },
        chunkFileNames: 'assets/[name]-[hash].js', // Chunk phụ
        assetFileNames: 'assets/[name]-[hash].[ext]' // Các tài nguyên khác
      }
    }
  }
})
