<template>
  <div>
    <tinymce-text
      id="tinymce"
      v-model="describe"
    >
    </tinymce-text>
    <tinymce-text
      id="tinymce2"
      v-model="describe2"
    ></tinymce-text>
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
      describe2: "",
    };
  },
  methods: {
    release() {
      console.log("保存", this.describe, "****", this.describe2);
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
