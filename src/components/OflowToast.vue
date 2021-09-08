<!--
  单行溢出提示组件（若文本未溢出，则不会出现提示信息）    zls-2021/8/4
      Attributes
          1、text           文字内容（必传）,默认为''
          2、width          文本内容的宽度，默认为'100%'
          3、height         文本内容的高度，默认为'100%'
          4、fontSize       文本内容大小，默认为14
          5、fontWeight     文本内容粗细，默认为400
          6、color          文本内容颜色，默认为'#fff'
          7、letterSpacing  文本内容的文字间隔，默认为0
          8、tipWidth       tip提示框的宽度，默认为'100%'
          9、placement      tip提示框出现的方向(left、top、right、bottom)，默认为 'bottom'
          10、offset        tip提示框的偏移量，默认为10
          11、trigger       tip提示框的触发方式(hover、click)，默认为'hover'

      Slot
          当开发者需要在 tip提示框中 添加 文本内容外 额外的内容，可以使用slot

      案例==>
          <Tip :text="'你的多字写的也太多了吧，我真的是装不下了，要不在tip提示框中查看呗~'" :width="200"></Tip>

-->
<template>
  <div class="z-oflowToast" :style="[overflowPromptStyle]" ref="overflowPrompt" @click.stop="clickText" @mouseover.stop="enterText" @mouseout.stop="leaveText">
    <u :style="[textStyle]">{{ text }}</u>
    <em :style="[textStyle]" ref="textRef">{{ text }}</em>
    <div :style="[tipStyle]" class="tipClass scrollbar">
      <span>{{ text }}</span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'z-oflowToast',
  props: {
    // 文字内容
    text: {
      type: String | Number,
      default: ''
    },
    // 文本的宽度，默认为100%
    width: {
      type: String | Number,
      default: '100%'
    },
    // 文本的高度，默认为100%
    height: {
      type: String | Number,
      default: '100%'
    },
    // tip提示框的宽度，默认为100%
    tipWidth: {
      type: String | Number,
      default: '100%'
    },
    // tip提示框出现的方向(left、top、right、bottom)，默认为 bottom
    placement: {
      type: String,
      default: 'bottom'
    },
    // tip提示框的偏移量，默认为10
    offset: {
      type: Number,
      default: 10
    },
    // 触发tip提示框的方式(hover、click)
    trigger: {
      type: String,
      default: 'hover'
    },
    fontSize: {
      type: Number,
      default: 18
    },
    fontWeight: {
      type: String | Number,
      default: 400
    },
    color: {
      type: String,
      default: '#fff'
    },
    letterSpacing: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      boxWidth: 0, // 容器的宽度
      boxHeight: 0, // 容器的高度
      textWidth: 0, // 原始文本的总长度
      showTip: false, // 是否显示tip
      clickCount: 0, // 判断点击的是单击还是双击
      tags: ['U', 'P', 'SPAN', 'UL', 'LI', 'OL', 'I', 'IMG', 'DIV'] // 滑入滑出可触发的标签
    }
  },
  computed: {
    // 整个盒子的样式
    overflowPromptStyle() {
      const { width, height } = this
      const obj = {}
      obj.width = typeof width === 'string' ? width : width + 'px'
      obj.height = typeof height === 'string' ? height : height + 'px'
      return obj
    },
    // 文本内容的样式
    textStyle() {
      const { fontSize, fontWeight, color, letterSpacing, textWidth, boxWidth } = this
      const obj = {}
      obj.fontSize = fontSize + 'px'
      obj.fontWeight = fontWeight
      obj.color = color
      obj.letterSpacing = letterSpacing
      obj.cursor = textWidth > boxWidth ? 'pointer' : 'auto'
      return obj
    },
    // 提示框的样式
    tipStyle() {
      const { placement, offset, boxWidth, boxHeight, tipWidth, textWidth, showTip } = this
      const obj = {}
      obj.width = typeof tipWidth === 'string' ? tipWidth : tipWidth + 'px'
      if (placement === 'left') {
        obj.top = 0
        obj.right = boxWidth + offset + 'px'
      } else if (placement === 'top') {
        obj.bottom = boxHeight + offset + 'px'
      } else if (placement === 'right') {
        obj.top = 0
        obj.left = boxWidth + offset + 'px'
      } else {
        obj.top = boxHeight + offset + 'px'
      }
      if (textWidth > boxWidth && showTip) {
        obj.visibility = 'visible'
        obj.opacity = 1
        obj.transition = 'visibility 0.6s,opacity 0.6s'
      } else {
        obj.visibility = 'hidden'
        obj.opacity = 0
        obj.transition = 'visibility 0.6s,opacity 0.6s'
      }
      return obj
    }
  },
  mounted() {
    this.boxWidth = this.$refs.overflowPrompt.offsetWidth
    this.boxHeight = this.$refs.overflowPrompt.offsetHeight
    this.textWidth = this.$refs.textRef.offsetWidth
  },
  methods: {
    // 点击事件
    clickText(e) {
      if (this.trigger !== 'click') return
      if (e.target.tagName === 'U') {
        this.clickCount++
        this.showTip = true
        if (this.clickCount % 2 === 0) {
          this.showTip = false
        }
      }
    },
    // 滑入文本事件
    enterText(e) {
      if (this.trigger !== 'hover') return
      const tagName = e.target.tagName
      this.showTip = !!this.tags.includes(tagName)
    },
    // 滑出文本事件
    leaveText(e) {
      if (this.trigger === 'click') return
      const tagName = e.target.tagName
      this.showTip = !this.tags.includes(tagName)
    }
  }
}
</script>

<style lang="scss" scoped>
.z-oflowToast {
  flex: 1;
  position: relative;
  > u {
    width: 100%;
    text-decoration: initial;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.5;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  > em {
    position: absolute;
    z-index: -9999;
    left: 10000px;
    font-style: normal;
    white-space: nowrap;
  }
  > div {
    position: absolute;
    z-index: 999;
    background: $color;
    border: 1px solid #0eb3e3;
    color: #fff;
    font-size: 14px;
    font-weight: 100;
    border-radius: 5px;
    padding: 6px;
    letter-spacing: 1px;
    line-height: 20px;
    max-height: 600px;
    overflow-y: auto;
    > span {
      color: #fff;
    }
  }
}
</style>
