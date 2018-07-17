import Vue from 'nativescript-vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import MmHome from '../components/pages/MmHome';

const router = new VueRouter({
  pageRouting: true,
  routes: [
    {
      path: '/home',
      component: MmHome,
      meta: {
        title: 'MagufoMap Home',
      },
    },
    {path: '*', redirect: '/home'},
  ],
});

router.replace('/home');

module.exports = router;
