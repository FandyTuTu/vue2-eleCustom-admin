<template>
    <div>
        <el-alert
            title="直接通过设置类名为 el-icon-iconName 来使用即可。例如："
            type="warning"
            description=""
            show-icon
            :closable='false'
            class="custom-table"
        >
        </el-alert>
        <div class="icon-box">
            <i class="el-icon-edit"></i>
            <i class="el-icon-share"></i>
            <i class="el-icon-delete"></i>
            <el-button
                type="primary"
                icon="el-icon-search"
            >搜索</el-button>
            <el-button
                type="danger"
                icon="el-icon-share"
            >分享</el-button>
            <el-button
                type="success"
                icon="el-icon-download"
            >下载</el-button>
        </div>
        <el-alert
            title="图标集合"
            type="warning"
            description=""
            show-icon
            :closable='false'
            class="custom-table2"
        >
        </el-alert>
        <div class="icon-box">
            <i class="el-icon-delete-solid"></i>
            <i class="el-icon-circle-plus"></i>
            <i class="el-icon-picture-outline-round"></i>
            <i class="el-icon-top"></i>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.icon-box {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 20px;
  i {
    margin-right: 20px;
  }
}
.custom-table2 {
  margin-top: 20px;
}
</style>