<template>
  <div class="home">
    <div class="card-list">
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span>文章汇总</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
          >操作按钮</el-button>
        </div>
        <div
          v-for="o in 4"
          :key="o"
          class="text item"
        >
          {{'列表内容 ' + o }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span>文章汇总</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
          >操作按钮</el-button>
        </div>
        <div
          v-for="o in 4"
          :key="o"
          class="text item"
        >
          {{'列表内容 ' + o }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span>文章汇总</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
          >操作按钮</el-button>
        </div>
        <div
          v-for="o in 4"
          :key="o"
          class="text item"
        >
          {{'列表内容 ' + o }}
        </div>
      </el-card>
    </div>
    <!-- <el-row class="home">
      <el-col :span="8" :gutter="20">
        <el-card shadow="hover">
          鼠标悬浮时显示
        </el-card>
      </el-col>
      <el-col :span="16">
        <div class="top">
          <el-card class="el-card" shadow="hover" v-for="item in 6" :key="item">
            <div class="top-left">
              <img
                src="https://upload.jianshu.io/users/upload_avatars/3450630/3c05c319-2c91-4962-9aeb-1e955ed8047d.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/90/h/90/format/webp"
                alt=""
              />
            </div>
            <div class="top-right">
              <p>￥123.00</p>
              <p>今日订单金额</p>
            </div>
          </el-card>
        </div>
        <div class="mid">
          <el-card shadow="hover">
            鼠标悬浮时显示
          </el-card>
        </div>
        <div class="bottom">
          <el-card shadow="hover">
            鼠标悬浮时显示
          </el-card>
          <el-card shadow="hover">
            鼠标悬浮时显示
          </el-card>
        </div>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  created() {
    this.getuserInfo();
  },
  methods: {
    getuserInfo() {
      let that = this;
      that.$api.article
        .getuserInfo({})
        .then((res) => {
          let result = res.data;
          if (result.code === 0) {
            that.userInfo = result.data;
          }
        })
        .catch((err) => {
          console.log("接口登录失败", err);
        })
        .finally((all) => {});
    },
    xx() {
      console.log("xxx");
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/home.scss";
</style>
