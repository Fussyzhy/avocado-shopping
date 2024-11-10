import request from '@/utils/request'

export const gethomedata = () => {
  return request.get('/page/detail', {
    params: {
      pageId: '0'
    }
  })
}
