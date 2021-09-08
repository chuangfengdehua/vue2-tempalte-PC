<!--
 * @描述信息: 登录页
 * @Author:  zls
-->
<template>
  <div class="login">
    <jy-form size="medium" ref="formRef" :model="formObj"></jy-form>
    <div class="login btnRipple" @click="login">登录</div>
  </div>
</template>

<script>
import { resetRouter } from '@/router'
export default {
  name: 'Login',
  data() {
    var checkName = (rule, value, callback) => {
      if (!this.$reg.name.regExp.test(value)) {
        callback(new Error(this.$reg.name.error))
      } else {
        callback()
      }
    }
    var checkCode = (rule, value, callback) => {
      if (!this.$reg.name.regExp.test(value)) {
        callback(new Error(this.$reg.name.error))
      } else {
        callback()
      }
    }
    return {
      formObj: {
        list: [
          {
            way: 'input',
            type: 'input',
            label: '账号:',
            prop: 'name',
            name: '',
            span: 24,
            rules: {
              name: [{ validator: checkName, trigger: 'blur' }]
            }
          },
          {
            way: 'password',
            type: 'password',
            label: '密码:',
            prop: 'pwd',
            pwd: '',
            span: 24,
            'show-password': true,
            rules: {
              pwd: [{ validator: checkCode, trigger: 'blur' }]
            }
          }
        ]
      }
    }
  },
  methods: {
    // 模拟后台登录接口
    login() {
      this.$refs.formRef.submit(obj => {
        console.log('--提交的表单数据--', obj)
        setTimeout(() => {
          resetRouter()
          this.$store.commit('user/SET_TOKEN', '****token****')
          this.$store.commit('user/SET_USERINFOR', { name: '张三', age: '18', uid: '12', role: 'user2' })
          this.$router.push('/layout')
        }, 500)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: $color;
  @include flex(center, center, column);
  /deep/.el-form {
    width: 400px;
    .el-form-item__label {
      color: #fff;
      font-size: 18px;
    }
  }
  .login {
    width: 280px;
    height: 40px;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    margin-left: 100px;
    background-color: #31b5c2;
    cursor: pointer;
  }
}
</style>
