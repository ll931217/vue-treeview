import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/vue-treeview.js'),
      name: '@ll931217/vue-treeview',
      filename: (format) => `vue-treeview.${format}.js`
    },
    rollupOptions: {
      external: [
        'vue',
        'vue-router',
        'pug',
        'sass',
      ],
      output: {
        globals: {
          vue: 'vue',
        },
      },
    },
  },
  plugins: [vue()],
})
