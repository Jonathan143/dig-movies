import { createSSRApp } from 'vue'
import App from './App.vue'
import store from '@/store'

import '@/style/iconfont.css'
import '@/style/base.css'
import '@/style/semantic.scss'
import 'virtual:windi.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app,
  }
}
