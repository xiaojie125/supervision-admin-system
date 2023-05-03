<template>
  <div class="user-activity">
    <div class="add-activity">
      <i
        class="add-activity-btn el-icon-plus"
        @click="addActivityVisible = true"
      ></i>
    </div>
    <div class="post" v-for="activity in activityList" :key="activity.id">
      <div class="user-block">
        <img class="img-circle" :src="activity.avatar" />
        <span class="username text-muted">{{ activity.username }}</span>
        <span class="description"
          >{{modes[activity.mode]}} - {{ activity.createTime | timeAgo }}</span
        >
      </div>
      <p>
        {{ activity.activityContent }}
      </p>
      <div class="user-images" v-show="activity.activityPhoto.length">
        <el-carousel :interval="6000" type="card" height="220px">
          <el-carousel-item v-for="item in activity.activityPhoto" :key="item">
            <img :src="item" class="image" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <ul class="list-inline">
        <li>
          <span class="link-black text-sm">
            <i class="el-icon-share" />
            Share
          </span>
        </li>
        <li>
          <span class="link-black text-sm">
            <!-- <svg-icon icon-class="like" /> -->
            Like
          </span>
        </li>
      </ul>
    </div>

    <!-- 发布动态 -->
    <el-dialog
      title="发布动态"
      :visible.sync="addActivityVisible"
      width="30%"
      center
      v-loading="addActivityLoading"
    >
      <el-form ref="activityForm" label-width="100px" class="activity-form">
        <el-form-item>
          <el-input
            type="textarea"
            v-model="activityContent"
            placeholder="分享趣味事情"
          ></el-input>
        </el-form-item>
        <!-- 选择动态的类型 是否公开 -->
        <el-form-item>
          <el-select v-model="mode" placeholder="请选择">
            <el-option
              v-for="item in modeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 上传图片 -->
        <el-form-item>
          <el-upload
            :headers="headers"
            :multiple="true"
            :file-list="fileList"
            :show-file-list="true"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
            class="editor-slide-upload"
            :action="action"
            list-type="picture-card"
            :limit="9"
            :on-exceed="handleExceed"
          >
            <i slot="default" class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit()">提交</el-button>
          <el-button @click="handleCancle()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
const avatarPrefix = "?imageView2/1/w/80/h/80";
const carouselPrefix = "?imageView2/2/h/440";

import ImageEditor from "@/components/ImageEditor";
import { getToken } from "@/utils/auth";
import config from "@/config";
import { addActivity, getActivity } from "@/api/activity";
import { awaitWrap } from "@/utils";

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          username: "",
          avatar: "",
        };
      },
    },
  },
  data() {
    return {
      carouselImages: [
        "https://wpimg.wallstcn.com/9679ffb0-9e0b-4451-9916-e21992218054.jpg",
        "https://wpimg.wallstcn.com/bcce3734-0837-4b9f-9261-351ef384f75a.jpg",
        "https://wpimg.wallstcn.com/d1d7b033-d75e-4cd6-ae39-fcd5f1c0a7c5.jpg",
        "https://wpimg.wallstcn.com/50530061-851b-4ca5-9dc5-2fead928a939.jpg",
      ],
      avatarPrefix,
      carouselPrefix,
      // 动态信息的展示列表
      activityList: [],
      // 发布动态的弹窗控制器
      addActivityVisible: false,
      activityContent: "",
      // 是否公开
      mode: 0,
      modes:['公开的','私有的'],
      modeOptions: [
        {
          value: 0,
          label: "公开",
        },
        {
          value: 1,
          label: "私有",
        },
      ],
      // 添加动态的loading
      addActivityLoading: false,
      listObj: {},
      fileList: [],
      headers: {
        Authorization: getToken(),
      },
      action: config.server + "/activity/uploadPhoto",
    };
  },
  components: { ImageEditor },
  created() {
    this.init();
  },
  methods: {
    async init() {
      // 获取动态
      let result = await awaitWrap(getActivity());
      if (result) {
        console.log(result.data);
        this.activityList = result.data;
      }
    },
    // 图片上传
    imageSuccessCBK(arr) {
      console.log(arr);
      this.activityForm.activityPhoto = arr;
      // arr.forEach((v) =>
      //   window.tinymce
      //     .get(this.tinymceId)
      //     .insertContent(`<img class="wscnph" src="${v.url}" >`)
      // );
    },
    submitActivityForm(activityForm) {
      this.$refs[activityForm].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(activityForm) {
      this.$refs[activityForm].resetFields();
    },
    checkAllSuccess() {
      return Object.keys(this.listObj).every(
        (item) => this.listObj[item].hasSuccess
      );
    },
    // 提交 发布动态
    async handleSubmit() {
      this.addActivityLoading = true;
      const arr = Object.keys(this.listObj).map((v) => this.listObj[v].url);
      if (!this.checkAllSuccess()) {
        this.$message(
          "请等待所有文件上传成功。如果有网络问题，请刷新页面重新上传!"
        );
        return;
      }
      // 判断是否arr 或者 content是否由内容
      if (arr.length == 0 && this.activityContent.length == 0) {
        this.$message("请输入内容");
        this.addActivityLoading = false;
        return;
      }
      let result = await awaitWrap(
        addActivity({
          username: this.user.username,
          avatar: this.user.avatar,
          activityContent: this.activityContent,
          activityPhoto: arr,
          mode: this.mode,
        })
      );
      this.addActivityLoading = false;
      if (result) {
        this.$message({
          message: "发布成功！",
          type: "success",
        });

        this.init()

        this.listObj = {};
        this.fileList = [];
        this.addActivityVisible = false;
      }
    },
    // 取消
    handleCancle() {
      if (this.fileList.length !== 0 || this.activityContent.length !== 0) {
        console.log("内容还未保存", this.fileList, this.activityContent);
      } else {
        this.addActivityVisible = false;
      }
    },
    handleSuccess(response, file) {
      const uid = file.uid;
      const objKeyArr = Object.keys(this.listObj);
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.data.url;
          this.listObj[objKeyArr[i]].hasSuccess = true;
          return;
        }
      }
    },
    handleRemove(file) {
      console.log(file);
      const uid = file.uid;
      const objKeyArr = Object.keys(this.listObj);
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]];
          return;
        }
      }
    },
    beforeUpload(file) {
      const _self = this;
      const _URL = window.URL || window.webkitURL;
      const fileName = file.uid;
      this.listObj[fileName] = {};
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = _URL.createObjectURL(file);
        img.onload = function () {
          _self.listObj[fileName] = {
            hasSuccess: false,
            uid: file.uid,
            width: this.width,
            height: this.height,
          };
        };
        resolve(true);
      });
    },
    // 文件超出数量的时候的回调
    handleExceed(file, fileList) {
      console.log(file, fileList);
      this.$message({
        message: "最多上传9个图片!",
        type: "warning",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-activity {
  .add-activity {
    .add-activity-btn {
      font-size: 25px;
      cursor: pointer;
      transition: all 0.3s;
      color: #1890ff;
      margin-bottom: 10px;
      margin-left: 10px;
    }
  }
  .add-activity-btn:hover {
    transform: rotate(90deg);
  }
  .user-block {
    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .username {
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;
    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {
      &:hover,
      &:focus {
        color: #999;
      }
    }
  }
}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
</style>
