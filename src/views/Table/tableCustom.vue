<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        label="日期"
        width="180"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        width="180"
      >
        <template slot-scope="scope">
          <el-popover
            trigger="hover"
            placement="top"
          >
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div
              slot="reference"
              class="name-wrapper"
            >
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
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
            <!-- <img
              class=""
              v-lazy="formatPicPath(scope)"
              :key="formatPicPath(scope)"
              alt=""
            > -->
            <img
              :src="scope.row.avatar"
              alt="avatar"
              class="table-avatar"
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
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
          name: "张三",
          avatar:
            "https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/858325044f7e4935b2bd24f77a3e1999~300x300.image",
          address: "上海市闵行区xx路 1518 弄",
        },
        {
          date: "2021-05-04",
          name: "张三",
          avatar: "https://avatars.githubusercontent.com/u/79627228?s=60&v=4",
          address: "上海市闵行区xx路 1517 弄",
        },
        {
          date: "2021-05-01",
          name: "张三",
          avatar:
            "https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/858325044f7e4935b2bd24f77a3e1999~300x300.image",
          address: "上海市闵行区xx路 1519 弄",
        },
        {
          date: "2021-05-03",
          name: "张三",
          avatar: "https://avatars.githubusercontent.com/u/79627228?s=60&v=4",
          address: "上海市闵行区xx路 1516 弄",
        },
      ],
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
  },
};
</script>

<style lang="scss" scoped>
.table-avatar {
  width: 50px;
  height: 50px;
}
</style>