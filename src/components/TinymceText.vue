<template>
  <div>
    <textarea
      :id="id"
      v-model="value"
    ></textarea>
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
    value: String,
  },
  data() {
    return {
      flag: true,
      hasInit: false,
      hasChange: false,
    };
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.setContent(val);
      }
    },
  },
  methods: {
    release() {
      //content 是文本内容
      let content = tinymce.get(this.id).getContent();
      this.$emit("release", content);
    },
    setContent(value) {
      window.tinymce.get(this.id).setContent(value);
    },
    getContent() {
      window.tinymce.get(this.id).getContent();
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.id);
      if (this.fullscreen) {
        tinymce.execCommand("mceFullScreen");
      }

      if (tinymce) {
        tinymce.destroy();
      }
    },
  },
  mounted() {
    var component = this;
    tinymce.init({
      selector: "#" + component.id,
      language: "zh_CN",
      hasChange: false,
      hasInit: false,
      menubar: false,
      height: "600px",
      body_class: "panel-body ",
      object_resizing: false,
      end_container_on_empty_block: true,
      powerpaste_word_import: "clean",
      code_dialog_height: 450,
      code_dialog_width: 1000,
      media_live_embeds: true,
      advlist_bullet_styles: "square",
      advlist_number_styles: "default",
      imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
      default_link_target: "_blank",
      link_title: false,
      relative_urls: false,
      remove_script_host: false,
      table_default_styles: {
        width: "100%",
        borderCollapse: "collapse",
      },
      image_title: false, // 是否开启图片标题设置的选择，这里设置否
      automatic_uploads: true,
      nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
      plugins: [
        //配置插件：可自己随意选择，但如果是上传本地图片image和imagetools是必要的
        "advlist autolink link axupimgs lists charmap print preview hr anchor pagebreak spellchecker ",
        "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
        "save table contextmenu directionality emoticons template paste imagetools textcolor",
      ],
      toolbar: [
        "searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample ",
        "hr bullist numlist link axupimgs charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen fontsizeselect",
      ],
      file_picker_types: "media",
      // lineheight_formats: "8pt 9pt 10pt 11pt 12pt 14pt 16pt 18pt 20pt 22pt 24pt 26pt 36pt",
      file_picker_callback: function(cb, value, meta) {
        //当点击meidia图标上传时,判断meta.filetype == 'media'有必要，因为file_picker_callback是media(媒体)、image(图片)、file(文件)的共同入口
        if (meta.filetype == "media") {
          //创建一个隐藏的type=file的文件选择input
          let input = document.createElement("input");
          input.setAttribute("type", "file");
          input.onchange = function() {
            let file = this.files[0]; //只选取第一个文件。如果要选取全部，后面注意做修改
            let xhr, formData;
            xhr = new XMLHttpRequest();
            xhr.open(
              "POST",
              YiMengYun.BASEURL + "zxymobi-api/api/common/uploadImagePc"
            );
            xhr.withCredentials = self.credentials;
            xhr.upload.onprogress = function(e) {
              // 进度(e.loaded / e.total * 100)
            };
            xhr.onerror = function() {
              //根据自己的需要添加代码
              console.log(xhr.status);
              return;
            };
            xhr.onload = function() {
              let json;
              if (xhr.status < 200 || xhr.status >= 300) {
                console.log("HTTP 错误: " + xhr.status);
                return;
              }
              json = JSON.parse(xhr.responseText);
              console.log(json, "json");
              //假设接口返回JSON数据为{status: 0, msg: "上传成功", data: {location: "/localImgs/1546434503854.mp4"}}
              if (json.header.returnCode == 1) {
                //接口返回的文件保存地址
                let mediaLocation = json.data.url;
                //cb()回调函数，将mediaLocation显示在弹框输入框中
                cb(mediaLocation, { title: json.data.url });
              } else {
                console.log(json.msg);
                return;
              }
            };
            formData = new FormData();
            //假设接口接收参数为file,值为选中的文件
            formData.append("file", file);
            //正式使用将下面被注释的内容恢复
            xhr.send(formData);
          };
          //触发点击
          input.click();
        }
      },
      init_instance_callback: (editor) => {
        if (this.value) {
          editor.setContent(this.value);
        }
        this.hasInit = true;
        editor.on("NodeChange Change KeyUp SetContent", () => {
          this.hasChange = true;
          this.$emit("input", editor.getContent());
        });
      },
      setup: function(editor) {
        editor.on("input undo redo execCommand", function(e) {
          component.flag = false;
          component.$emit("input", editor.getContent());
        });
      },
      images_upload_handler: (blobInfo, success, failure) => {
        var xhr, formData;
        var file = blobInfo.blob(); //转化为易于理解的file对象
        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open(
          "POST",
          YiMengYun.BASEURL + "zxymobi-api/api/common/uploadImagePc"
        ); //第一个参数是请求方式，第二个参数是请求地址，我这里配置的是struts的action，如果是其他（PHP等）的可这样配置：xxx.php

        xhr.onload = function() {
          var json;
          if (xhr.status !== 200) {
            if (xhr.status === 413) {
              failure("上传失败，图片大于3M");
              return;
            }
            failure("HTTP Error: " + xhr.status);
            return;
          }

          json = JSON.parse(xhr.responseText);
          if (!json || typeof json.data.url !== "string") {
            failure("Invalid JSON: " + xhr.responseText);
            return;
          }
          console.log(json.data.url);
          success(json.data.url);
        };

        formData = new FormData();
        formData.append("file", file, file.name);
        xhr.send(formData);
      },
    });
  },
  // mounted() {
  //   //配置的初始化
  //   const that = this;
  //   tinymce.init({
  //     selector: "#" + that.id,
  //     language: "zh_CN",
  //     skin_url: "tinymce/skins/ui/oxide",
  //     height: 500,
  //     hasChange: false,
  //     hasInit: false,
  //     menubar: false,
  //     body_class: "panel-body ",
  //     object_resizing: false,
  //     end_container_on_empty_block: true,
  //     powerpaste_word_import: "clean",
  //     code_dialog_height: 450,
  //     code_dialog_width: 1000,
  //     media_live_embeds: true,
  //     advlist_bullet_styles: "square",
  //     advlist_number_styles: "default",
  //     imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
  //     default_link_target: "_blank",
  //     link_title: false,
  //     relative_urls: false,
  //     remove_script_host: false,
  //     table_default_styles: {
  //       width: "100%",
  //       borderCollapse: "collapse",
  //     },
  //     image_title: false, // 是否开启图片标题设置的选择，这里设置否
  //     automatic_uploads: true,
  //     nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
  //     plugins: [
  //       //配置插件：可自己随意选择，但如果是上传本地图片image和imagetools是必要的
  //       "advlist autolink link axupimgs lists charmap print preview hr anchor pagebreak spellchecker ",
  //       "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
  //       "save table contextmenu directionality emoticons template paste imagetools textcolor",
  //     ],
  //     toolbar: [
  //       "searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample ",
  //       "hr bullist numlist link axupimgs charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen fontsizeselect",
  //     ],
  //     file_picker_types: "media",
  //     //文件上传回调
  //     file_picker_callback: function(cb, value, meta) {
  //       //当点击meidia图标上传时,判断meta.filetype == 'media'有必要，因为file_picker_callback是media(媒体)、image(图片)、file(文件)的共同入口
  //       if (meta.filetype == "media") {
  //         //创建一个隐藏的type=file的文件选择input
  //         let input = document.createElement("input");
  //         input.setAttribute("type", "file");
  //         input.onchange = function() {
  //           let file = this.files[0]; //只选取第一个文件。如果要选取全部，后面注意做修改
  //           let xhr, formData;
  //           xhr = new XMLHttpRequest();
  //           xhr.open(
  //             "POST",
  //             YiMengYun.BASEURL + "zxymobi-api/api/common/uploadImagePc"
  //           );
  //           xhr.withCredentials = self.credentials;
  //           xhr.upload.onprogress = function(e) {
  //             // 进度(e.loaded / e.total * 100)
  //           };
  //           xhr.onerror = function() {
  //             //根据自己的需要添加代码
  //             console.log(xhr.status);
  //             return;
  //           };
  //           xhr.onload = function() {
  //             let json;
  //             if (xhr.status < 200 || xhr.status >= 300) {
  //               console.log("HTTP 错误: " + xhr.status);
  //               return;
  //             }
  //             json = JSON.parse(xhr.responseText);
  //             console.log(json, "json");
  //             //假设接口返回JSON数据为{status: 0, msg: "上传成功", data: {location: "/localImgs/1546434503854.mp4"}}
  //             if (json.header.returnCode == 1) {
  //               //接口返回的文件保存地址
  //               let mediaLocation = json.data.url;
  //               //cb()回调函数，将mediaLocation显示在弹框输入框中
  //               cb(mediaLocation, { title: json.data.url });
  //             } else {
  //               console.log(json.msg);
  //               return;
  //             }
  //           };
  //           formData = new FormData();
  //           //假设接口接收参数为file,值为选中的文件
  //           formData.append("file", file);
  //           //正式使用将下面被注释的内容恢复
  //           xhr.send(formData);
  //         };
  //         //触发点击
  //         input.click();
  //       }
  //     },
  //     init_instance_callback: (editor) => {
  //       if (that.value) {
  //         editor.setContent(that.value);
  //       }
  //       that.hasInit = true;
  //       editor.on("NodeChange Change KeyUp SetContent", () => {
  //         that.hasChange = true;
  //         that.$emit("input", editor.getContent());
  //       });
  //     },
  //     setup: function(editor) {
  //       editor.on("input undo redo execCommand", function(e) {
  //         // that.flag = false;
  //         that.$emit("input", editor.getContent());
  //         // that.release();
  //       });
  //     },
  //     //自定义上传处理
  //     images_upload_handler: function(blobInfo, succFun, failFun) {
  //       var xhr, formData;
  //       var file = blobInfo.blob(); //转化为易于理解的file对象
  //       xhr = new XMLHttpRequest();
  //       xhr.withCredentials = false;
  //       xhr.open("POST", "/demo/upimg2.php");
  //       xhr.onload = function() {
  //         var json;
  //         if (xhr.status != 200) {
  //           failFun("HTTP Error: " + xhr.status);
  //           return;
  //         }
  //         json = JSON.parse(xhr.responseText);
  //         if (!json || typeof json.location != "string") {
  //           failFun("Invalid JSON: " + xhr.responseText);
  //           return;
  //         }
  //         succFun(json.location);
  //       };
  //       formData = new FormData();
  //       formData.append("file", file, file.name);
  //       xhr.send(formData);
  //     },
  //   });
  // },
  beforeDestroy() {
    //销毁
    tinymce.get(this.id).destroy();
  },
};
</script>

