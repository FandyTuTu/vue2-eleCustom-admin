<template>
  <div class="Login">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="login-form"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input
          type="text"
          v-model="ruleForm.userName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="login-btn">
          <el-button type="info" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Message } from "element-ui";
import utils from "@/common/utils";
export default {
  data() {
    return {
      ruleForm: {
        userName: "",
        pass: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          //登录
          that.$api.article
            .login({
              username: this.ruleForm.userName,
              password: this.ruleForm.pass
            })
            .then(res => {
              console.log("登录成功", res);
              utils.setlocalStorage("tokenKey", res.data.data.token);
              that.$router.push({
                path: "/"
              });
            })
            .catch(err => {
              console.log("登录失败", err);
              Message.error(err.data.msg);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
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
</style>
