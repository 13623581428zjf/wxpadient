import Mock from 'mockjs'

// 生成数据列表
var dataList = []
for(let i = 0; i < Math.floor(Math.random() * 10 + 2); i++) {
	let name = Mock.Random.name()
	dataList.push(Mock.mock({
		'inforName': '@ctitle', //随机生成一个中文标题
		'date': '@date',
		'time': '@time("H:m:s")',
	}))
}
//物流信息
export function information() {
	return {
		// isOpen: false,
		url: '/weixin/infor/information',
		type: 'get',
		data: {
			'msg': 'success',
			'code': 0,
			'list':dataList
		}
	}
}
