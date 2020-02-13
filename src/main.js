import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import Vant from 'vant';
import 'element-ui/lib/theme-chalk/index.css';
import  "./assets/css/global.css"
import './assets/css/base.css'

Vue.use(ElementUI);
import axios from 'axios';
Vue.prototype.$http = axios;


import 'vant/lib/index.css';

Vue.use(Vant);

// 路由请求拦截器 
axios.interceptors.request.use(
  config => {
    // NProgress.start()
     let token = sessionStorage.getItem("token");
      if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
          config.headers.Authorization = 'Bearer '+token;
      }
      return config;
  },
  err => {
      return Promise.reject(err);
  });

// axios.interceptors.request.use(config=>{
//   config.headers.Authorization=window.sessionStorage.getItem('token')
//   return config
// })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
