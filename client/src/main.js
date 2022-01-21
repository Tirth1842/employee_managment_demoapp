import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

Vue.config.productionTip = false
import Login from './components/Login.vue';
import Dashboard from './components/Dashboard.vue';
import Add from './components/Add.vue'
import Edit from './components/Edit.vue'

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/',name:'login', component: Login },
    { path: '/dashboard',name:'dashboard', component: Dashboard },
    { path: '/dashboard/add', name:'add', component: Add},
    { path: '/dashboard/edit/:id', name:'edit', component: Edit}
  ]
});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
