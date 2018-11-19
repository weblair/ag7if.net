import Vue from 'vue';
import App from './App.vue';
import router from './router';

import Navbar from '@/components/Navbar.vue';

Vue.config.productionTip = false;

Vue.component('Navbar', Navbar);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
