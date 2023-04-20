<!-- 员工列表 -->
<template>
  <section class="result-list">
    <div>
      <p>选择发布任务的对象</p>
      <!-- 全选 -->
      <el-checkbox
        class="check-all"
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        >全选</el-checkbox
      >
      <div style="margin: 15px 0"></div>
      <!-- 员工列表 -->
      <el-checkbox-group
        class="staff-list"
        v-model="checkedList"
        @change="handleCheckedStaffChange"
      >
        <el-checkbox
          v-for="staff in staffList"
          :label="staff.userId"
          :key="staff.id"
        >
          <el-avatar :size="50" :src="staff.avatar" fit="fill"></el-avatar>
          <p class="staff-username">{{ staff.username }}</p>
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </section>
</template>

<script>
import { awaitWrap } from "@/utils";

// 接口
import { reqStaffList } from "@/api/common";
export default {
  name: "StaffList",
  data() {
    return {
      // 当前选中的数据
      checkedList: [],
      // 基本数据
      staffList: [],
      checkAll: false,
      isIndeterminate: true,
    };
  },
  props: ["getStaffList"],
  created() {
    this.init();
  },
  methods: {
    // 初始化
    async init() {
      // 获取网络请求
      let result = await awaitWrap(reqStaffList());

      console.log(result);

      if (result) {
        this.staffList = result.data
      }
    },
    // 全选
    handleCheckAllChange(val) {
      this.checkedList = val ? staffList : [];
      this.isIndeterminate = false;
    },
    // 单选
    handleCheckedStaffChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.staffList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.staffList.length;
    },
  },
  watch: {
    // 当check改变的时候 传给父组件
    // checkedList(newValue) {
    //   // console.log(this.getStaffList)
    //   // 由于checkedList结果可能是id 也可能是 对象 因此需要整理一下
    //   const result = [];
    //   newValue.forEach((item) => {
    //     if (item.userId) {
    //       result.push(item.userId);
    //     } else {
    //       result.push(item);
    //     }
    //   });
    //   this.getStaffList(result);
    // },
  },
};
</script>
<style lang="scss" scoped>
.result-list {
  margin-top: 35px;
  position: relative;
}
.check-all {
  position: absolute;
  top: 0;
  right: 0;
}
.staff-list {
  border: 1px solid rgba($color: #000000, $alpha: 0.3);
  display: flex;
  overflow-x: auto;
  label {
    margin: 0 10px;
    padding: 0 20px;
    background: #fff;
    text-align: center;
    border: 1px solid rgba($color: #000000, $alpha: 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .staff-username {
  }
}
</style>
