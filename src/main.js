import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import store from './store'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// import {request} from "./network/request";
//
// request({
//   url: '/searchArticle/es'
// }).then(res =>{
//   console.log(res.data);
// }).catch(err => {
//   console.log(err);
// })
