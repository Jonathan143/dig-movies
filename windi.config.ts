import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  preflight: false,
  prefixer: false, // 小程序不需要加厂商前缀
  extract: {
    // 忽略部分文件夹
    exclude: ['node_modules', '.git', 'dist'],
  },

  corePlugins: {
    // 禁用掉在小程序环境中不可能用到的 plugins
    container: false,
  },
})
