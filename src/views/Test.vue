<template>
  <div>
    <!-- <uploadImg
      addText="图片上传"
      addIcon="el-icon-upload2"
      @send="gotest"
    ></uploadImg> -->
    <Histogram ref="necharts"></Histogram>
  </div>
</template>

<script>
import uploadImg from "@/components/uploadImg";
import Histogram from "@/components/Histogram";
export default {
  components: {
    uploadImg,
    Histogram,
  },
  data() {
    return {
      //以下是组件所需要的三个参数
      Histogram: {
        radius: "25%",
        pieDataName: [
          "直接访问",
          "邮件营销",
          "联盟广告",
          "视频广告",
          "搜索引擎",
        ],
        pieData: [
          { value: 335, name: "直接访问" },
          { value: 310, name: "邮件营销" },
          { value: 234, name: "联盟广告" },
          { value: 135, name: "视频广告" },
          { value: 1548, name: "搜索引擎" },
        ],
      },
    };
  },
  mounted() {
    //把你所需要数据赋值给data中的Histogram对象，过程省略，然后获取对象中的三个键值
    var { radius, pieDataName, pieData } = this.Histogram;
    //数据渲染饼状图
    this.$refs.necharts.initChart(radius, pieDataName, pieData);
  },
  methods: {
    gotest(e) {
      console.log("子方法", e);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>