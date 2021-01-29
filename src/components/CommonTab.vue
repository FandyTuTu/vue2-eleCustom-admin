<template>
  <div class="con-tab">
    <!-- :closable="tag.name !== 'home'" -->
    <el-tag
      :effect="$route.name === tag.name ? 'dark' : 'light'"
      type="info"
      :key="tag.name"
      v-for="(tag, tindex) in tags"
      :closable="true"
      :disable-transitions="false"
      @close="handleClose(tag, tindex)"
      @click="changeMenu(tag)"
      size="small"
    >{{ tag.label }}</el-tag>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button
          size="mini"
          type="info"
        >
          <i class="el-icon-arrow-down "></i>
        </el-button>
        <el-dropdown-menu
          size="mini"
          slot="dropdown"
        >
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations({
      close: "closeTab",
    }),
    // 单个关闭
    handleClose(tag, tindex) {
      console.log("tags", this.tags);
      this.close(tag);
      const item = this.tags[tindex]
        ? this.tags[tindex]
        : this.tags[tindex - 1];
      if (item) {
        this.$router.push(item.path);
        // this.tags.path === this.$route.fullPath && this.$router.push(item.path);
      } else {
        this.$router.push("/");
      }
    },
    changeMenu(item) {
      this.$router.push({ name: item.name });
      // this.$store.commit("selectMenu", item);
      this.$store.commit("selectMenu", item.path);
    },
    // 关闭全部标签
    closeAll() {
      this.$store.commit("closeAll");
      this.$router.push("/");
    },
    // 关闭其他标签
    closeOther() {
      const curItem = this.tags.filter((item) => {
        return item.path === this.$route.fullPath;
      });
      this.$store.commit("closeOther", curItem);
    },
    // 更多-关闭
    handleTags(command) {
      command === "other" ? this.closeOther() : this.closeAll();
    },
  },
};
</script>

<style lang="scss" scoped>
/*滚动条样式*/
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 6px !important;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.con-tab {
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  position: relative;
  height: 40px;
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  // overflow-x: scroll;
}
.el-tag {
  margin-right: 15px;
  cursor: pointer;
}
.tags-close-box {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 60px;
  height: 30px;
  z-index: 10;
}
</style>

<style lang="scss" scoped></style>
