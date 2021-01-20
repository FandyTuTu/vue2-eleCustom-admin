<template>
  <header>
    <div class="l-con">
      <!-- :icon="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" -->
      <!-- <el-button
        icon="el-icon-menu"
        size="mini"
        @click="changeMenu"
      ></el-button> -->
      <i
        class="icon iconfont  mr5"
        :class="isCollapse ? 'iconzhankai' : 'iconshousuo'"
        @click="changeMenu"
      ></i>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="current.path"
          v-if="current && current.label"
        >{{ current.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-con">
      <el-dropdown
        trigger="click"
        @command="changeCommand"
      >
        <span class="el-dropdown-link">
          <img
            class="user-icon"
            :src="userIcon"
            alt=""
          />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="uinfo">个人资料</el-dropdown-item>
          <el-dropdown-item command="out">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <img src="../assets/logo.png" alt="" /> -->
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
import Cookie from "js-cookie";
export default {
  data() {
    return {
      userIcon: require("../assets/avatar.jpg"),
      userInfo: {},
    };
  },
  created() {},
  computed: {
    ...mapState({
      current: (state) => state.tab.currentMenu,
      changeCollapse: (state) => state.tab.isCollapse,
    }),
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
  methods: {
    changeMenu() {
      this.$store.commit("changeCollapse");
    },
    changeCommand(e) {
      let that = this;
      if (e === "out") {
        that.$router.push({
          path: "/login",
        });
        Cookie.set("token", "");
        that.$store.commit("setToken", "");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.iconfont {
  font-size: 22px;
  color: #eee;
}
header {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
}
.l-con {
  display: flex;
  align-items: center;
}
.r-con {
  cursor: pointer;
}
.user-icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
.el-dropdown-menu el-popper {
  text-align: center;
}
</style>

<style lang="scss">
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  color: #ccc;
  font-weight: 400;
}
.el-breadcrumb {
  margin-left: 20px;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  color: #fff;
}
</style>
