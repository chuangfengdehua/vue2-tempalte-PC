<!--
  遮罩层组件     zls-2021/8/25
-->

<template>
  <div class="mask" :class="[maskShow]" :style="[maskStyle]" @click="close" @contextmenu.prevent=""></div>
</template>

<script>
export default {
  props: {
    // 是否显示蒙层（默认不显示）
    show: {
      type: Boolean,
      default: false
    },
    // 蒙层的背景色
    bgColor: {
      type: String,
      default: 'rgba(0,0,0,.5)'
    },
    // 蒙层距离上方的top值(正常传Number类型。String传的是百分比)
    top: {
      type: Number | String,
      default: 0
    },
    // 蒙层距离下方的bottom值(正常传Number类型。String传的是百分比)
    bottom: {
      type: Number | String,
      default: 0
    },
    // 遮罩高度(正常传Number类型。String传的是百分比)
    height: {
      type: Number | String,
      default: 'auto'
    }
  },
  computed: {
    maskShow() {
      return this.show ? 'show' : ''
    },
    maskStyle() {
      return {
        backgroundColor: this.bgColor,
        top: this.top === 'number' ? this.top + 'px' : this.top,
        bottom: typeof this.bottom === 'number' ? this.bottom + 'px' : this.bottom,
        height: typeof this.height === 'number' ? this.height + 'px' : this.height
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
.mask {
  position: fixed;
  z-index: 8;
  left: 8000px;
  top: 0;
  width: 100%;
  margin: auto;
  &.show {
    left: 0;
  }
}
</style>
