import Vue from 'vue';
import VueRouter from 'vue-router';
import VueFire from 'vuefire';
import Buefy from 'buefy';
import firebaseValue from './lib/firebase_value';
import App from './components/App.vue';
import router from './router';

Vue.use(VueRouter);
Vue.use(VueFire);
Vue.use(firebaseValue);

Vue.use(Buefy, {
  defaultIconPack: 'fa',
});

export default new Vue({
  router,
  el: '#app',
  render: h => h(App),
});
