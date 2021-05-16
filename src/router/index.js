import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Container from "../components/Container";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Container',
    name: 'Container',
    component: Container
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
