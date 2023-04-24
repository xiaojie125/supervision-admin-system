<!-- 左侧部分 -->
<template>
  <el-menu
    :default-active="$router.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#304156"
    text-color="#fff"
    active-text-color="#409eff"
  >
    <h2 v-if="!isCollapse">通用事务督办系统</h2>
    <h2 v-else>事务督办</h2>
    <el-menu-item
      :index="item.path"
      v-for="item in noChildren"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      :index="item.label"
      v-for="item in hasChildren"
      :key="item.path"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="subItem.path"
          v-for="(subItem, subIndex) in item.children"
          :key="subIndex"
          @click="clickMenu(subItem)"
        >
          <i :class="'el-icon-' + subItem.icon"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      menu: [
        {
          label: "首页",
          icon: "s-home",
          path: "/",
        },
        {
          label: "联系人",
          icon: "user-solid",
          path: "/contact/index",
        },
        {
          label: "任务",
          icon: "s-order",
          children: [
            {
              path: "/task/add",
              label: "发布任务",
              icon: "edit-outline",
            },
            {
              path: "/task/edit",
              label: "任务管理",
              icon: "edit-outline",
            },
          ],
        },
      ],
      isCollapse: false,
    };
  },
  mounted() {
    this.$bus.$on("showCollapse", () => {
      this.isCollapse = !this.isCollapse;
    });
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      this.$router.push(item.path);
    },
  },
  computed: {
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
  },
};
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo {
  height: 100vh;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  height: 100vh;
  // min-height: 765px;
}
h2 {
  text-align: center;
  color: #fff;
  padding-top: 10px;
  margin-bottom: 20px;
}
</style>
