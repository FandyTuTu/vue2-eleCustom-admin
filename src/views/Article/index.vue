<template>
  <div>
    <tinymce-text
      id="tinymce"
      v-model="describe"
    >
    </tinymce-text>
    <el-button
      @click="release"
      class="mt10"
    >保存</el-button>
  </div>
</template>

<script>
import TinymceText from "@/components/TinymceText";

export default {
  name: "",
  data() {
    return {
      describe: "",
    };
  },
  methods: {
    release() {
      console.log("保存", this.describe);
    },
  },
  components: {
    "tinymce-text": TinymceText,
  },
};
</script>

<style lang="scss" scoped>
.mt10 {
  margin-top: 10px;
}
</style>
