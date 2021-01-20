import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login")
  },
  {
    path: "/",
    component: () => import("@/views/Main"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/Home/Home"),
        meta: {
          requireAuth: true //true此页面需登录权限
        }
      },
      {
        path: "/article",
        name: "article",
        component: () => import("@/views/Article/index"),
        meta: {
          requireAuth: true //true此页面需登录权限
        }
      },

      {
        path: "/video",
        name: "video",
        component: () => import("@/views/VideoManage/VideoManage"),
        meta: {
          requireAuth: true //true此页面需登录权限
        }
      },

      {
        path: "/user",
        name: "user",
        component: () => import("@/views/UserManage/UserManage"),
        meta: {
          requireAuth: true //true此页面需登录权限
        }
      },

      {
        path: "/page1",
        name: "page1",
        component: () => import("@/views/Other/PageOne"),
        meta: {
          requireAuth: true //true此页面需登录权限
        }
      },

      {
        path: "/page2",
        name: "page2",
        component: () => import("@/views/Other/PageTwo"),
        meta: {
          requireAuth: true //true此页面需登录权限
        }
      },
      
      {
        path: "/test",
        name: "test",
        component: () => import("@/views/Test")
      },
    ]
  }
];

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
});

export default router;
