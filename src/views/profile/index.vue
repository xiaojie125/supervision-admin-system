<!-- 用户界面 -->
<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Activity" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="任务" name="task">
                <task :userId="userInfo.userId" />
              </el-tab-pane>
              <el-tab-pane label="会议" name="meeting">
                <meeting />
              </el-tab-pane>
              <el-tab-pane label="个人信息" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserCard from "./components/UserCard";
import Activity from "./components/Activity";
import Task from "./components/Task";
import Account from "./components/Account";
import Meeting from "./components/Meeting";

export default {
  name: "Profile",
  components: { UserCard, Activity, Task, Account, Meeting },
  data() {
    return {
      user: {},
      activeTab: "activity",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      // console.log("userInfo", this.userInfo);
      this.user = this.userInfo;
    },
  },
};
</script>
