<template>
  <div class="con-tab">
    <el-tag
      :effect="$route.name === tag.name ? 'dark' : 'light'"
      type="info"
      :key="tag.name"
      v-for="tag in tags"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @close="handleClose(tag)"
      @click="changeMenu(tag)"
      size="small"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations({
      close: "closeTab"
    }),
    handleClose(tag) {
      this.close(tag);
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    changeMenu(item) {
      this.$router.push({ name: item.name });
      this.$store.commit("selectMenu", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.con-tab {
  padding: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}
.el-tag {
  margin-right: 15px;
  cursor: pointer;
}
</style>

<style lang="scss" scoped></style>
