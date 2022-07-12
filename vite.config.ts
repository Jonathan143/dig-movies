import path from 'path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import WindiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'
import MiniProgramTailwind from '@dcasia/mini-program-tailwind-webpack-plugin/rollup'

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
          '@/plugins/request': ['request', 'requestMovieDB'],
          '@/hooks': ['useRouter', 'useLoading'],
          '@/store/modules': ['useUserStore', 'useMovieStore'],
        },
      ],
      dts: './src/auto-imports.d.ts',
    }),

    MiniProgramTailwind(),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
})
