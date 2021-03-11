<template>
  <div>
    <tinymce-text
      id="tinymce"
      @release="release"
    ></tinymce-text>
  </div>
</template>

<script>
import TinymceText from "@/components/TinymceText";

export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    release(content) {
      console.log(content);
    },
  },
  components: {
    "tinymce-text": TinymceText,
  },
};
</script>

