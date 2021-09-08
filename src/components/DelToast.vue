<!--
  系统中的公共弹框组件       zls-2021/9/4
       Attributes
          1、title          弹框标题名称
          2、text           提示内容
          3、btns           操作按钮数组
          其他所有属性请参照 Popup.vue 公共组件

      Demo==>
          <jy-delToast @sure="deleteFn">
            <div class="delete">删除</div>
          </jy-delToast>
-->
<template>
  <div class="z-delToast">
    <z-popup :position="'center'" :show="show" :width="$attrs.width || 400" :height="$attrs.height || 150" :round="$attrs.round" :zIndex="$attrs.zIndex" @close="close">
      <div class="z-delToast-main">
        <div class="z-modal-main-title">
          <span>{{ title }}</span>
          <i class="close" @click.stop="close"></i>
        </div>
        <div class="z-delToast-main-content scrollbar">{{ text }}</div>
        <ul class="z-delToast-main-btn" v-if="btns.length">
          <li v-for="(btnItem, btnI) in btns" :key="btnI" class="btnRipple" @click="btnClick(btnItem.event)" :style="{ backgroundColor: btnItem.bgColor, color: btnItem.color }">
            {{ btnItem.text }}
          </li>
        </ul>
      </div>
    </z-popup>
    <div @click.stop="show = true" style="cursor: pointer; display: flex">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Popup from '@components/Popup.vue'
export default {
  name: 'z-delToast',
  components: {
    'z-popup': Popup
  },
  props: {
    title: {
      type: String,
      default: '提示'
    },
    text: {
      type: String,
      default: '确定删除该项吗?'
    },
    btns: {
      type: Array,
      default: () => [
        {
          text: '取消',
          type: 1,
          event: 'cancel'
        },
        {
          text: '确定',
          type: 2,
          event: 'sure'
        }
      ]
    }
  },
  data() {
    return {
      show: false
    }
  },
  inheritAttrs: false,
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.btns.length) {
        this.btns.forEach(v => {
          v.bgColor = v.type == 1 ? '#9da2a2' : v.type == 2 ? '#2f84a6' : ''
          v.color = v.type == 1 ? '#fff' : v.type == 2 ? '#fff' : ''
        })
      }
    },

    close() {
      this.show = false
      this.$emit('close')
    },

    btnClick(val) {
      this.show = false
      this.$emit(val)
    }
  }
}
</script>

<style scoped lang="scss">
.z-delToast {
  &-main {
    width: 100%;
    height: 100%;
    .z-modal-main-title {
      height: 50px;
      text-align: center;
      line-height: 50px;
      position: relative;
      cursor: grabbing;
      > span {
        font-size: 20px;
        user-select: none;
      }
      .close {
        position: absolute;
        right: 0;
        top: 13px;
        width: 24px;
        height: 24px;
        cursor: pointer;
      }
      .close::before,
      .close::after {
        position: absolute;
        content: ' ';
        height: 24px;
        width: 2px;
        border-radius: 2px;
        background-color: #666;
      }
      .close::before {
        transform: rotate(45deg);
      }
      .close::after {
        transform: rotate(-45deg);
      }
    }
    &-content {
      width: 100%;
      height: calc(100% - 80px);
      font-size: 18px;
      line-height: 24px;
      letter-spacing: 2px;
      @include flex(center, center);
      overflow-y: auto;
    }
    &-btn {
      position: absolute;
      bottom: -25px;
      left: 50%;
      transform: translateX(-50%);
      @include flex(center, center);
      > li {
        width: 100px;
        height: 40px;
        margin: 0 10px;
        font-size: 18px;
        font-weight: 900;
        letter-spacing: 4px;
        border-radius: 3px;
        cursor: pointer;
        user-select: none;
        @include flex(center, center);
        transform: rotate(5deg);
      }
    }
  }
}
</style>
