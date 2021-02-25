<template>
  <header>
    <div class="l-con">
      <!-- :icon="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" -->
      <!-- <el-button
        icon="el-icon-menu"
        size="mini"
        @click="changeMenu"
      ></el-button> -->
      <i
        class="icon iconfont  mr5"
        :class="isCollapse ? 'iconzhankai' : 'iconshousuo'"
        @click="changeMenu"
      ></i>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="current.path"
          v-if="current && current.label"
        >{{ current.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-con">
      <p class="user-name">{{userName}}</p>
      <el-dropdown @command="changeCommand">
        <span class="el-dropdown-link">
          <img
            class="user-icon"
            :src="userIcon"
            alt=""
          />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="uinfo">个人资料</el-dropdown-item>
          <el-dropdown-item command="rePsd">修改密码</el-dropdown-item>
          <el-dropdown-item command="out">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <img src="../assets/logo.png" alt="" /> -->
      <!-- 修改密码 -->
      <el-dialog
        title="修改密码"
        width="40%"
        :visible.sync="dialogFormVisible"
      >
        <el-form
          :model="reForm"
          :rules="rerules"
          ref="reForm"
          label-width=""
          class="reForm"
        >
          <el-form-item
            label=""
            prop="ypsd"
          >
            <el-input
              :type="showPsd3 ? 'text' : 'password'"
              v-model="reForm.ypsd"
              placeholder="原密码"
            >
              <i
                slot="prefix"
                title="原密码"
                class="icon iconfont iconmima"
              ></i>
              <i
                slot="suffix"
                title="显示密码"
                @click="changePsd(3)"
                class="icon iconfont"
                :class="showPsd3 ? 'iconzhengkai': 'iconbiyan'"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item
            label=""
            prop="psd"
          >
            <el-input
              :type="showPsd ? 'text' : 'password'"
              v-model="reForm.psd"
              placeholder="密码"
            >
              <i
                slot="prefix"
                title="密码"
                class="icon iconfont iconmima"
              ></i>
              <i
                slot="suffix"
                title="显示密码"
                @click="changePsd(1)"
                class="icon iconfont"
                :class="showPsd ? 'iconzhengkai': 'iconbiyan'"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item
            label=""
            prop="psd"
          >
            <el-input
              :type="showPsd2 ? 'text' : 'password'"
              v-model="reForm.repsd"
              placeholder="确认密码"
              @keyup.enter.native="submitForm('reForm')"
            >
              <i
                slot="prefix"
                title="密码"
                class="icon iconfont iconmima"
              ></i>
              <i
                slot="suffix"
                title="显示密码"
                @click="changePsd(2)"
                class="icon iconfont"
                :class="showPsd2 ? 'iconzhengkai': 'iconbiyan'"
              ></i>
            </el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="savePsd"
          >确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
import Cookie from "js-cookie";
import utils from "@/common/utils";
export default {
  data() {
    return {
      userIcon: require("../assets/avatar.jpg"),
      userInfo: {},
      userName: null,
      dialogFormVisible: false,
      reForm: {
        ypsd: "",
        psd: "",
        repsd: "",
      },
      rerules: {
        psd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        repsd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      showPsd: false,
      showPsd2: false,
      showPsd3: false,
    };
  },
  created() {
    this.userName = localStorage.getItem("userName");
  },
  mounted() {},
  computed: {
    ...mapState({
      current: (state) => state.tab.currentMenu,
      changeCollapse: (state) => state.tab.isCollapse,
    }),
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
  methods: {
    changePsd(type = 1) {
      if (type === 1) {
        this.showPsd = !this.showPsd;
      } else if (type === 2) {
        this.showPsd2 = !this.showPsd2;
      } else if (type === 3) {
        this.showPsd3 = !this.showPsd3;
      }
    },
    savePsd() {
      let that = this;
      if (!that.reForm.ypsd) {
        that.$message({
          message: "请输入原密码",
          type: "error",
        });
        return;
      }
      if (!that.reForm.psd) {
        that.$message({
          message: "请输入密码",
          type: "error",
        });
        return;
      }
      if (!that.reForm.repsd) {
        that.$message({
          message: "请输入确认密码",
          type: "error",
        });
        return;
      }
      if (that.reForm.psd !== that.reForm.repsd) {
        that.$message({
          message: "两次密码不一致",
          type: "error",
        });
        return;
      }
      console.log("修改密码", that.reForm);
      //修改密码
      that.$api.common
        .changePassword({
          y_password: this.reForm.ypsd,
          password: this.reForm.psd,
          re_password: this.reForm.repsd,
        })
        .then((res) => {
          let result = res.data;
          if (result.code === 0) {
            that.$message({
              message: "请输入确认密码",
              type: "error",
            });
            that.dialogFormVisible = false;
          }
        })
        .catch((err) => {
          console.log("接口登录失败", err);
        })
        .finally((all) => {
          that.fullscreenLoading = false;
        });
    },
    changeMenu() {
      this.$store.commit("changeCollapse");
    },
    changeCommand(e) {
      let that = this;
      if (e === "out") {
        that.$router.push({
          path: "/login",
        });
        Cookie.set("token", "");
        that.$store.commit("setToken", "");
        that.$store.commit("clearAllMenu");
      } else if (e === "rePsd") {
        that.dialogFormVisible = true;
      } else {
        that.$router.push({
          path: "/userInfo",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.iconfont {
  font-size: 22px;
  color: #eee;
}
header {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
}
.l-con {
  display: flex;
  align-items: center;
}
.r-con {
  cursor: pointer;
  display: flex;
  align-items: center;
  .user-name {
    margin-right: 10px;
    color: #fff;
  }
}
.user-icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
.el-dropdown-menu el-popper {
  text-align: center;
}
.reForm {
  width: 70%;
  margin: 0 auto;
}
</style>

<style lang="scss">
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  color: #ccc;
  font-weight: 400;
}
.el-breadcrumb {
  margin-left: 20px;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  color: #fff;
}
</style>
