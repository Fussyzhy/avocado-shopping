import { delCart, getCart, updateCart } from '@/api/cart'

export default ({
  namespaced: true,
  getters: {
    selList (state) {
      return state.cartlist.filter(item => item.checked === true)
    },
    selCount (state, getters) {
      return getters.selList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    selPrice (state, getters) {
      return getters.selList.reduce((sum, item) => sum + (item.goods_num * item.goods.goods_price_min), 0)
    }
  },
  state () {
    return {
      cartlist: [],
      cartTotal: ''
    }
  },
  mutations: {
    setCart (state, newdata) {
      state.cartlist = newdata.list
      state.cartTotal = newdata.cartTotal
    },
    changeCount (state, newdata) {
      state.cartlist.forEach(item => {
        if (item.goods_id === newdata.id) {
          console.log('item.goods_num', item.goods_num)
          console.log('newdata.value', newdata.value)
          state.cartTotal = state.cartTotal - item.goods_num + newdata.value
          item.goods_num = newdata.value
        }
      })
    }
  },
  actions: {
    async getCartAction (context) {
      try {
      // 调用 getCart API，并等待结果
        const res = await getCart()

        // 检查响应数据是否存在且 list 是一个数组
        if (res.data && Array.isArray(res.data.list)) {
        // 在这里，您可以安全地访问 res.data.list
          console.log('Cart list:', res.data.list)

          res.data.list.forEach(item => {
            item.checked = false
          })

          // 提交 mutation
          context.commit('setCart', res.data)
        } else {
        // 处理数据格式不正确的情况
          console.error('Invalid data format:', res.data)
        }
      } catch (error) {
      // 处理 API 调用错误
        console.error('Error fetching cart:', error)
      }
    },
    async updateAction (context, obj) {
      const res = await updateCart(obj.id, obj.value, obj.skuid)
      console.log(res)
      context.commit('changeCount', obj)
    },
    async delAction (context, obj) {
      const res = await delCart(obj.cartIds)
      console.log(res)
    }

  }

})
