<template>
  <div class="personal">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="当前任务列表:" name="1">
        <div>任务</div>
      </el-collapse-item>
      <el-collapse-item title="会话列表" name="2">
        <div>会话</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeNames: ["1"],
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
  },
};
</script>
<style lang="scss" scoped>
.personal {
  padding: 50px 30px;
}
</style>
