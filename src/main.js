import Vue from 'vue';
import App from './App.vue';
import router from './router';

import Navbar from '@/components/Navbar.vue';

// eslint-disable-next-line no-unused-vars
const VERSION = '1.0.1';

Vue.config.productionTip = false;

Vue.component('Navbar', Navbar);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
