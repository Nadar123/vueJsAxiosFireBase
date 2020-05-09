import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';

import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

axios.defaults.baseURL = 'https://last-e5a7f.firebaseio.com';
// axios.defaults.headers.common['Authorization'] = 'dandan';
axios.defaults.headers.get['Accepts'] = 'application/json';

axios.interceptors.request.use(config => {
  console.log('request', config)
  return config
})

axios.interceptors.response.use(res => {
  console.log(res)
  return res
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
