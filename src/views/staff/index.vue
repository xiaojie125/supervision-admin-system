<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="员工列表" name="first">
      <staff-list />
    </el-tab-pane>
    <el-tab-pane label="签到统计" name="second">
      <sign-in />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import SignIn from "./components/signIn";
import StaffList from "./components/staffList";

export default {
  data() {
    return {
      activeName: "second",
    };
  },
  components: { SignIn, StaffList },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
