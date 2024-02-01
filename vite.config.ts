import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// 这个插件用于处理style中的各种长度单位转换为vw，保持各分辨率下样式保持一致
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin' 
// 这个插件用于处理template中的px转换为vw，但原包里有错误，采用离线版修正源码。
// https://github.com/uyaer/vite-plugin-vue-style-px-to-viewport
import stylepxtoviewport from './vite-plugin-vue-style-px-to-viewport.js' 

const px2vwConfig = {
  unitToConvert: 'px',
  viewportWidth: 1920,
  unitPrecision: 4,
  propList: ['*'],
  viewportUnit: 'vw',
  fontViewportUnit: 'vw',
  selectorBlackList: [],
  minPixelValue: 1,
  mediaQuery: false,
  replace: true,
  exclude: [/node_modules/],
  // landscape: false,
  // landscapeUnit: 'vw',
  // landscapeWidth: 568
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    stylepxtoviewport(px2vwConfig),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 生产环境时移除console
        drop_debugger: true, // 生产环境时移除debugger
      },
    },
  },
  css: {
    postcss: {
      plugins: [
        postcsspxtoviewport8plugin(px2vwConfig),
      ],
    },
  },
  base:'',
  server: {
    cors: true, // 默认启用并允许任何源
    open: true, //自动打开
    proxy: {
      // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      // 正则表达式写法
      '^/Api': {
        target: 'http://www.example.com/', // 后端服务实际地址
        changeOrigin: true, //开启代理
      },
    },
  },
})
