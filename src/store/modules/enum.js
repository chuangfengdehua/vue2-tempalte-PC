/*
  存放所有枚举值信息
      渲染列表使用方式 ==》 this.$set(v,'sexName',this.$store.state.enum.sex.find(item => item.code === v.sex)?.name || '')
      表单使用方式    ==》  let sexArr = this.$store.state.enum.sex;
*/
const state = {
  // 性别
  sex: [
    { code: 0, name: '男' },
    { code: 1, name: '女' }
  ],
  // 角色类型
  role: []
}

const mutations = {
  // 添加角色类型
  SET_ROLE: (state, arr) => {
    state.role = arr
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
