import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 全局配置
import "@/assets/scss/reset.scss"; //一定要在eleui之前
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import VueAxios from "vue-axios";
import api from "@/api"; // 导入api接口

import '@/assets/iconfont/iconfont.css';
// import http from "@/api/config";
// import "./mock";

// 第三方包
import ElementUI from "element-ui";
import Cookie from 'js-cookie'
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.prototype.$api = api; // 将api挂载到vue的原型上

router.beforeEach((to,from,next)=>{
  store.commit('setToken',Cookie.get('token'))
  
  if(to.meta.requireAuth){
    if(store.state.token || Cookie.get('token')){
      next()
    }else{
      next({path:'/login'})
    }
  }else{
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
