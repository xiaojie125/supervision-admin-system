<!-- 添加任务 -->
<template>
  <div>
    <el-form
      class="task-form"
      ref="form"
      :model="taskForm"
      :rules="taskRules"
      label-width="80px"
      size="mini"
    >
      <el-form-item label="任务标题" prop="taskTitle">
        <el-input v-model="taskForm.taskTitle"></el-input>
      </el-form-item>
      <el-form-item label="任务类型" prop="taskType">
        <el-select v-model="taskForm.taskType" placeholder="请选择活动区域">
          <el-option
            v-for="(type, index) in taskTypeOptions"
            :key="index"
            :label="type.label"
            :value="type.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 富文本编辑器 -->
      <div>
        <tinymce v-model="taskForm.taskText" :height="300" />
      </div>

      <!-- 员工列表 -->
      <StaffList />

      <!-- 表单的提交按钮 -->
      <el-form-item size="large" class="task-form-btn">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <!-- <div class="editor-content" v-html="taskText" /> -->
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import StaffList from "@/components/StaffList";
export default {
  name: "AddTask",
  data() {
    return {
      taskForm: {
        taskTitle: "",
        taskType: "",
        taskText: "",
      },
      taskRules: {
        taskTitle: [
          { required: true, message: "请输入任务标题", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
        ],
        taskType: [
          { required: true, message: "请选择任务类型", trigger: "blur" },
        ],
      },
      // 任务类型的options
      taskTypeOptions: [
        { label: "常规", value: "changgui" },
        { label: "紧急", value: "jinji" },
      ],
    };
  },

  components: { Tinymce, StaffList },
  computed: {},

  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
<style lang="scss" scoped>
.task-form {
  margin-top: 20px;
  .task-form-btn {
    margin-top: 20px;
  }
}
</style>
