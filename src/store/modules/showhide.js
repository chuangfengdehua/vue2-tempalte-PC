const state = {
  isCollapse: false // 控制页面左侧slider的展开与收起(默认是展开的)
}

const mutations = {
  SET_ISCOLLAPSE: (state, str) => {
    state.isCollapse = str
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
