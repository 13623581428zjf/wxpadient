import Mock from 'mockjs'

// 生成数据列表
var dataList = []
for(let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
	let name = Mock.Random.name()
	dataList.push(Mock.mock({
		'ctitle': '@ctitle', //随机生成一个中文标题
		'status': 1,
		'contant': '@csentence',
		'birthday': '@date("yyyy-MM-dd")',
		'age|18-28': 0, // 18至28以内随机整数, 0只是用来确定类型
		'city': '@city(true)', // 中国城市
		'img': '@image', //生成一个随机的图片地址,
        'name': '@cname()',// 汉字姓名
        'id': '@natural(1, 100)', //大于等于零的整数
        'doct':'主任医师',
        'doctke':'分时免疫科',
	}))
}
// 获取医生团队列表
export function doctorteam() {
	return {
		// isOpen: false,
		url: '/weixin/docter/doctorteam',
		type: 'post',
		data: {
			'msg': 'success',
			'code': 0,
			'list': dataList
		}
	}
}
//获取医生详情
export function doctoOption() {
	return {
		// isOpen: false,
		url: '/weixin/docter/doctoOption',
		type: 'get',
		data: {
			'msg': 'success',
			'code': 0,
			'list':[{
				'nameDoct':'张大仙医生团队',
				'img':'../../assets/img/di.png',
				'contant':'团队介绍团队介绍团队介团队介绍团队介绍团队介绍团队介绍团队介绍团队介绍团队介绍团队介绍绍团队介绍团队介绍团队介绍团队介绍团队介绍'
			}]
		}
	}
}
//获取团队成员
export function teamMumber() {
	return {
		// isOpen: false,
		url: '/weixin/docter/teamMumber',
		type: 'get',
		data: {
			'msg': 'success',
			'code': 0,
			'list': dataList
		}
	}
}