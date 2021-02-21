<template>
  <el-menu
    :default-active="activeIndex"
    :collapse="isCollapse"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <!-- 没有子节点 -->
    <el-menu-item
      :index="item.path"
      v-for="(item, index) in noChildren"
      :key="'data1' + index"
      @click="chlickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <!-- 有子节点 -->
    <el-submenu
      index="index"
      v-for="item2 in hasChildren"
      :key="item2.label"
      :index="item2.path"
    >
      <!-- :key="'data2' + index2" -->
      <template slot="title">
        <i :class="'el-icon-' + item2.icon"></i>
        <span>{{ item2.label }}</span>
      </template>

      <el-menu-item-group
        v-for="(citem, cindex) in item2.children"
        :key="'data3' + cindex"
      >
        <el-menu-item
          :index="citem.path"
          @click="chlickMenu(citem)"
        >{{
          citem.label
          }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      asideMenu: [
        // {
        //   path: "/",
        //   name: "home",
        //   label: "首页",
        //   icon: "s-home",
        // },
        // {
        //   path: "/article",
        //   name: "article",
        //   label: "文章管理",
        //   icon: "video-play",
        // },
        // {
        //   path: "/video",
        //   name: "video",
        //   label: "视频管理",
        //   icon: "video-play"
        // },
        // {
        //   path: "/user",
        //   name: "user",
        //   label: "用户管理",
        //   icon: "user"
        // },
        // {
        //   label: "其他",
        //   icon: "takeaway-box",
        //   children: [
        //     {
        //       path: "/page1",
        //       name: "page1",
        //       label: "页面1",
        //       icon: "setting"
        //     },
        //     {
        //       path: "/page2",
        //       name: "page2",
        //       label: "页面2",
        //       icon: "setting"
        //     }
        //   ]
        // }
      ],
      activeIndex: "/",
    };
  },
  computed: {
    noChildren() {
      return this.asideMenu.filter((item) => item.children.length === 0);
    },
    hasChildren() {
      return this.asideMenu.filter((item) => item.children.length > 0);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
  // 检测路由变化
  watch: {
    $route(val) {
      this.setCurrentRoute();
      const rlabel = val.meta.label;
      const ricon = val.meta.icon;
      const rpath = val.path;
      let obj = {
        path: rpath,
        name: val.name,
        label: rlabel,
        icon: ricon,
      };
      this.$store.commit("selectMenu", obj);
    },
    // // 监听浏览器直接输入路由(包含跳转)，将此路由添加到tabsList
    // "$route.path": function(val) {
    //   console.log("监听路由", val);
    //   this.$store.commit("selectMenu", val);
    // },
  },
  created() {
    this.getMemu();
    this.setCurrentRoute();
  },
  methods: {
    ...mapActions(["semenu", "setAllMenu"]),
    // 设置当前路由
    setCurrentRoute() {
      this.activeIndex = this.$route.path; // 通过他就可以监听到当前路由状态并激活当前菜单
    },
    getMemu() {
      let that = this;
      that.$api.common
        .getMenu()
        .then((res) => {
          let result = res.data;
          if (result.code === 0) {
            that.asideMenu = result.data;
            // 将所有菜单存储到store
            that.setAllMenu(result.data);
          }
        })
        .catch((err) => {})
        .finally((all) => {});
    },
    chlickMenu(val) {
      // 防止router版本过高重复点击报错
      if (this.$router.history.router.currentRoute.name !== val.name) {
        this.$router.push({ name: val.name });
      }
      // this.semenu(val);
    },
    handleOpen(key, keyPath) {
      console.log("handleOpen", key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log("handleClose", key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
