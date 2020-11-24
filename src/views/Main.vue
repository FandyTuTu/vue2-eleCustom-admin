<template>
  <el-container style="height:100%;">
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
        <common-header></common-header>
      </el-header>

      <common-tab></common-tab>
      <el-main>
        <router-view />
      </el-main>
      <!-- <el-footer style="height:40px">xxx</el-footer> -->
    </el-container>
  </el-container>
</template>

<script>
import CommonHeader from "@/components/CommonHeader";
import CommonAside from "@/components/CommonAside";
import CommonTab from "@/components/CommonTab";
export default {
  components: {
    CommonHeader,
    CommonAside,
    CommonTab
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #333333;
}
.el-menu {
  border: 0;
}

.el-footer {
  background-color: #333333;
  color: #fff;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
</style>
