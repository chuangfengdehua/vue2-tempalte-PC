<!--
 * @描述信息: 主页
 * @Author:  zls
-->
<template>
  <div class="home">
    <div class="home-box">
      <div class="permission" v-permission>测试按钮级别的权限指令</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.home {
  &-box {
    height: 100%;
    .permission {
      width: 300px;
      height: 40px;
      line-height: 40px;
      background-color: #6bad2e;
      border-radius: 4px;
      text-align: center;
      margin-bottom: 10px;
      font-size: 18px;
      color: #fff;
    }
  }
}
</style>
