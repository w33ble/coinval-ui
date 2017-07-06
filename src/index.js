/* eslint no-new:0 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Buefy from 'buefy';
import App from './components/App.vue';
import router from './router';
import createStore from './store';

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.use(Buefy, {
  defaultIconPack: 'fa',
});

new Vue({
  router,
  store: createStore(),
  el: '#app',
  render: h => h(App),
});
