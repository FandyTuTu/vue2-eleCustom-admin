<template>
    <div class="export-table">
        <el-button
            type="success"
            icon="el-icon-download"
            class="export-btn"
            @click="exportTable"
        >导出</el-button>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%"
        >
            <el-table-column
                prop="date"
                label="日期"
                width="180"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180"
            >
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址"
            >
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2021-05-02",
          name: "李四",
          address: "上海市黄浦区xx路 1518 弄",
        },
        {
          date: "2021-05-04",
          name: "李四",
          address: "上海市黄浦区xx路 1517 弄",
        },
        {
          date: "2021-05-01",
          name: "李四",
          address: "上海市黄浦区xx路 1519 弄",
        },
        {
          date: "2021-05-03",
          name: "李四",
          address: "上海市黄浦区xx路 1516 弄",
        },
      ],
    };
  },
  methods: {
    exportTable() {
      console.log("导出表格");
      this.export2Excel(this.tableData);
    },
    export2Excel(arr) {
      var that = this;
      require.ensure([], () => {
        const {
          export_json_to_excel,
        } = require("../../common/excel/Export2Excel"); //这里必须使用绝对路径
        const tHeader = ["时间", "名称", "地址"]; // 导出的表头名
        const filterVal = ["date", "name", "address"]; // 导出的表头字段名
        var excData = arr; //需要导出的数据
        for (let i = 0; i < excData.length; i++) {
          if (!excData[i].status) {
            excData[i].status = "";
          }
        }
        const list = excData;
        const data = that.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "导出表格数据"); //根据需要自己命名
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
  },
};
</script>

<style lang="scss" scoped>
.export-table {
  background-color: #fff;
  height: 100%;
  padding: 0 20px;
}
.export-btn {
  margin: 10px 0;
}
</style>