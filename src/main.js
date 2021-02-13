import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from 'bootstrap-vue'
import './scss/app.scss';
import VueRouter from 'vue-router'
import { routes } from './routes';
import InputColorPicker from "vue-native-color-picker";

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)
Vue.use(InputColorPicker);
Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  base: process.env.NODE_ENV === 'production'
    ? '/agendajob/'
    : '/',
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
