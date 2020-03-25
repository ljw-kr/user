import request from '@/utils/request'
export function getMessage (_id) {
  return request({
    url: '/fwdj/customer/info',
    method: 'get',
    params: {
      id: _id
    }
  })
}
