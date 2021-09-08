<!--
  系统中的公共弹框组件       zls-2021/9/4
      Attributes
          1、title          弹框标题名称
          2、btns           操作按钮数组
          其他所有属性请参照 Popup.vue 公共组件

          参数解析==》
              1、btns操作按钮数组
                  [
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

      Events
          1、close          关闭弹框函数

      Demo==>
          <jy-modal :title="'弹框标题'" :show="show" :width="500" :height="300" @close="show = false" @cancel="show = false" @sure="sure">
            <div class="modal-content">
              <div style="height: 1500px">请开始你的表演</div>
            </div>
          </jy-modal>

          data() {
            return {
              show: false
            }
          },
          methods: {
            sure(eventName) {
              console.log('--事件名--',eventName)
            }
          }
-->
<template>
  <div class="z-modal">
    <z-popup :position="'center'" :show="$attrs.show" :width="$attrs.width" :height="$attrs.height" :round="$attrs.round" :zIndex="$attrs.zIndex" @close="close">
      <div class="z-modal-main">
        <div class="z-modal-main-title">
          <span>{{ title }}</span>
          <i class="close" @click.stop="close"></i>
        </div>
        <div class="z-modal-main-content scrollbar">
          <slot></slot>
        </div>
        <ul class="z-modal-main-btn" v-if="btns.length">
          <li v-for="(btnItem, btnI) in btns" :key="btnI" class="btnRipple" @click="btnClick(btnItem.event)" :style="{ backgroundColor: btnItem.bgColor, color: btnItem.color }">
            {{ btnItem.text }}
          </li>
        </ul>
      </div>
    </z-popup>
  </div>
</template>

<script>
import Popup from '@components/Popup.vue'
export default {
  name: 'z-modal',
  components: {
    'z-popup': Popup
  },
  props: {
    title: {
      type: String,
      default: ''
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
      this.$emit('close')
    },

    btnClick(val) {
      this.$emit(val)
    }
  }
}
</script>

<style scoped lang="scss">
.z-modal {
  &-main {
    width: 100%;
    height: 100%;
    &-title {
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
      overflow: auto;
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
