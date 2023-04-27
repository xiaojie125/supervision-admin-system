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
      <el-main style="margin-top: 20px">
        <transition name="fade" mode="out-in">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
        </transition>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </el-main>
      <!-- 悬浮 -->
      <right-panel v-if="showPersonal">
        <personal />
      </right-panel>
    </el-container>
  </el-container>
</template>

<script>
import RightPanel from "@/components/RightPanel";
import { mapState } from "vuex";
import Aside from "./components/Aside";
import Header from "./components/Header";
import Personal from "./components/Personal";

export default {
  name: "layout",
  data() {
    return {};
  },

  computed: {
    ...mapState({
      showPersonal: (state) => state.personal.showPersonal,
    }),
  },

  components: { Aside, Header, Personal, RightPanel },
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
    &::-webkit-scrollbar {
      width: 0 !important;
    }
  }
}
</style>
