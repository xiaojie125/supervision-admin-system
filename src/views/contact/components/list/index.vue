<!-- 联系人列表 -->
<template>
  <div class="contact">
     <el-avatar :size="80" :src="avatarSrc"></el-avatar>
     <div class="contact-btn">
      <el-button type="primary">操作</el-button>
     </div>
  </div>
</template>

<script>
export default {
  name:'ContactList',
  data () {
    return {
    };
  },

  props:['avatarSrc'],

  components: {},

  computed: {},

  methods: {}
}

</script>
<style lang='scss' scoped>
.contact{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 300px;
  height: 100px;
  background: pink;
  margin-top: 20px;
}
</style>