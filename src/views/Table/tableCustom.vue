<template>
  <div>
    <div>
      <el-button
        class="mb10"
        type="primary"
        icon="el-icon-delete"
        @click="del()"
      >批量删除</el-button>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        stripe
        @selection-change="handleSelectionChange"
        :header-cell-style="{background:'#e4e4e4',color:'#606266',height:'50px'}"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="日期"
          width="180"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          width="180"
        >
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column
          label="头像"
          width="180"
        >
          <template slot-scope="scope">
            <div
              class="table-avatar"
              v-viewer.rebuild="{scalable: true, zoomable: true, movable: true}"
            >
              <img
                :src="scope.row.avatar"
                alt="avatar"
                class="table-avatar"
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="地址"
          width=""
        >
          <template slot-scope="scope">
            {{ scope.row.address }}
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: "1",
          date: "2021-05-02",
          name: "张三",
          avatar:
            "https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/858325044f7e4935b2bd24f77a3e1999~300x300.image",
          address: "上海市闵行区xx路 1518 弄",
        },
        {
          id: "2",
          date: "2021-05-04",
          name: "张三",
          avatar: "https://avatars.githubusercontent.com/u/79627228?s=60&v=4",
          address: "上海市闵行区xx路 1517 弄",
        },
        {
          id: "3",
          date: "2021-05-01",
          name: "张三",
          avatar:
            "https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/858325044f7e4935b2bd24f77a3e1999~300x300.image",
          address: "上海市闵行区xx路 1519 弄",
        },
        {
          id: "4",
          date: "2021-05-03",
          name: "张三",
          avatar: "https://avatars.githubusercontent.com/u/79627228?s=60&v=4",
          address: "上海市闵行区xx路 1516 弄",
        },
      ],
      multipleSelection: [],
    };
  },
  methods: {
    //格式化图片呢路径
    formatPicPath(scope) {
      var path = scope.row.avatar || [];
      return path;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    del() {
      if (this.multipleSelection.length > 0) {
        this.$message.warning("批量删除!");
      } else {
        this.$message.warning("请选择一条数据!");
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/common.scss";
</style>

<style lang="scss" scoped>
.table-avatar {
  width: 50px;
  height: 50px;
}
</style>