import vue from 'vue'
import vuex from 'vuex'
// 使用vuex
vue.use(vuex)
// 数据状态
const state = {
  // count:0
  //   sessionStorage与vuex结合使用
  // user:(sessionStorage.getItem('user'))?parseInt(sessionStorage.getItem('user')):'',
  // pwd:(sessionStorage.getItem('pwd'))?parseInt(sessionStorage.getItem('pwd')):''
}
// 获得state里面的值
const getters = {
  count (state) {
    return state.count
  }
}
// 行为，要执行的操作，如流程，异步操作
const actions = {
  add ({ commit }) {
    commit('increment')
  },
  sub ({ commit }) {
    commit('decrement')
  }
}
// 更改
const mutations = {
  increment (state) {
    // 注意mutations中方法的名字与actions中提交
    // 的名字一致
    state.count++
    sessionStorage.setItem('count', state.count)
  },
  decrement (state) {
    state.count--
    sessionStorage.setItem('count', state.count)
  }
}
// 创建仓库并暴露出去
export default new vuex.Store({
  state,
  getters,
  actions,
  mutations
})
