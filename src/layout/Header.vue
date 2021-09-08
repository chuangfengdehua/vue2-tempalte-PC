<template>
  <div class="header">
    <div class="expendCollapse" @click="expendCollapseFn">{{ expendCollapseText }}</div>
    <h1>头部</h1>
    <jy-delToast @sure="loginOut">
      <div class="loginOut btnRipple">退出登录</div>
    </jy-delToast>
  </div>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    expendCollapseText() {
      return this.$store.state.showhide.isCollapse ? '展开' : '收起'
    }
  },
  methods: {
    expendCollapseFn() {
      this.$store.commit('showhide/SET_ISCOLLAPSE', !this.$store.state.showhide.isCollapse)
    },

    // 退出登录
    loginOut() {
      setTimeout(() => {
        this.$store.commit('user/SET_TOKEN', '')
        this.$store.commit('user/SET_USERINFOR', {})
        this.$store.commit('user/SET_ROUTES', [])
        this.$store.commit('user/SET_NAVIGATIONROUTES', [{ label: '主页', name: '/layOut/home', flag: true }])
        this.$store.commit('showhide/SET_ISCOLLAPSE', false)
        sessionStorage.setItem('store', '')
        this.$router.push('/login')
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 50px;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  > h1 {
    font-size: 30px;
    text-align: center;
    line-height: 50px;
    font-weight: 900;
  }
  .expendCollapse {
    position: absolute;
    left: 15px;
    top: 5px;
    padding: 10px;
    border-radius: 5px;
    background-color: $color;
    color: #fff;
    font-size: 18px;
    user-select: none;
    cursor: pointer;
  }
  .loginOut {
    position: absolute;
    right: 15px;
    top: 5px;
    padding: 10px;
    border-radius: 5px;
    background-color: #e1f0f5;
    color: #999;
    font-size: 18px;
    user-select: none;
    cursor: pointer;
  }
}
</style>
