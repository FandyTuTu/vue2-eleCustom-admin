<template>
    <div
        :ref="className"
        id="main"
        :style="{width: width, height: height}"
        style="width:500px; height:400px"
    ></div>
</template>

<script>
// import echarts from "echarts";
const echarts = require("echarts");
export default {
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "400px",
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart(radius, pieDataName, pieData) {
      this.chart = echarts.init(this.$el);
      //   var option = {
      //     tooltip: {
      //       trigger: "item",
      //       formatter: "{a} <br/>{b} : {c} ({d}%)",
      //     },
      //     legend: {
      //       orient: "vertical",
      //       right: 20,
      //       top: 80,
      //       data: pieDataName,
      //     },
      //     series: [
      //       {
      //         name: "访问来源",
      //         type: "pie",
      //         radius: [radius, "60%"],
      //         center: ["45%", "53%"],
      //         data: pieData,
      //         itemStyle: {
      //           emphasis: {
      //             shadowBlur: 10,
      //             shadowOffsetX: 0,
      //             shadowColor: "rgba(0, 0, 0, 0.5)",
      //           },
      //         },
      //       },
      //     ],
      //   };
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "柱状图",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };
      this.chart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>