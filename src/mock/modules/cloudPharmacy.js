import Mock from 'mockjs'

// 生成数据列表
var dataList = []
for(let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
	let name = Mock.Random.name()
	dataList.push(Mock.mock({
		'name': '@ctitle', //随机生成一个中文标题
		'status': 1,
		'contant': '@csentence',
		'price|1-1000': 0, // 18至28以内随机整数, 0只是用来确定类型
		'img': '@image', //生成一个随机的图片地址,
        'id': '@natural(1, 100)', //大于等于零的整数
        'nums': '@natural(1, 5)', //大于等于零的整数
        'guige': '@ctitle', //随机生成一个中文标题
//      'nums': 0,
	}))
}
//获取云药房信息
//获取医生详情
export function drugroom() {
	return {
		// isOpen: false,
		url: '/weixin/docter/drugroom',
		type: 'get',
		data: {
			'msg': 'success',
			'code': 0,
			'list':dataList
		}
	}
}
