import VueRouter from 'vue-router';
import Dashboard from '../../view/Dashboard.vue'
import Login from '../components/Login.vue'
const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
    routes // short for `routes: routes`
  })

export default router
