<!-- 个人信息 -->
<template>
  <el-form>
    <el-form-item>
      <!-- 头像 上传头像 -->
      <personal-thumb
        :image="user.avatar"
        :height="'100px'"
        :width="'100px'"
        :hoverable="false"
      ></personal-thumb>
      <el-button
        type="primary"
        icon="el-icon-upload"
        style="position: absolute; bottom: 15px; margin-left: 40px"
        @click="imagecropperShow = true"
      >
        修改头像
      </el-button>
      <image-cropper
        v-show="imagecropperShow"
        :key="imagecropperKey"
        :width="300"
        :height="300"
        url="/my/updateAvatar"
        lang-type="zh"
        @close="close"
        @crop-upload-success="cropSuccess"
      />
    </el-form-item>
    <!-- 用户的其他信息 -->
    <el-form-item label="昵称:">
      <span v-if="!edit">{{ userInfo.username }}</span>
      <el-input v-else class="username" v-model.trim="userInfo.username" />
    </el-form-item>
    <el-form-item label="用户名:">
      <span class="account">{{ userInfo.userId }}</span>
    </el-form-item>
    <el-form-item label="我的签名:">
      <span v-if="!edit">{{ userInfo.describe }}</span>
      <el-input
        v-else
        class="describe"
        type="textarea"
        v-model.trim="userInfo.describe"
        maxlength="24"
        show-word-limit
      />
    </el-form-item>
    <el-form-item label="性别">
      <span v-if="!edit">{{ userInfo.sex }}</span>
      <el-radio-group v-else v-model.trim="userInfo.sex">
        <el-radio-button
          :label="item"
          v-for="(item, index) in sex"
          :key="index"
        ></el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="出生日期">
      <span v-if="!edit">{{ userInfo.birthday | formatTime }}</span>
      <el-date-picker
        v-else
        v-model="userInfo.birthday"
        type="date"
        format="yyyy-MM-dd"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button v-if="!edit" type="primary" @click="edit = true"
        >编辑</el-button
      >
      <el-button v-else type="success" @click="submit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import PersonalThumb from "@/components/PersonalThumb";
import ImageCropper from "@/components/ImageCropper";

import { updateInfo } from "@/api/userInfo";
import { awaitWrap } from "@/utils";
import moment from "moment";

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          userId: "",
          username: "",
          describe: "",
          birthday: "",
          sex: "",
        };
      },
    },
  },
  components: { PersonalThumb, ImageCropper },
  data() {
    return {
      edit: false,
      // 上传图像的box
      imagecropperShow: false,
      // 上传图像成功后 对组件更新的key
      imagecropperKey: 0,
      // 用户信息
      userInfo: {},
      // 性别
      sex: ["男", "女", "保密"],
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      this.userInfo = {
        userId: this.user.userId,
        username: this.user.username,
        describe: this.user.describe,
        birthday: this.user.birthday,
        sex: this.sex[this.user.sex],
      };
    },
    async submit() {
      let result = await awaitWrap(
        updateInfo({
          ...this.userInfo,
          sex: this.sex.indexOf(this.userInfo.sex),
          birthday: moment(this.userInfo.birthday).format("YYYY-MM-DD"),
        })
      );
      if (result) {
        // 修改头像
        await this.$store.dispatch("user/getInfo");
        this.$message({
          message: "修改成功!",
          type: "success",
          duration: 5 * 1000,
        });
        this.edit = false;
      }
    },
    async cropSuccess(resData) {
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1;
      if (resData.success) {
        // 修改头像
        await this.$store.dispatch("user/getInfo");
        this.$message({
          message: "修改成功!",
          type: "success",
        });
      } else {
        this.$message({
          message: resData.message,
          type: "warning",
        });
      }
      // this.image = resData.files.avatar;
    },
    close() {
      this.imagecropperShow = false;
    },
  },
  filters: {
    formatTime(value) {
      // 首先格式化
      value = moment(value).format("YYYY-MM-DD");
      if (value.indexOf(" ") > -1) {
        // 则处理
        value = value.split(" ")[0];
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
.username {
  width: 300px;
}

.account {
  color: #898989;
}

.describe {
  width: 500px;
}
</style>
