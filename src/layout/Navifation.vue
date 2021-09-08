<!--
 * @描述信息:  快捷导航
 * @Author:   zls
-->
<template>
  <div class="navifation">
    <el-tabs type="card" v-model="navigationPath" @tab-remove="removeTab" @tab-click="tabClick">
      <el-tab-pane v-for="item in navigationArr" :key="item.name" :label="item.label" :name="item.name" closable></el-tab-pane>
    </el-tabs>
    <div class="custom-contextmenu-box">
      <jy-mask :show="showContextmenu" :bgColor="'rgba(0,0,0,0)'" @close="showContextmenu = false"></jy-mask>
      <ul class="custom-contextmenu" v-show="showContextmenu">
        <li v-for="(item, i) in contextmenuArr" :key="i" @click="contextmenuClick(item.event)">{{ item.text }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Mask from '@components/Mask.vue'
export default {
  name: 'Navifation',
  components: {
    'jy-mask': Mask
  },
  data() {
    return {
      navigationPath: '/layOut/home', // 当前路径
      navigationArr: [], // 导航列表
      contextmenuArr: [
        { text: '重新加载', event: 'relaod' },
        { text: '关闭所有', event: 'closeAll' },
        { text: '关闭左侧', event: 'closeLeft' },
        { text: '关闭右侧', event: 'closeRight' },
        { text: '关闭其他', event: 'closeOthers' }
      ], // 自定义右侧菜单数据
      showContextmenu: false, // 是否显示右侧菜单
      savePath: '' // 保存右侧菜单选中的导航栏路径
    }
  },
  mounted() {
    this.navigationArr = this.$store.state.user.navigationRoutes
    this.navigationArr.forEach(v => {
      if (v.flag) this.navigationPath = v.name
    })

    // 获取DOM，用于自定义右键菜单
    let itemDom = document.getElementsByClassName('el-tabs__header is-top')
    itemDom[0].oncontextmenu = this.openMenu
  },
  methods: {
    // 移除当前导航( 并设置当前选中状态，存储在vuex中 )
    removeTab(targetName) {
      let arr = this.$store.state.user.navigationRoutes
      if (this.navigationPath === targetName) {
        arr.forEach((v, i) => {
          if (v.name === targetName) {
            let nextTab = arr[i + 1] || arr[i - 1]
            if (nextTab) this.navigationPath = nextTab.name
          }
        })
      }
      const arrNew = []
      arr.forEach(v => {
        this.$set(v, 'flag', false)
        if (this.navigationPath === v.name) this.$set(v, 'flag', true)
        if (targetName !== v.name) arrNew.push(v)
      })
      this.$store.commit('user/SET_NAVIGATIONROUTES', arrNew)
      this.navigationArr = this.$store.state.user.navigationRoutes
      this.$router.push(this.navigationPath)
    },

    // 点击当前导航，跳转
    tabClick(item) {
      this.navigationPath = item.name
      this.navigationArr.forEach(v => {
        this.$set(v, 'flag', false)
        if (this.navigationPath === v.name) this.$set(v, 'flag', true)
      })
      this.$store.commit('user/SET_NAVIGATIONROUTES', this.navigationArr)
      this.$router.push(this.navigationPath)
    },

    // 自定义右侧菜单
    openMenu(e) {
      e.preventDefault()
      this.savePath = ''
      let obj = e.srcElement || e.target
      if (!obj.id) {
        this.showContextmenu = false
      } else {
        this.savePath = obj.id.split('-')[1]
        let elTabsContent = document.getElementsByClassName('custom-contextmenu')
        elTabsContent[0].style.left = e.clientX + 'px'
        this.showContextmenu = true
      }
    },

    // 右侧菜单事件
    contextmenuClick(event) {
      this[event]()
      this.showContextmenu = false
    },

    // 重新加载
    relaod() {
      if (this.navigationPath === this.savePath) {
        this.$router.go(0)
      } else {
        this.navigationPath = this.savePath
        this.navigationArr.forEach(v => {
          this.$set(v, 'flag', false)
          if (this.navigationPath === v.name) this.$set(v, 'flag', true)
        })
        this.$store.commit('user/SET_NAVIGATIONROUTES', this.navigationArr)
        this.$router.push(this.navigationPath)
        setTimeout(() => {
          this.$router.go(0)
        }, 10)
      }
    },

    // 关闭所有
    closeAll() {
      this.$store.commit('user/SET_NAVIGATIONROUTES', [{ label: '主页', name: '/layOut/home', flag: true }])
      this.navigationArr = this.$store.state.user.navigationRoutes
      this.navigationPath = '/layOut/home'
      this.$router.push('/layOut')
    },

    // 关闭左侧
    closeLeft() {
      let index = this.navigationArr.findIndex(item => item.name === this.savePath)
      if (index === 0 || index === 1) return
      this.navigationPath = this.savePath
      this.navigationArr.splice(1, index - 1)
      this.navigationArr.forEach(v => {
        this.$set(v, 'flag', false)
        if (this.navigationPath === v.name) this.$set(v, 'flag', true)
      })
      this.$store.commit('user/SET_NAVIGATIONROUTES', this.navigationArr)
      this.$router.push(this.navigationPath)
    },

    // 关闭右侧
    closeRight() {
      let index = this.navigationArr.findIndex(item => item.name === this.savePath)
      if (index === length - 1) return
      let length = this.navigationArr.length
      this.navigationPath = this.savePath
      this.navigationArr.splice(index + 1)
      this.navigationArr.forEach(v => {
        this.$set(v, 'flag', false)
        if (this.navigationPath === v.name) this.$set(v, 'flag', true)
      })
      this.$store.commit('user/SET_NAVIGATIONROUTES', this.navigationArr)
      this.$router.push(this.navigationPath)
    },

    // 关闭其他
    closeOthers() {
      let obj = this.navigationArr.find(item => item.name === this.savePath)
      obj.flag = true
      let arr = []
      if (obj.name === '/layOut/home') {
        arr.push(obj)
      } else {
        arr = [{ label: '主页', name: '/layOut/home', flag: false }, obj]
      }
      this.$store.commit('user/SET_NAVIGATIONROUTES', arr)
      this.navigationArr = arr
      this.navigationPath = this.savePath
      this.$router.push(this.navigationPath)
    }
  },
  watch: {
    // 监听导航，无则添加，反之不添加
    $route(newVal) {
      this.navigationPath = newVal.path
      let index = this.navigationArr.findIndex(item => item.name === newVal.path)
      let arr = []
      if (index !== -1) {
        this.navigationArr.forEach(v => {
          this.$set(v, 'flag', false)
          if (this.navigationPath === v.name) this.$set(v, 'flag', true)
        })
        arr = this.navigationArr
      } else {
        let obj = {
          label: newVal.meta.title,
          name: newVal.path,
          flag: true
        }
        this.navigationArr.forEach(v => this.$set(v, 'flag', false))
        arr = [...this.navigationArr, obj]
      }
      this.$store.commit('user/SET_NAVIGATIONROUTES', arr)
      this.navigationArr = this.$store.state.user.navigationRoutes
    }
  }
}
</script>

<style lang="scss" scoped>
.navifation {
  height: 50px;
  display: flex;
  align-items: center;
  position: relative;
  background-color: $bgColor;
  /deep/.el-tabs__header {
    border-bottom: 0 !important;
    margin: 0;
    .el-tabs__nav {
      border: 0;
    }
    .el-tabs__item {
      margin: 0 5px;
      border: 1px solid $border;
      color: #758ba1;
      border-radius: 5px;
      height: 32px;
      line-height: 32px;
      &:hover,
      &.is-active {
        background-color: $color;
        color: #fff;
        .el-icon-close {
          color: #fff;
        }
      }
    }
    // 导航第一项不允许删除
    .el-tabs__item:first-child > span {
      display: none;
    }
    .el-tabs__item:first-child:hover > span {
      display: none;
    }
  }
  .custom-contextmenu-box {
    .custom-contextmenu {
      position: fixed;
      z-index: 9;
      left: 0;
      top: 100px;
      background-color: #63959d;
      border-radius: 4px;
      padding: 10px 15px;
      > li {
        height: 30px;
        color: #fff;
        @include flex(center, center);
        cursor: pointer;
        border-bottom: 1px dashed #fff;
      }
      > li:hover {
        color: #9befff;
      }
    }
  }
}
</style>
