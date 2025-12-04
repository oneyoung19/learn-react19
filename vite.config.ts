import path from 'node:path'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app')
    },
    conditions: ['module', 'import', 'default']
  },
  // [The requested module 'react-use' is a CommonJS module, which may not support all module.exports as named exports.](https://github.com/streamich/react-use/issues/2353#issuecomment-2044683620)
  ssr: {
    noExternal: ['react-use', 'ahooks']
  },
  optimizeDeps: {
    include: ['react-use']
  }
})
