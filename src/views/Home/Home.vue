<template>
  <div>
    <el-row class="home">
      <el-col :span="8" :gutter="20">
        <el-card shadow="hover">
          鼠标悬浮时显示
        </el-card>
      </el-col>
      <el-col :span="16">
        <div class="top">
          <el-card class="el-card" shadow="hover" v-for="item in 6">
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
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    getData() {
      this.$http.get("/home/getData").then(res => {
        console.log("都得", res.data);
      });
    }
  },
  mounted() {
    // this.getData();
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/home.scss";
</style>
