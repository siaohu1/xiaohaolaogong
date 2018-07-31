//处理接口
import axios from 'axios'
//处理query
import qs from 'qs'
//axios配置
const instance = axios.create({
  // baseURL: 'http://192.168.1.121:9082/',
  baseURL: 'http://47.75.202.148:9082',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data) {
    return qs.stringify({
      ...data,
      token:'0e71691b48484bc55d2c483894914c58'
    })
  }]
})

instance.interceptors.response.use(
  response => {
    if (response.data.code === 0) {
      return response.data
    } else {
      // alert(response.data.msg)
      return response.data
      console.log(data.msg)
    }
  },
  error => {
    console.log(error)
  }
)

//   --  用户模块  --
// 发送登陆邮件验证码
export const UendLoginEmail = params => {
  return instance.post('/user/sendLoginEmail', params)
}
// 用户登陆
export const UserLogin = params => {
  return instance.post('/user/login', params)
}
// logout登出
export const UserLogout = params => {
  return instance.post('/user/logout', params)
}
// 修改密码
export const ChangePwd = params => {
  return instance.post('/user/changePassword', params)
}
// 获取当前机构API列表 / 指定API
export const ApiInfo = params => {
  return instance.post('/user/apiInfo', params)
}
// 生成API公私钥
export const CreateApiKey = params => {
  return instance.post('/user/createApiKey', params)
}
// 完善API
export const CompleteApi = params => {
  return instance.post('/user/completeApi', params)
}
// 删除API
export const DeleteApi = params => {
  return instance.post('/user/deleteApi', params)
}


//   --  基础信息  --

//获取所有币对
export const getAllSymbol = params => {
  return instance.get('/base/symbol', { params })
}
//获取所有币种
export const getAllCurrency = params => {
  return instance.get('/base/currency', { params })
}
//获取所有交易所
export const getAllExchange = params => {
  return instance.get('/base/exchange', { params })
}

//  --  资产模块  --

// 资产统计
export const AssetsStatistics = params => {
  return instance.get('/assets/assetsStatistics', {params})
}
// 资产明细
export const AssetsDetail = params => {
  return instance.get('/assets/assetsDetail', {params})
}
// 统计流水
export const CaptialStatistics = params => {
  return instance.get('/assets/captialStatistics', {params})
}

//  --  订单/成交 模块  --
// 获取委托订单
export const Orders = params => {
  return instance.get('/order/orders', {params})
}
// 统计订单/成交记录
export const OrderStatistics = params => {
  return instance.get('/order/orderStatistics', {params})
}
// 获取成交记录
export const Trades = params => {
  return instance.get('/trade/trades', {params})
}


export default instance
