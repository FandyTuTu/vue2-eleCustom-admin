<template>
  <div class="Login">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width=""
      class="login-form"
      :show-message="false"
    >
      <el-form-item
        label=""
        prop="userName"
      >
        <el-input
          type="text"
          v-model="ruleForm.userName"
          placeholder="admin"
          clearable
        >
          <i
            slot="prefix"
            title="用户名"
            class="icon iconfont iconyonghuming"
          ></i>
        </el-input>
      </el-form-item>
      <el-form-item
        label=""
        prop="psd"
      >
        <el-input
          :type="showPsd ? 'text' : 'password'"
          v-model="ruleForm.psd"
          placeholder="123456"
          @keyup.enter.native="submitForm('ruleForm')"
        >
          <i
            slot="prefix"
            title="密码"
            class="icon iconfont iconmima"
          ></i>
          <i
            slot="suffix"
            title="显示密码"
            @click="changePsd"
            class="icon iconfont"
            :class="showPsd ? 'iconzhengkai': 'iconbiyan'"
          ></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <div class="login-btn">
          <el-button
            type="info"
            @click="submitForm('ruleForm')"
            v-loading.fullscreen.lock="fullscreenLoading"
          >登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-link
          type="info"
          @click="goRegister"
        >注册账号</el-link>
      </el-form-item>
    </el-form>
    <!-- 注册弹窗 -->
    <el-dialog
      title="用户注册"
      width="40%"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="reForm"
        :rules="rerules"
        ref="reForm"
        label-width=""
        class="registerForm"
        :show-message="false"
      >
        <el-form-item
          label=""
          prop="userName"
        >
          <el-input
            type="text"
            v-model="reForm.userName"
            placeholder="用户名"
            clearable
          >
            <i
              slot="prefix"
              title="用户名"
              class="icon iconfont iconyonghuming"
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
              @click="changePsd"
              class="icon iconfont"
              :class="showPsd ? 'iconzhengkai': 'iconbiyan'"
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
          @click="regisetr"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
import utils from "@/common/utils";
import Cookie from "js-cookie";
export default {
  data() {
    return {
      ruleForm: {
        userName: "",
        psd: "",
      },
      reForm: {
        userName: "",
        psd: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        psd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      rerules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        psd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      fullscreenLoading: false,
      showPsd: false,
      dialogFormVisible: false,
    };
  },
  created() {},
  methods: {
    changePsd() {
      this.showPsd = !this.showPsd;
    },
    goRegister() {
      this.dialogFormVisible = true;
      this.reForm = {
        userName: "",
        psd: "",
      };
    },
    regisetr() {
      let that = this;
      if (!that.reForm.userName) {
        that.$message({
          message: "请输入用户名",
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
      console.log("注册", that.reForm);
      //注册
      that.$api.common
        .register({
          username: this.reForm.userName,
          password: this.reForm.psd,
        })
        .then((res) => {
          let result = res.data;
          if (result.code === 0) {
            if (result.token) {
              Cookie.set("token", result.token);
              that.$store.commit("setToken", result.token);
              utils.setlocalStorage("userName", result.userName);
              that.$router.push({
                path: "/",
              });
            }
          }
          // utils.setlocalStorage("tokenKey", res.data.data.token);
          // that.$router.push({
          //   path: "/"
          // });
        })
        .catch((err) => {
          console.log("接口登录失败", err);
        })
        .finally((all) => {
          that.fullscreenLoading = false;
        });
    },
    submitForm(formName) {
      let that = this;
      if (!that.ruleForm.userName) {
        that.$message({
          message: "请输入用户名",
          type: "error",
        });
        return;
      }
      if (!that.ruleForm.psd) {
        that.$message({
          message: "请输入用密码",
          type: "error",
        });
        return;
      }
      that.fullscreenLoading = true;
      //登录
      that.$api.common
        .login({
          username: this.ruleForm.userName,
          password: this.ruleForm.psd,
        })
        .then((res) => {
          let result = res.data;
          if (result.code === 0) {
            if (result.token) {
              Cookie.set("token", result.token);
              that.$store.commit("setToken", result.token);
              utils.setlocalStorage("userName", result.userName);
              that.$router.push({
                path: "/",
              });
            }
          }
          // utils.setlocalStorage("tokenKey", res.data.data.token);
          // that.$router.push({
          //   path: "/"
          // });
        })
        .catch((err) => {
          console.log("接口登录失败", err);
        })
        .finally((all) => {
          that.fullscreenLoading = false;
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.Login {
  // position: relative;
  width: 100%;
  height: 100%;
  // background-color: #333;
  background-color: rgb(84, 92, 100);
}
.login-form {
  width: 500px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  background-color: #fff;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  overflow: hidden;
  padding: 80px 60px;
}
.login-btn {
  display: flex;
  justify-content: space-around;
}
.registerForm {
  width: 70%;
  margin: 0 auto;
}
</style>
<style lang="scss" scoped>
/deep/ .el-input__prefix {
  left: 8px;
}
</style>
