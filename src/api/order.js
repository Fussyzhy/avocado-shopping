import request from '@/utils/request'

// 加入订单结算界面
export const addOrder = (mode, obj) => {
  return request.post('/checkout/order', {
    mode,
    delivery: 10,
    shopId: 0,
    couponId: 0,
    ...obj
  })
}

// 订单页面详情
export const checkOrder = (orderId) => {
  return request.get('/order/detail', {
    params: {
      orderId
    }
  })
}
