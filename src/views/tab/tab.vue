<template>
    <div class="tabs-box">
        <el-tabs
            class="re-el-tabs"
            v-model="activeName"
            type="card"
            @tab-click="handleClick"
        >
            <el-tab-pane
                label="用户管理"
                name="first"
                class="tab-pane"
            >
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    border
                    stripe
                    :header-cell-style="{background:'#e4e4e4',color:'#606266',height:'50px'}"
                >
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

            </el-tab-pane>
            <el-tab-pane
                label="配置管理"
                name="second"
                class="tab-pane"
            >配置管理</el-tab-pane>
            <el-tab-pane
                label="角色管理"
                name="third"
                class="tab-pane"
            >角色管理</el-tab-pane>
            <el-tab-pane
                label="定时任务补偿"
                name="fourth"
                class="tab-pane"
            >定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
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
    handleClick(tab, event) {
      console.log(tab, event);
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
.tabs-box {
  background-color: #fff;
  height: 100%;
}
.table-avatar {
  width: 50px;
  height: 50px;
}
.tab-pane {
  margin: 10px;
}
</style>