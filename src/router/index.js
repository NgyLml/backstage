import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Comments from "../components/Comments";
import Articles from "../components/Articles";
import Profile from "../components/Profile";

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
        path: '/profile',
        component: Profile,
        name: '个人信息',
        hidden: true
      },
      {
      path: '/Comments',
      component: Comments,
      name: '评论',
      hidden: true
      },
      {
        path: '/Articles',
        component: Articles,
        name: '文章内容',
        hidden: true
      }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
