import path from 'node:path'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import babel from 'vite-plugin-babel'

export default defineConfig({
  plugins: [
    // @vitejs/plugin-react 和 react-router 都含有 fastRefresh 选项，会导致冲突，所以需要使用 vite-plugin-babel 来处理
    // 参考 https://github.com/remix-run/react-router/issues/12352
    // 另外 这里使用了babel处理 但下文其他插件 也可能使用了babel 因此暂时只做尝鲜 稳定版注释本设置
    babel({
      include: ['./app/**/*'],
      filter: name => name.endsWith('tsx')
    }),
    reactRouter(),
    tailwindcss(),
    tsconfigPaths()
  ],
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
