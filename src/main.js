import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 全局配置
import "@/assets/scss/reset.scss"; //一定要在eleui之前
import "@/assets/scss/common.scss";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import VueAxios from "vue-axios";
import api from "@/api"; // 导入api接口

import "@/assets/iconfont/iconfont.css";
import tinymce from 'tinymce'
import VueTinymce from '@packy-tang/vue-tinymce'
// import "./mock";

// 第三方包
import ElementUI from "element-ui";
import '../theme/index.css';//自定义elementui
import Cookie from "js-cookie";
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
//导入进度条插件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import echarts from 'echarts'

Vue.use(Viewer);
Viewer.setDefaults({
  Options: {
   "inline": true,
   "button": true, 
   "navbar": true, 
   "title": true, 
   "toolbar": true, 
   "tooltip": true, 
   "movable": true, 
   "zoomable": true, 
   "rotatable": true, 
   "scalable": true, 
   "transition": true, 
   "fullscreen": true, 
   "keyboard": true, 
   "url": "data-source" 
  }
});

Vue.prototype.$tinymce = tinymce // 将全局tinymce对象指向给Vue作用域下
Vue.use(VueTinymce)              // 安装vue的tinymce组件
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.prototype.$api = api; // 将api挂载到vue的原型上

//全局进度条的配置
NProgress.configure({ 
  showSpinner: false,  //右上角圆圈,默认为true
  //使用缓动（CSS缓动字符串）和速度（以毫秒为单位）调整动画设置。（默认：ease和200）
  // easing: 'ease',
  // speed: 2000,
  // minimum: 0,  //更改启动时使用的最小百分比
})

//路由进入前
router.beforeEach((to, from, next) => {
  store.commit("setToken", Cookie.get("token"));
  NProgress.start();
  if (to.meta.requireAuth) {
    if (store.state.token || Cookie.get("token")) {
      next();
    } else {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});
//路由进入后
router.afterEach(() => {  
  NProgress.done()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
