/* eslint no-new:0 import/no-extraneous-dependencies:0 */

import Vue from 'vue';
import Buefy from 'buefy';
import App from './components/App.vue';

Vue.use(Buefy, {
  defaultIconPack: 'fa',
});

new Vue({
  el: '#app',
  render: h => h(App),
});
