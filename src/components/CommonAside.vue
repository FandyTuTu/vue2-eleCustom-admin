<template>
  <el-menu
    :collapse="isCollapse"
    default-active="2"
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
      v-for="(item2, index2) in hasChildren"
      :key="'data2' + index2"
    >
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
    };
  },
  computed: {
    noChildren() {
      return this.asideMenu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.asideMenu.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
  created() {
    this.getMemu();
  },
  methods: {
    ...mapActions(["semenu"]),
    getMemu() {
      let that = this;
      that.$api.article
        .getMenu()
        .then((res) => {
          let result = res.data;
          if (result.code === 0) {
            that.asideMenu = result.data;
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
      this.semenu(val);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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
