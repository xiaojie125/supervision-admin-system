<!-- 联系人界面 -->
<template>
  <div class="contact-page">
    <el-row :gutter="20">
      <el-col :span="6"><ContactList /></el-col>
      <el-col :span="6"><ContactList /></el-col>
      <el-col :span="6"><ContactList /></el-col>
      <el-col :span="6"><ContactList /></el-col>
      <el-col :span="6"><ContactList /></el-col>
    </el-row>
  </div>
</template>

<script>
import ContactList from "./components/list";
export default {
  name: "contact",
  data() {
    return {};
  },

  components: { ContactList },

  computed: {},

  methods: {},
};
</script>
<style lang="scss" scoped>
.contact-page{
  margin-top: 20px;
}
</style>
