import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastService from 'primevue/toastservice';
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import './main.css'

import 'primeicons/primeicons.css'

import Aura from '@primeuix/themes/aura'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue,{
    theme:{
        preset:Aura
    }
});
app.use(ToastService);
app.mount('#app')
