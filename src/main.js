import { createApp } from 'vue'
import './style.css'
import router from './router'
import { plugin } from '@formkit/vue'
import formkitConfig from './formkit.config.js'
import App from './App.vue'

createApp(App).use(router).use(plugin, formkitConfig).mount('#app')
