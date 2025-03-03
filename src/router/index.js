import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import ClientesList from '../components/Clientes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/clientes',
    name: 'clienteslist',
    component: ClientesList
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/PerfilView.vue')
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router