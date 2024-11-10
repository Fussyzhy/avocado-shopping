import request from '@/utils/request'

// 获取商品细节
export const getdetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId: goodsId
    }
  })
}

// 获取商品评价
export const getcomment = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId: goodsId,
      limit: limit
    }
  })
}
