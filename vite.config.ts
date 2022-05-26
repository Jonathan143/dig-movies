import path from 'path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import WindiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'
import px2rpx from './px2rpx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    WindiCSS(),
    AutoImport({
      imports: [
        'vue',
        'uni-app',
        {
          '@/plugins/request': ['request'],
        },
      ],
      dts: './src/auto-imports.d.ts',
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },

  css: {
    postcss: {
      plugins: [px2rpx()],
    },
  },
})
