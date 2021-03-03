<template>
  <div id="userInfo">
    <div class="com-con">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="用户名"
          prop="userName"
        >
          <el-input
            v-model="ruleForm.userName"
            class="w300"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item
          label="角色"
          prop="roleName"
        >
          <el-input
            v-model="ruleForm.roleName"
            class="w300"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item
          label="性别"
          prop="sex"
        >
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="手机号码"
          prop="phone"
        >
          <el-input
            v-model="ruleForm.phone"
            class="w300"
            maxlength="11"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="用户头像"
          prop="avatar"
        >
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="ruleForm.avatar"
              :src="ruleForm.avatar"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-upload2 avatar-uploader-icon"
            ></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
          >保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import uploadItem from "@/components/uploadItem";
export default {
  name: "userInfo",
  components: {
    uploadItem,
  },
  data() {
    return {
      ruleForm: {
        userName: "", //登录名
        roleName: "",
        sex: "1",
        phone: "",
        avatar: "",
      },
      rules: {
        userName: [
          { required: true, message: "请填写用户名", trigger: "blur" },
        ],
        roleName: [
          { required: true, message: "请填写角色名", trigger: "blur" },
        ],
        // sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        phone: [{ required: true, message: "请填写手机号", trigger: "blur" }],
      },
    };
  },
  created() {
    const that = this;
    that.getuserInfo();
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    getuserInfo() {
      let that = this;
      that.$api.common
        .getuserInfo({})
        .then((res) => {
          let result = res.data;
          if (result.code === 0) {
            let ndata = result.data;
            Object.assign(that.ruleForm, {
              userName: ndata.username,
              roleName: ndata.roleName,
              sex: ndata.sex,
              phone: ndata.phone,
              avatar: ndata.avatar,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally((all) => {});
    },

    editUserInfo() {
      let that = this;
      return new Promise((resolve, reject) => {
        that.$api.common
          .editUserInfo({
            sex: that.ruleForm.sex,
            phone: that.ruleForm.phone,
            avatar: that.ruleForm.avatar,
          })
          .then((res) => {
            let result = res.data;
            if (result.code === 0) {
              that.$message({
                message: "保存个人资料成功",
                type: "success",
              });
            }
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject();
          })
          .finally((all) => {});
      });
    },
    submitForm(formName) {
      const that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          that.editUserInfo().then((res) => {
            that.getuserInfo();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    uploadAvatar(e) {
      console.log("子方法", e);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
