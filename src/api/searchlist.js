import request from '@/utils/request'

// 关键词搜索
export const SearchKey = (goodsName, categoryId) => {
  return request.get('/goods/list', {
    params: {
      goodsName: goodsName,
      categoryId: categoryId
    }
  })
}
