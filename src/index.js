/* eslint no-new:0 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueFire from 'vuefire';
import Buefy from 'buefy';
import App from './components/App.vue';
import router from './router';

Vue.use(VueRouter);
Vue.use(VueFire);

Vue.use(Buefy, {
  defaultIconPack: 'fa',
});

new Vue({
  router,
  el: '#app',
  render: h => h(App),
});
