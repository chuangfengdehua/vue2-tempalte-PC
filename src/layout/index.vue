<template>
  <div class="layout">
    <Slider></Slider>
    <div class="layout-box">
      <Header></Header>
      <!-- <Breadcrumb></Breadcrumb> -->
      <Navifation></Navifation>
      <router-view class="main"></router-view>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import Breadcrumb from './Breadcrumb.vue'
import Navifation from './Navifation.vue'
import Slider from './Slider.vue'

export default {
  name: 'Layout',
  components: { Header, Breadcrumb, Navifation, Slider }
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  &-box {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    .main {
      width: 100%;
      height: calc(100% - 100px);
      background-color: $bgColor;
      padding: 15px;
    }
  }
}
</style>
