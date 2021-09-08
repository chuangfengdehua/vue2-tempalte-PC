<!--
  svg组件     zls-2021/8/23
      Attributes
          name     本地svg名称(不包含后缀) / 网络路径
          
      Demo==> 
          <svg-icon name="1-screen"></svg-icon>
-->
<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
  <svg v-else class="svg-icon" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternal() {
      return this.isExternalFn(this.name)
    },
    iconName() {
      return `#icon-${this.name}`
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.name}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.name}) no-repeat 50% 50%`
      }
    }
  },
  methods: {
    isExternalFn(path) {
      return /^(https?:|mailto:|tel:)/.test(path)
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
