<!--
 * @描述信息: slider菜单栏
 * @Author:   zls
-->
<template>
  <el-menu class="el-menu-vertical-demo scrollbar" :default-active="$route.path" background-color="transparent" unique-opened router :collapse="$store.state.showhide.isCollapse">
    <MenuTree v-for="item in treeData" :key="item.path" :route="item"></MenuTree>
  </el-menu>
</template>

<script>
import MenuTree from './MenuTree'
export default {
  name: 'Slider',
  components: { MenuTree },
  data() {
    return {
      treeData: [] // 路由表信息
    }
  },
  mounted() {
    // 过滤其他不需要的字段（虽然过滤后'component'为undefined，但是不影响，它已经添加至路由中了，slider中也用不到它）
    const fieldArr = ['path', 'name', 'component', 'meta', 'redirect', 'parent']
    const routes = this.$router.getRoutes().reduce((acc, item) => {
      let obj = {}
      fieldArr.forEach(v => (obj[v] = item[v]))
      acc.push(obj)
      return acc
    }, [])
    const asyncRoutes = routes.slice(3, -1)
    this.treeData = this.resolveRoute(asyncRoutes)
  },
  methods: {
    // 解析从后台添加的路由
    resolveRoute(arr) {
      const obj = arr.reduce((acc, item) => ({ ...acc, [item.path]: item }), {})
      const treeArr = arr.reduce((acc, item) => {
        let objN = item.parent ? obj[item.parent.path] : ''
        objN ? (objN.children || (objN.children = [])).push(item) : acc.push(item)
        return acc
      }, [])
      return treeArr[0].children
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo {
  background-color: $color !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
</style>
