<template>
  <el-card style="margin-bottom: 20px">
    <div slot="header" class="clearfix">
      <span>个人信息</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <personal-thumb
          :image="user.avatar"
          :height="'100px'"
          :width="'100px'"
          :hoverable="false"
        >
          <div>Hello</div>
          {{ user.role }}
        </personal-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.username }}</div>
        <!-- <div class="user-role text-center text-muted">{{ user.role | uppercaseFirst }}</div> -->
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <!-- <svg-icon icon-class="education" /> -->
          <span>个性签名</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ user.describe }}
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header">
          <!-- <svg-icon icon-class="skill" /> -->
          <span>每日签到</span>
          <el-button
            type="primary"
            @click="signInHandler"
            :disabled="isSignIn"
            :loading="signInLoading"
          >
            {{ isSignIn ? "已签到" : "签到" }}
          </el-button>
        </div>

        <Calendar :userId="user.userId" :key="calendarComponentsReload"/>
      </div>
    </div>
  </el-card>
</template>

<script>
import PersonalThumb from "@/components/PersonalThumb";
import Calendar from "@/components/Calendar";

import { getSignInInfo, signInHandler } from "@/api/userInfo";
import { awaitWrap } from "@/utils";

export default {
  data() {
    return {
      value: new Date(),
      // 是否已经签到
      isSignIn: false,
      signInLoading: false,
      calendarComponentsReload:false
    };
  },
  components: { PersonalThumb, Calendar },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          userId: "",
          username: "",
          phone: "",
          avatar: "",
          describe: "",
        };
      },
    },
  },
  created() {
    // 获取今天是否已经签到
    this.init();
  },
  methods: {
    async init() {
      let result = await awaitWrap(getSignInInfo(this.user.userId));
      // 判断用户今天是否已经签到了
      if (result) {
        const signInData = result.data.signIn;
        // console.log(signInData)
        // 首先判断是否是空
        if(signInData.length == 0){
          // 从未签到过
          return
        }
        if (
          new Date(signInData.pop().signInTime).toLocaleDateString() ==
          new Date().toLocaleDateString()
        ) {
          this.isSignIn = true;
        }
      }
    },
    // 签到
    async signInHandler() {
      this.signInLoading = true;
      let result = await awaitWrap(signInHandler(this.user.userId));
      if (result) {
        // 打印签到成功的信息
        this.$message({
          message: "签到成功",
          type: "success",
        });
        this.isSignIn = true;
        this.calendarComponentsReload = true
      }
      this.signInLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
