import VueRouter from 'vue-router';

import BuefyDemo from './components/BuefyDemo.vue';
import IndexPrompt from './components/IndexPrompt.vue';
import CreateDashboard from './components/CreateDashboard.vue';
import Dashboard from './components/Dashboard.vue';

const router = new VueRouter({
  mode: 'hash',
  routes: [{
    name: 'index',
    path: '/',
    component: BuefyDemo,
  }, {
    name: 'load',
    path: '/view',
    component: IndexPrompt,
  }, {
    name: 'create',
    path: '/create',
    component: CreateDashboard,
  }, {
    name: 'view',
    path: '/view/:id',
    component: Dashboard,
  }],
});

export default router;
