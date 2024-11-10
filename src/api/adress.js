import request from '@/utils/request'

// 获取地址列表
export const getAdress = () => {
  return request.get('/address/list')
}

// 添加地址
export const addAdress = () => {
  return request.post('/address/add', {
    form: {
      name: '张昊阳',
      phone: '13365113887',
      region: [
        {
          value: 782,
          label: '江苏省'
        },
        {
          value: 783,
          label: '扬州市'
        },
        {
          value: 785,
          label: '仪征市'
        }
      ],
      detail: '城中花园北苑'
    }
  })
}
