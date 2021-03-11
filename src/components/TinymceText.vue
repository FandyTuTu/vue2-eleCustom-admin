<template>
  <div>
    <textarea :id="id"></textarea>
    <!-- <button
            class="btn"
            @click="release"
        >发布文章</button> -->
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
//这下面是tinymce的插件
import "tinymce/themes/silver/theme";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
//这里写你自己存放语言包的路径
import "../../public/tinymce/langs/zh_CN.js";
export default {
  name: "",
  props: {
    id: String,
  },
  data() {
    return {
      init: {
        selector: "#" + this.id,
        language: "zh_CN",
        skin_url: "tinymce/skins/ui/oxide",
        height: 500,
        //插件
        plugins:
          "link lists image code table colorpicker textcolor wordcount contextmenu",
        //工具栏
        toolbar:
          "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat",
        //隐藏tinymce的标识
        branding: true,
        images_upload_url: "/demo/upimg.php",
        images_upload_base_path: "/demo",
      },
    };
  },
  methods: {
    release() {
      //content 是文本内容
      let content = tinymce.get(this.id).getContent();
      this.$emit("release", content);
    },
  },
  mounted() {
    //配置的初始化
    tinymce.init(this.init);
  },
  beforeDestroy() {
    //销毁
    tinymce.get(this.id).destroy();
  },
};
</script>

