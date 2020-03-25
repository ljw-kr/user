import request from '@/utils/request'
export function register (data) {
  return request({
    url: '/fwdj/register/customer',
    method: 'post',
    params: {
      customerMail: data.mail,
      customerName: data.name,
      customerPassword: data.psd,
      code: data.code
    }
  })
}
export function userLogin (data) {
  return request({
    url: '/fwdj/user/login/customer',
    method: 'get',
    params: {
      mail: data.mail,
      password: data.psd
    }
  })
}
export function getCode (_email) {
  return request({
    url: '/fwdj/utils/code',
    method: 'get',
    params: {
      email: _email
    }
  })
}
export function changePsd (data) {
  return request({
    url: '/fwdj/user/password/customer',
    method: 'post',
    params: {
      mail: data.mail,
      password: data.password,
      code: data.code
    }
  })
}
export function logOut () {
  return request({
    url: '/fwdj/user/logout',
    method: 'get'
  })
}
export function getUserInfo (data) {
  return request({
    url: '/fwdj/customer/info',
    method: 'get',
    params: {
      id: data
    }
  })
}
