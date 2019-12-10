import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'
// import { request } from './network/request'
Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
Vue.use(toast)

//解决移动端300毫秒延迟
FastClick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
 render: h => h(App),
  router,
  store
}).$mount('#app')


// request({
//   url: '/api/v1/home/data',
//   params:{
//     type: 'sell',
//     page: 6
//    }
// }).then(res =>{
//   console.log(res)
// }).catch(err =>{
//   console.log(err)
// })


// axios({
//   url:'http://123.207.32.32:8000/home/multidata'
// }).then(res => {
//   console.log(res)
// })


// axios.defaults.baseURL = 'http://123.207.32.32:8000'
// axios.defaults.timeout = 5000

// axios.all([axios({
//   url: '/home/multidata',
//   // timeout: 5000,
// }),axios({
//   url: 'http://106.54.54.237:8000/api/v1/home/data',
//   params:{
//     type: 'sell',
//     page: 6
//   },
//   // timeout: 5000,
// })]).then(axios.spread((res1,res2)=>{
//   console.log(res1)
//   console.log(res2)
// }))

