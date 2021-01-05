import Mock from 'mockjs'

// 生成数据列表
var dataList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  let name = Mock.Random.name()
  dataList.push(Mock.mock({
    'jobId': '@increment',
    'beanName': name,
    'methodName': name,
    'params': '-',
    'cronExpression': '0 0/30 * * * ?',
    'status': 1,
    'remark': '@csentence',
    'createTime': '@datetime'
  }))
}

// 获取收货地址列表
export function findAddressList () {
  return {
    // isOpen: false,
    url: '/weixin/address/findAddressList',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'list':dataList
    }
  }
}

// 获取信息
export function info () {
  return {
    // isOpen: false,
    url: '/sys/info',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}
