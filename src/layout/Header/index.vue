<!-- 顶部部分 -->
<template>
  <header>
    <div class="l-content">
      <span class="collapseBtn" @click="showCollapseHandler">
        <i :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
      </span>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click">
        <div class="avatar">
          <span>{{ username }}</span>
          <img :src="avatar" alt="" />
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(dropdown, index) in userDropdown"
            :key="index"
            :icon="dropdown.icon"
            >{{ dropdown.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      collapse: false,
      userDropdown: [
        {
          name: "首页",
        },
        {
          name: "登出",
        },
      ],
    };
  },
  methods: {
    // 折叠左侧菜单
    showCollapseHandler() {
      this.collapse = !this.collapse;
      this.$bus.$emit("showCollapse");
    },
  },
  computed: {
    ...mapGetters(["avatar", "username"]),
  },
};
</script>
<style lang="scss" scoped>
header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  .l-content {
    display: flex;
    align-items: center;
    .collapseBtn {
      margin-right: 20px;
      font-size: 2em;
      font-weight: 900;
      cursor: pointer;
    }
  }
  .r-content {
    .avatar {
      position: relative;
      margin-right: 10px;
      cursor: pointer;
      span {
        margin-right: 10px;
        font-size: 1.3em;
        vertical-align: middle;
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      i {
        cursor: pointer;
        position: absolute;
        right: -20px;
        bottom: 0px;
        font-size: 12px;
      }
    }
    // .el-dropdown-link {
    //   cursor: pointer;
    //   color: #409eff;
    // }
    // .el-icon-arrow-down {
    //   font-size: 12px;
    // }
    // .demonstration {
    //   display: block;
    //   color: #8492a6;
    //   font-size: 14px;
    //   margin-bottom: 20px;
    // }
  }
}
</style>
