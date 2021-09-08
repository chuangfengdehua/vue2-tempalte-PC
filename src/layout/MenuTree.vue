<template>
  <div class="menuTree">
    <el-menu-item v-if="!route.children" :index="route.path">
      <svg-icon :name="route.meta.svg"></svg-icon>
      <span slot="title">{{ route.meta.title }}</span>
    </el-menu-item>
    <el-submenu v-else :index="route.path">
      <template slot="title">
        <svg-icon :name="route.meta.svg"></svg-icon>
        <span>{{ route.meta.title }}</span>
      </template>
      <MenuTree v-for="item in route.children" :key="item.path" :route="item"></MenuTree>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'MenuTree',
  props: {
    route: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
