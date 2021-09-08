<!--
  弹出框组件   zls-2021/8/5
      Attributes
          1、show             是否显示弹框（默认false不显示）
          2、position         弹出方向left、top、right、bottom、center（默认从中间弹出center）
          3、width            宽度(仅在position值为'center'时生效，一般情况下无需设置)
          4、height           高度(仅在position值为'center'时生效，一般情况下无需设置)
          5、round            是否为圆角（默认是true）
          6、zIndex           显示层级(默认为99，一般情况下不会使用，只有弹框里嵌套弹框时，才需要传递)

      Events
          1、close            关闭弹框函数
          
      Slot
          开发者自定义内容，必填项

      Demo==>
          <jy-popup :show="show" @close="show = false">
            <div class="popup-content">
              <div>请开始你的表演</div>
            </div>
          </jy-popup>
-->
<template>
  <div class="z-popup">
    <z-mask :show="show" :zIndex="zIndex - 1" @close="close"></z-mask>
    <div :class="['scrollbar', 'z-popup-content', popupClass, { show: show }]" :style="[popupStyle]" v-dragModal>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Mask from '@components/Mask.vue'
export default {
  name: 'z-popup',
  components: {
    'z-mask': Mask
  },
  props: {
    // 是否显示弹框（默认不显示）
    show: {
      type: Boolean,
      default: false
    },
    // 弹出方向（默认从中间弹出）
    position: {
      type: String,
      default: 'center'
    },
    // 宽度(仅在position值为'center'时生效，一般情况下无需设置)
    width: {
      type: String | Number,
      default: 'auto'
    },
    // 高度(仅在position值为'center'时生效，一般情况下无需设置)
    height: {
      type: String | Number,
      default: 'auto'
    },
    // 是否为圆角（默认是）
    round: {
      type: Boolean,
      default: true
    },
    // 显示层级(默认为99，一般情况下不会使用，只有弹框里嵌套弹框时，才需要传递)
    zIndex: {
      type: Number,
      default: 9
    }
  },
  data() {
    return {
      roundObj: {
        left: {
          'border-top-right-radius': '5px',
          'border-bottom-right-radius': '5px'
        },
        right: {
          'border-top-left-radius': '5px',
          'border-bottom-left-radius': '5px'
        },
        bottom: {
          'border-top-left-radius': '5px',
          'border-top-right-radius': '5px'
        },
        top: {
          'border-bottom-right-radius': '5px',
          'border-bottom-left-radius': '5px'
        },
        center: {
          'border-radius': '5px'
        }
      }
    }
  },
  directives: {
    /*
      当popup弹框组件的slot插槽内容从中间弹出 且 类名为z-modal-main-title，即可有拖拽效果！！！
    */
    dragModal: {
      bind(el, binding, vnode) {
        let _this = vnode.context // 自定义指令中获取this
        if (_this.position !== 'center') return
        const titleEl = el.querySelector('.z-modal-main-title')
        if (!titleEl) return
        titleEl.onmousedown = e => {
          const disX = e.clientX - el.offsetLeft
          const disY = e.clientY - el.offsetTop
          document.onmousemove = e => {
            let L = e.clientX - disX
            const T = e.clientY - disY
            if (binding.modifiers.limit) {
              if (L < 0) {
                L = 0
              }
            }
            el.style.left = L + 'px'
            el.style.top = T + 'px'
          }
          titleEl.onmouseup = () => {
            document.onmousemove = null
          }
        }
      }
    }
  },
  computed: {
    // 根据弹出方向，添加弹框出现的类名
    popupClass() {
      return 'z-popup-content-' + this.position
    },

    // 根据弹出方向，添加弹框最终出现的样式
    popupStyle() {
      const { show, position, round, roundObj, zIndex, width, height } = this
      let obj = {}
      if (show) {
        obj = round ? roundObj[position] : { 'border-radius': 0 } // 判断是否添加圆角
        obj['z-index'] = zIndex
        if (position === 'center') {
          obj.opacity = 1
          obj.visibility = 'visible'
          obj.width = typeof width === 'number' ? width + 'px' : width
          obj.height = typeof height === 'number' ? height + 'px' : height
        } else {
          obj.transform = 'translate(0, 0)'
        }
      } else {
        if (position === 'center') {
          obj.opacity = 0
          obj.visibility = 'hidden'
          obj.width = typeof width === 'number' ? width + 'px' : width
          obj.height = typeof height === 'number' ? height + 'px' : height
        }
      }
      return obj
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
.z-popup {
  &-content {
    position: fixed;
    background: #fff;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
    // overflow-y: auto;
  }
  // 从左边弹出
  &-content-left {
    min-width: 5%;
    max-width: 80%;
    height: 100%;
    left: 0;
    top: 0;
    transform: translate(-100%, 0);
  }
  // 从右边弹出
  &-content-right {
    min-width: 5%;
    max-width: 80%;
    height: 100%;
    right: 0;
    top: 0;
    transform: translate(100%, 0);
  }
  // 从下边弹出
  &-content-bottom {
    width: 100%;
    min-height: 20%;
    max-height: 80%;
    left: 0;
    bottom: 0;
    transform: translate(0, 100%);
  }
  // 从上边弹出
  &-content-top {
    width: 100%;
    min-height: 20%;
    max-height: 80%;
    left: 0;
    top: 0;
    transform: translate(0, -100%);
  }
  // 从中间弹出
  &-content-center {
    max-width: 80%;
    min-height: 15%;
    max-height: 80%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    visibility: hidden;
  }
}
</style>
