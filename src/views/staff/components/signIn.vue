<!-- 签到统计页面 -->
<template>
  <div class="chart-container">
    <chart height="100%" width="100%" />
  </div>
</template>

<script>
import Chart from "@/components/Charts/Keyboard";
export default {
  name: "signIn",
  data() {
    return {};
  },

  components: { Chart },
};
</script>
<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
