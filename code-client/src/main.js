import { createApp } from 'vue'

import serviceContainer from './services/service-container';

import App from './App.vue'
import AppRouter from './router/router'

const app = createApp(App)
app.use(AppRouter)
app.provide('$services', serviceContainer )
app.mount('#app')
