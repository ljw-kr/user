import request from '@/utils/request'
// eslint-disable-next-line to ignore the next line.
/* eslint-disable */
// 顾客注册
export function register (data) {
  return request({
    url: '/fwdj/register/customer',
    method: 'post',
    get: {
      customerMail: data.mail,
      customerName: data.name,
      customerPassword: data.psd,
      code: data.code
    }
  })
}
// 顾客登录
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
// 获取验证码
export function getCode (_email) {
  return request({
    url: '/fwdj/utils/code',
    method: 'get',
    params: {
      email: _email
    }
  })
}
// 忘记密码
export function changePsd (data) {
  return request({
    url: '/fwdj/user/password/customer',
    method: 'post',
    get: {
      mail: data.mail,
      password: data.password,
      code: data.code
    }
  })
}
// 退出账号
export function logOut () {
  return request({
    url: '/fwdj/user/logout',
    method: 'get'
  })
}
// 根据用户定位推荐厨师
export function pushChef (data) {
  return request({
    url: '/fwdj/chefinfo/search/area',
    method: 'get',
    params: {
      chefprovince: data.chefprovince,
      chefcity: data.chefcity,
      page: data.page,
      size: data.size
    }
  })
}
// 顾客搜索/筛选厨师
export function searchChief (data) {
  return request({
    url: '/fwdj/chefinfo/search',
    method: 'get',
    params: {
      chefname: data.chefname,
      cheflevel: data.cheflevel,
      chefname: data.chefname,
      chefstatus: data.chefstatus,
      chefprovince: data.chefprovince,
      chefcity: data.chefcity,
      chefcounty: data.chefcounty,
      chefspeciality: data.chefspeciality,
      lowcost: data.lowcost,
      highcost: data.highcost,
      page: data.page,
      size: data.size
    }
  })
}
//  顾客搜索菜品
export function searchFood (data) {
  return request({
    url: '/fwdj/dish/search',
    method: 'get',
    params: {
      dishname: data.dishname,
      lowprice: data.lowprice,
      highprice: data.highprice,
      categorystyle: data.categorystyle,
      categorytype: data.categorytype,
      page: data.page,
      size: data.size,
      sorttype: data.sorttype
    }
  })
}
// 获取厨师个人信息
export function getChiefInfo (data) {
  return request({
    url: '/fwdj/chefinfo/one',
    method: 'get',
    params: {
      chefid: data
    }
  })
}
// 获取厨师评分
export function getChiefRates (data) {
  return request({
    url: '/fwdj/chefinfo/score',
    method: 'get',
    params: {
      chefId: data
    }
  })
}
// 获取某个厨师的所有菜品
export function getAllDish (data) {
  return request({
    url: '/fwdj/dish/listbychef',
    method: 'get',
    params: {
      chefid: data
    }
  })
}
// 获取某个菜品
export function getOneDish (data) {
  return request({
    url: '/fwdj/dish/one',
    method: 'get',
    params: {
      dishId: data
    }
  })
}
// 获得菜品类目分类
export function getCatogery () {
  return request({
    url: '/fwdj/category/list',
    method: 'get'
  })
}
// 根据categoryType查找一个具体的分类
export function getCategoryType (data) {
  return request({
    url: '/fwdj/category/findbytype',
    method: 'get',
    params: {
      categorytype: data
    }
  })
}
// 根据categoryName查找一个具体分类
export function getCategoryName (data) {
  return request({
    url: '/fwdj/category/findbyname',
    method: 'get',
    params: {
      categoryName: data
    }
  })
}
// 获取用户个人信息
export function getUserInfo (data) {
  return request({
    url: '/fwdj/customer/info',
    method: 'get',
    params: {
      id: data
    }
  })
}
// 修改用户名
export function modifyUserName (data) {
  return request({
    url: '/fwdj/customer/alter/name',
    method: 'get',
    params: {
      customerId: data.customerId,
      customerName: data.customerName
    }
  })
}
// 修改手机号码
export function modifyUserPhone (data) {
  return request({
    url: '/fwdj/customer/alter/phone',
    method: 'get',
    params: {
      customerId: data.customerId,
      customerPhone: data.customerPhone
    }
  })
}
// 修改用户密码
export function modifyUserPassword (data) {
  return request({
    url: '/fwdj/customer/alter/password',
    method: 'post',
    params: {
      customerId: data.customerId,
      customerPassword: data.customerPassword,
      orginPassword: data.orginPassword
    }
  })
}
// 修改用户头像
export function modifyUserIcon (data) {
  return request({
    url: '/fwdj/customer/alter/icon',
    method: 'get',
    params: {
      customerId: data.customerId,
      customerIcon: data.customerIcon
    }
  })
}
// 修改用户基本信息
export function modifyInfo (data) {
  return request({
    url: '/fwdj/customer/alter',
    method: 'post',
    params: {
      customerId: data.customerId,
      customerGender: data.customerGender,
      customerProvince: data.customerProvince,
      customerCity: data.customerCity,
      customerCounty: data.customerCounty,
      customerDetailadd: data.customerDetailadd,
      customerJob: data.customerJob
    }
  })
}
// 收藏厨师
export function collectChief (data) {
  return request({
    url: '/fwdj/customer/collection/create',
    method: 'get',
    params: {
      customerid: data.customerid,
      chefid: data.chefid
    }
  })
}
// 取消收藏厨师
export function unCollectChief (data) {
  return request({
    url: '/fwdj/customer/collection/cancel',
    method: 'get',
    params: {
      customerId: data.customerId,
      chefId: data.chefId
    }
  })
}
// 获取用户收藏的厨师
export function getCollectChef (data) {
  return request({
    url: '/fwdj/customer/collection/list',
    method: 'get',
    params: {
      customerid: data
    }
  })
}
// 收藏菜品
export function collectDish (data) {
  return request({
    url: '/fwdj/customer/collection/dish/create',
    method: 'get',
    params: {
      customerId: data.customerId,
      dishId: data.dishId,
      chefId: data.chefId
    }
  })
}
// 取消收藏菜品
export function unCollectDish (data) {
  return request({
    url: '/fwdj/customer/collection/dish/cancel',
    method: 'get',
    params: {
      customerId: data.customerId,
      dishId: data.dishId
    }
  })
}
// 获取用户收藏的菜品
export function getCollectDish (data) {
  return request({
    url: '/fwdj/customer/collection/dish/list',
    method: 'get',
    params: {
      customerId: data
    }
  })
}
// 添加菜品到购物车
export function addCardish (data) {
  return request({
    url: '/fwdj/customer/car/create',
    method: 'POST',
    params: {
      customerId: data.customerId,
      chefId: data.chefId,
      dishId: data.dishId,
      dishQuantity: data.dishQuantity
    }
  })
}
// 取消购物车中的某菜品
export function deleteCardish (data) {
  return request({
    url: '/fwdj/customer/car/cancel',
    method: 'post',
    params: {
      carId: data
    }
  })
}
// 获取顾客在某厨师中购物车的所有菜品
export function getCardish (data) {
  return request({
    url: '/fwdj/customer/car/list',
    method: 'get',
    params: {
      customerId: data.customerId,
      chefId:data.chefId
    }
  })
}
// 修改购物车某菜品的数量
export function modifyCardish (data) {
  return request({
    url: '/fwdj/customer/car/alter',
    method: 'POST',
    params: {
      carId: data.carId,
      dishQuantity:data.dishQuantity
    }
  })
}
// 购物车下单
export function submitOrder (data) {
  return request({
    url: '/fwdj/customer/order/create',
    method: 'POST',
    params: {
      customerId: data.customerId,
      customerName:data.customerName,
      customerPhone:data.customerPhone,
      customerAddress:data.customerAddress,
      chefId:data.chefId,
      chefName:data.chefName,
      orderTime:data.orderTime,
      orderRemark:data.orderRemark,
      foodStatus:data.foodStatus
    }
  })
}
// 某商品立即下单
export function submitOne (data) {
  return request({
    url: '/fwdj/customer/order/create/now',
    method: 'POST',
    params: {
      customerId: data.customerId,
      customerName:data.customerName,
      customerPhone:data.customerPhone,
      customerAddress:data.customerAddress,
      chefId:data.chefId,
      chefName:data.chefName,
      orderTime:data.orderTime,
      orderRemark:data.orderRemark,
      foodStatus:data.foodStatus,
      dishId:data.dishId,
      dishQuantity:data.dishQuantity
    }
  })
}
// 支付
export function payfor (data) {
  return request({
    url: '/fwdj/pay/create',
    method: 'get',
    params: {
      orderId: data,
      returUrl: 'https://baidu.com'
    }
  })
}
// 获取顾客某个订单详情
export function getOrderDetail (data) {
  return request({
    url: '/fwdj/customer/order/detail',
    method: 'get',
    params: {
      customerId: data.customerId,
      orderId:data.orderId
    }
  })
}
// 顾客取消订单
export function cancelOrder (data) {
  return request({
    url: '/fwdj/customer/order/cancel',
    method: 'POST',
    params: {
      customerId: data.customerId,
      orderId:data.orderId
    }
  })
}
// 完结订单
export function finishOrder (data) {
  return request({
    url: '/fwdj/customer/order/finish',
    method: 'POST',
    params: {
      customerId: data.customerId,
      orderId:data.orderId
    }
  })
}
// 获取顾客的所有订单
export function getOrderInfo (data) {
  return request({
    url: '/fwdj/customer/order/list',
    method: 'get',
    params: {
      customerId: data.customerId,
      page:data.page,
      size: data.size
    }
  })
}
// 获取用户所有地址
export function getAllAddress (data) {
  return request({
    url: '/fwdj/customer/address/list',
    method: 'get',
    params: {
      customerId: data
    }
  })
}
//新增地址
export function addAddress (data) {
  return request({
    url: '/fwdj/customer/address/create',
    method: 'post',
    params: {
      customerId: data.customerId,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerProvince: data.customerProvince,
      customerCity: data.customerCity,
      customerCounty: data.customerCounty,
      customerDetailadd: data.customerDetailadd,
    }
  })
}
// 修改某个地址
export function modifyAddress (data) {
  return request({
    url: '/fwdj/customer/address/alter',
    method: 'post',
    params: {
      addressId: data.addressId,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerProvince: data.customerProvince,
      customerCity: data.customerCity,
      customerCounty: data.customerCounty,
      customerDetailadd: data.customerDetailadd,
    }
  })
}
// 删除地址
export function deleteAddress (data) {
  return request({
    url: '/fwdj/customer/address/cancel',
    method: 'post',
    params: {
      addressId: data
    }
  })
}
// 顾客评论某个订单
export function giveComment (data) {
  return request({
    url: '/fwdj/customer/evaluate/create',
    method: 'post',
    params: {
      orderId: data.orderId,
      evaluateScore: data.evaluateScore,
      evaluateContent: data.evaluateContent,
      evaluateImage: data.imgs,
      customerId: data.customerId
    }
  })
}
// 顾客追加评论/修改评论
export function addMoreComment (data) {
  return request({
    url: '/fwdj/customer/evaluate/alter',
    method: 'post',
    params: {
      evaluateScore: data.evaluateScore,
      evaluateContent: data.evaluateContent,
      evaluateId: data.evaluateId
    }
  })
}
// 获取某顾客写过的所有评论
export function getCustomerComments (data) {
  return request({
    url: '/fwdj/customer/evaluate/list',
    method: 'get',
    params: {
      customerId: data
    }
  })
}
// 获取某个厨师的所有评论
export function getChefComments (data) {
  return request({
    url: '/fwdj/orderevaluate/chef/list',
    method: 'get',
    params: {
      chefId: data
    }
  })
}
// 获取某个订单的付款流水
export function getTransNo (data) {
  return request({
    url: '/fwdj/customer/payinfo/one',
    method: 'get',
    params: {
      orderId: data
    }
  })
}
// 获取顾客所有的付款流水
export function getAllTransNo (data) {
  return request({
    url: '/fwdj/customer/payinfo/list',
    method: 'get',
    params: {
      customerId: data
    }
  })
}
const jobs = [
  {
  value: '计算机',
  label: '计算机',
  children: [
    {
      value: '计算机软件',
      label: '计算机软件'
    }, {
      value: 'IT服务(系统/数据/维护)',
      label: 'IT服务(系统/数据/维护)'
    }, {
      value: '互联网/电子商务',
      label: '互联网/电子商务'
    }, {
      value: '电子技术/半导体/集成电路',
      label: '电子技术/半导体/集成电路'
    },
    {
      value: '通信/电信/网路设备',
      label: '通信/电信/网路设备'
    },
    {
      value: '通信/电信运营、增值服务',
      label: '通信/电信运营、增值服务'
    }
  ]
},
{
  value: '其他',
  label: '其他',
  children: [
    {
      value: '基金/证券/期货/投资',
      label: '基金/证券/期货/投资'
    },
    {
      value: '广告/会展/公关',
      label: '广告/会展/公关'
    },
    {
      value: '零售/批发',
      label: '零售/批发'
    },
    {
      value: '教育/培训/院校',
      label: '教育/培训/院校'
    },
    {
      value: '专业服务/咨询',
      label: '专业服务/咨询'
    },
    {
      value: '医药/生物工程',
      label: '医药/生物工程'
    },
    {
      value: '家居/室内设计/装饰装潢',
      label: '家居/室内设计/装饰装潢'
    },
    {
      value: '酒店/餐饮',
      label: '酒店/餐饮'
    },
    {
      value: '旅游/度假',
      label: '旅游/度假'
    },
    {
      value: '娱乐/体育/休闲',
      label: '娱乐/体育/休闲'
    },
    {
      value: '学术/科研',
      label: '学术/科研'
    },
    {
      value: '媒体/出版/影视/文化传播',
      label: '媒体/出版/影视/文化传播'
    },
    {
      value: '电气/电力/水力',
      label: '电气/电力/水力'
    },
    {
      value: '政府|非盈利机构',
      label: '政府|非盈利机构'
    },
    {
      value: '交通|运输|物流|仓储',
      label: '交通|运输|物流|仓储'
    },
    {
      value: '银行',
      label: '银行'
    },
    {
      value: '房地产/建筑/建材/工程',
      label: '房地产/建筑/建材/工程'
    },
    {
      value: '学生',
      label: '学生'
    },
    {
      value: '农|林牧|渔|其他',
      label: '农|林牧|渔|其他'
    }
  ]
}
]
// 通过函数返回对象值
export function exJobs () {
  return jobs
}