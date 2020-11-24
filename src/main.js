import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 全局配置
import "@/assets/scss/reset.scss"; //一定要在eleui之前
import "element-ui/lib/theme-chalk/index.css";
// import http from "@/api/config";
import axios from "axios";
import VueAxios from "vue-axios";
import api from "@/api"; // 导入api接口
// 第三方包

import ElementUI from "element-ui";

Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
// Vue.prototype.$http = http;
Vue.prototype.$api = api; // 将api挂载到vue的原型上

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
