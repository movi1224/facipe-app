import Vue from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies);

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

import './registerServiceWorker'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
