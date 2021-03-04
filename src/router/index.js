import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login")
  },
  {
    path: "/",
    component: () => import("@/views/main"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/home/home"),
        meta: {
          label: '首页',
          icon:'s-home',
          requireAuth: true //true此页面需登录权限
        }
      },
      {
        path: "/article",
        name: "article",
        component: () => import("@/views/article/index"),
        meta: {
          label: '文章管理',
          icon:'video-play',
          requireAuth: true //true此页面需登录权限
        }
      },
      {
        path: "/userInfo",
        name: "userInfo",
        component: () => import("@/views/userInfo"),
        meta: {
          label: '个人资料',
          icon:'video-play',
          requireAuth: true //true此页面需登录权限
        }
      },

      {
        path: "/video",
        name: "video",
        component: () => import("@/views/videoManage/videoManage"),
        meta: {
          label: '视频管理',
          icon:'video-play',
          requireAuth: true //true此页面需登录权限
        }
      },
      {
        path: "/page1",
        name: "page1",
        component: () => import("@/views/other/pageOne"),
        meta: {
          label: '页面1',
          icon:'video-play',
          requireAuth: true //true此页面需登录权限
        }
      },

      {
        path: "/page2",
        name: "page2",
        component: () => import("@/views/other/pageTwo"),
        meta: {
          label: '页面2',
          icon:'video-play',
          requireAuth: true //true此页面需登录权限
        }
      },
      
      {
        path: "/echarts",
        name: "echarts",
        component: () => import("@/views/echarts"),
        meta: {
          label: 'echarts',
          icon:'video-play',
          requireAuth: true //true此页面需登录权限
        }
      },
      {
        path: "/table",
        name: "table",
        component: () => import("@/views/table/table"),
        meta: {
          label: '表格',
          icon:'video-play',
          requireAuth: true //true此页面需登录权限
        }
      },
      {
        path: "/table",
        name: "table",
        hidden: true,
        component: () => import("@/views/table/table"),
        meta: {
          label: '基础表格',
          icon:'video-play',
          requireAuth: true //true此页面需登录权限
        }
      },
      {
        path: "/tableCustom",
        name: "tableCustom",
        hidden: true,
        component: () => import("@/views/table/tableCustom"),
        meta: {
          label: '自定义表格',
          icon:'video-play',
          requireAuth: true //true此页面需登录权限
        }
      },
      {
        path: "/tableTree",
        name: "tableTree",
        hidden: true,
        component: () => import("@/views/table/tableTree"),
        meta: {
          label: '树形表格',
          icon:'video-play',
          requireAuth: true //true此页面需登录权限
        }
      },
      {
        path: "/exportTable",
        name: "exportTable",
        hidden: true,
        component: () => import("@/views/table/exportTable"),
        meta: {
          label: '导出表格',
          icon:'video-play',
          requireAuth: true //true此页面需登录权限
        }
      },
      {
        path: "/tableDetail",
        name: "tableDetail",
        hidden: true,
        component: () => import("@/views/table/tableDetail"),
        meta: {
          label: '表格详情',
          icon:'video-play',
          requireAuth: true //true此页面需登录权限
        }
      },
      {
        path: "/tab",
        name: "tab",
        component: () => import("@/views/tab/tab"),
        meta: {
          label: 'tab',
          icon:'video-play',
          requireAuth: true //true此页面需登录权限
        }
      },
      {
        path: "/icon",
        name: "icon",
        component: () => import("@/views/icon/icon"),
        meta: {
          label: 'icon',
          icon:'video-play',
          requireAuth: true //true此页面需登录权限
        }
      },
      {
        path: "/transfer",
        name: "transfer",
        component: () => import("@/views/transfer/transfer"),
        meta: {
          label: '穿梭框',
          icon:'video-play',
          requireAuth: true //true此页面需登录权限
        }
      },
      {
        path: "/form",
        name: "form",
        component: () => import("@/views/form/form"),
        meta: {
          label: 'form表单',
          icon:'video-play',
          requireAuth: true //true此页面需登录权限
        }
      },
      
      {
        path: "/upload",
        name: "upload",
        component: () => import("@/views/upload/upload"),
        meta: {
          label: '上传',
          icon:'video-play',
          requireAuth: true //true此页面需登录权限
        }
      },
     
    ]
  }
];

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
});

export default router;
