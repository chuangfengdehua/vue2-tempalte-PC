<!--
 * @描述信息: 面包屑
 * @Author:   zls
-->
<template>
  <div class="breadcrumb scrollbar">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in levelList" :key="item.path">
        <a @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        <!-- {{ item.meta.title }} -->
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  computed: {
    //面包屑的数组(使用slice截取是因为我们不需要layout)
    levelList() {
      return this.$route.matched.slice(1)
    }
  },
  methods: {
    handleLink(item) {
      this.$router.push({ path: item.path })
    }
  }
}
</script>
<style scoped lang="scss">
.breadcrumb {
  width: 100%;
  height: 50px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  overflow-x: auto;
  background-color: $bgColor;
}
</style>
