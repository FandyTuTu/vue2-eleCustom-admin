<template>
  <header>
    <div class="l-con">
      <el-button
        icon="el-icon-menu"
        size="mini"
        @click="changeMenu"
      ></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{
          current.label
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-con">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img class="user-icon" :src="userIcon" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人资料</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <img src="../assets/logo.png" alt="" /> -->
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      userIcon: require("../assets/logo.png")
    };
  },
  computed: {
    ...mapState({
      current: state => state.tab.currentMenu,
      changeCollapse: state => state.tab.isCollapse
    })
  },
  methods: {
    changeMenu() {
      this.$store.commit("changeCollapse");
    }
  }
};
</script>

<style lang="scss" scoped>
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
}
.user-icon {
  width: 50px;
  height: 50px;
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
