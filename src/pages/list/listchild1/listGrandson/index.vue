<template>
  <div class="listGrandson">
    <div class="listGrandson-box">
      <div class="permission" v-permission>测试按钮级别的权限指令</div>
      <div class="jumpListChild2" @click="goListChild2">点击跳转至 列表儿子页 2</div>
      <div class="throttle" v-throttle="btnFn">点击按钮时，使用节流指令</div>
      <div class="debounce">
        <el-input v-model="inputValue" placeholder="输入文本时，使用防抖指令" clearable v-debounce="inputFn" />
      </div>
      <div class="modalAlert" @click="show = true">点我显示自定义弹框</div>
      <ul class="text-flow">
        <li v-for="(item, index) in testArr" :key="index">
          <span>{{ item.label }}</span>
          <jy-oflowToast :text="item.value" :font-size="14" :color="'#999'"></jy-oflowToast>
        </li>
      </ul>
      <div class="waterMarker" v-waterMarker>使用添加水印指令</div>
    </div>

    <!-- 自定义弹框 -->
    <jy-modal :title="'弹框标题'" :show="show" :width="500" :height="300" @close="show = false" @cancel="show = false" @sure="sure">
      <div class="modal-content">
        <div style="height: 1500px">显示我干嘛</div>
      </div>
    </jy-modal>
  </div>
</template>

<script>
export default {
  name: 'ListGrandson',
  data() {
    return {
      inputValue: '',
      show: false,
      testArr: [
        { label: '文本不够长的情况：', value: '太短了' },
        { label: '文本足够长的情况：', value: '你的多字写的也太多了吧，我真的是装不下了，要不在tip提示框中查看呗~' }
      ]
    }
  },
  methods: {
    goListChild2() {
      this.$router.push({
        name: 'Listchild2',
        params: { val: '传递的数据' }
      })
    },
    inputFn() {
      console.log('--防抖--', this.inputValue)
    },
    btnFn() {
      console.log('--节流--')
    },
    sure() {
      console.log('--点击了确定按钮--')
    }
  }
}
</script>

<style lang="scss" scoped>
.listGrandson {
  &-box {
    height: 100%;
    .permission {
      width: 300px;
      height: 40px;
      line-height: 40px;
      background-color: #6bad2e;
      border-radius: 4px;
      text-align: center;
      margin-bottom: 10px;
      font-size: 18px;
      color: #fff;
    }
    .jumpListChild2,
    .throttle,
    .modalAlert {
      background-color: #2cab9f;
      width: 300px;
      height: 40px;
      line-height: 40px;
      border-radius: 5px;
      text-align: center;
      color: #fff;
      font-size: 16px;
      margin: 10px 0;
      cursor: pointer;
      user-select: none;
    }
    .throttle {
      background-color: #2d8282;
    }
    .modalAlert {
      background-color: #45afaf;
    }
    .debounce {
      width: 300px;
      margin: 10px 0;
    }
    .waterMarker {
      width: 300px;
      height: 300px;
      background-color: #f2f2f2;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 26px;
    }
    .text-flow {
      > li {
        width: 300px;
        height: 40px;
        @include flex(center);
      }
    }
  }
}
</style>
