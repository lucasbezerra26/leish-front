import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

import PrimeVue from 'primevue/config'

import Ripple from 'primevue/ripple'
import StyleClass from 'primevue/styleclass'
import Dropdown from 'primevue/dropdown'
import App from './App.vue'
import {
  MegaMenu,
  Avatar,
  Button,
  Drawer,
  Card,
  Textarea,
  Checkbox,
  Menu,
} from 'primevue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.component('Drawer', Drawer)
app.component('Button', Button)
app.component('Avatar', Avatar)
app.component('MegaMenu', MegaMenu)
app.component('Card', Card)
app.component('Textarea', Textarea)
app.component('Checkbox', Checkbox)
app.component('Menu', Menu)
app.component('Dropdown', Dropdown)

app.config.globalProperties.appName = 'Leish App'

// Registro das diretivas
app.directive('ripple', Ripple)
app.directive('styleclass', StyleClass)

app.mount('#app')
