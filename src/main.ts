import { createSSRApp } from 'vue'
import App from './App.vue'
import store from '@/store'

import '@/style/base.css'
import '@/style/semantic.scss'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app,
  }
}
