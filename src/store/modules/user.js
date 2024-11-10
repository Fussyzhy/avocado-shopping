import { getinfo, setinfo } from '@/utils/storage'

export default ({
  namespaced: true,
  state () {
    return {
      userinfo: getinfo()
    }
  },
  getters: {
  },
  mutations: {
    settoken (state, obj) {
      state.userinfo = obj
      setinfo(obj)
    }
  },
  actions: {
  },
  modules: {
  }
})
