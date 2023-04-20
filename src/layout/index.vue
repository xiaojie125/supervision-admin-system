<!-- 整体布局 -->
<template>
  <el-container id="components-layout-demo-custom-trigger">
    <!-- 左侧菜单列表 -->
    <el-aside width="auto">
      <Aside />
    </el-aside>
    <!-- 右侧 -->
    <el-container>
      <!-- 顶部部分 -->
      <el-header class="header">
        <Header />
      </el-header>
      <!-- 核心内容部分 -->
      <el-main>
        <transition name="fade" mode="out-in">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
        </transition>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "./Aside";
import Header from "./Header";
export default {
  name: "layout",
  data() {
    return {};
  },

  components: { Aside, Header },

  computed: {},

  methods: {},
};
</script>
<style lang="scss" scoped>
#components-layout-demo-custom-trigger {
  height: 100vh;

  .el-header {
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  }
  .el-main {
    padding-top: 0;
  }
}
</style>
