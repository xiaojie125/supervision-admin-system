<!-- 任务列表 -->
<template>
  <div>
    <el-table :data="taskTable" style="width: 100%">
      <el-table-column
        :prop="task.prop"
        :label="task.label"
        v-for="task in taskTitle"
        :key="task.prop"
        :width="task.width ? task.width : 80"
        align="center"
        :sortable="task.sortable"
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="checkTaskTimeline(row)"
            >查看</el-button
          >
          <el-button
            type="success"
            size="mini"
            @click="addEditTaskVisible = true"
            >发布</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 查看时间线 -->
    <el-dialog
      v-el-drag-dialog
      :visible.sync="dialogTableVisible"
      :title="dialogTitle"
      @dragDialog="handleDrag"
    >
      <timeline />
    </el-dialog>
    <!-- 发布新的任务动作 -->
    <!-- 发布动态 -->
    <el-dialog
      title="发布新的任务操作"
      :visible.sync="addEditTaskVisible"
      width="30%"
      center
      v-loading="addEditTaskLoading"
    >
      <el-form ref="editTaskForm" label-width="100px" class="edit-task-form">
        <el-form-item>
          <el-input v-model="editTaskForm.editTitle" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="textarea"
            v-model="activityContent"
            placeholder="操作内容"
          ></el-input>
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
import elDragDialog from "@/directive/el-drag-dialog"; // base on element-ui

import Timeline from "@/components/Timeline";

import moment from "moment";

import { getTaskList } from "@/api/userInfo";
import { awaitWrap } from "@/utils";
export default {
  data() {
    return {
      taskTitle: [
        {
          label: "序号",
          prop: "sequence",
          sortable: true,
        },
        {
          label: "发布时间",
          prop: "createTime",
          width: 180,
          sortable: true,
        },
        {
          label: "标题",
          prop: "taskTitle",
          width: 180,
        },
        {
          label: "发布人",
          prop: "insertName",
        },
        {
          label: "重要性",
          prop: "taskType",
        },
        {
          label: "上一次处理时间",
          prop: "updateTime",
          sortable: true,
          width: 180,
        },
      ],
      taskTable: [],
      // 控制打开可拖拽盒子
      dialogTableVisible: false,
      dialogTitle: "",
      // 发布新的任务盒子
      addEditTaskVisible: false,
      addEditTaskLoading: false,
      editTaskForm: {
        editTitle: "",
        editContent: "",
        editPhoto: [],
      },
    };
  },
  directives: { elDragDialog },
  components: { Timeline },
  props: ["userId"],
  created() {
    this.init();
  },
  methods: {
    async init() {
      let result = await awaitWrap(getTaskList(this.userId));
      if (result) {
        this.taskTable = result.data;
      }
    },
    // 查看时间轴
    checkTaskTimeline(row) {
      this.dialogTitle = row.taskTitle;
      this.dialogTableVisible = true;
    },

    // 拖拽的回调函数
    handleDrag() {},
  },
  filters: {
    formatDataTime(value) {
      return moment().format(value, "YYYY-MM-DD hh:mm:ss");
    },
  },
};
</script>
