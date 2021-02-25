<template>
    <div>
        <div class="link_list">
            <div
                class="imgList"
                v-for="(item,index) in addForm.linkList"
                :key="index"
            >
                <img
                    class="imgAdd"
                    :src="item.masterPic"
                    alt=""
                >
                <span class="imgTit">{{item.title}}</span>
                <!-- <p class="recommendTitle" :title="item.title">{{item.title}}</p> -->
                <div class="more">
                    <div>
                        <span
                            class="nPreview"
                            @click="preview_link(item.masterPic)"
                        >
                            <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                            class="nDelete"
                            @click="del_link(index)"
                        >
                            <i class="el-icon-delete"></i>
                        </span>
                    </div>
                </div>
            </div>
            <div
                class="nupimg"
                @click="add_fn"
            >
                <div class="add_shopicon">
                    <i :class="addIcon"></i>
                    <!-- style="margin: 20%;margin: 0;padding-top: 50%;" -->
                    <!-- <span style="margin-top: -30%;">{{addText}}</span> -->
                    <span>{{addText}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    addText: {
      type: String,
      default: "添加内容",
    },
    addIcon: {
      type: String,
      default: "el-icon-plus",
    },
  },
  data() {
    return {
      addForm: {},
    };
  },
  methods: {
    add_fn() {
      this.$emit("send", 1111);
    },
  },
};
</script>

<style lang="scss" scoped>
/* 自定义图片上传 */

.link_list {
  display: flex;
  margin-bottom: 20px;
  display: inline-block;
  cursor: pointer;
}

.imgList {
  width: 148px;
  text-align: center;
  margin-right: 10px;
  position: relative;
  display: inline-block;
  &:hover .more {
    opacity: 1;
  }
  .more {
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    width: 100%;
    height: 148px;
    color: #fff;
    font-size: 20px;
    line-height: 148px;
    opacity: 0;
    .nPreview {
      margin-right: 10px;
      cursor: pointer;
    }
    .nDelete {
      cursor: pointer;
    }
  }
  .imgAdd {
    width: 100%;
    height: 148px;
  }
  img {
    border-radius: 6px;
    overflow: hidden;
  }
  .imgTit {
    line-height: 20px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
}
.nupimg {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  line-height: 146px;
  vertical-align: top;
  text-align: center;
  display: inline-block;
  .add_shopicon {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    overflow: hidden;
    span {
      line-height: 1;
      margin-top: 10px;
    }
  }
}
</style>