import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Alerts from './views/Alerts.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: true,
    },
    {
      path: '/alerts',
      name: 'alerts',
      component: Alerts,
      props: true,
    },
  ],
});
