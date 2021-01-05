const filters = {
	areaCut: function(value) {
		if(!value) return '';
		return value.substring(0, value.length - 9);
	},
	groupTypefilter: function(value) {
		if(!value) {
			return "";
		} else if(value == '0') {
			return "未审核";
		} else if(value == '1') {
			return "待取药";
		} else if(value == '2') {
			return "待取药";
		} else if(value == '3') {
			return "待取药";
		} else if(value == '4') {
			return "待取药";
		} else if(value == '5') {
			return "待取药";
		} else {
			return "出错啦！"
		}
	},
	statusfilters: function(value) {
		if(!value) {
			return "";
		} else if(value == 'created') {
			return "待支付";
		} else if(value == 'cancel') {
			return "已取消";
		} else if(value == 'paid') {
			return "已预约";
		} else if(value == 'complete') {
			return "已结束";
		} else {
			return "什么情况";
		}
	},
	statusType: function(value) {
		if(!value) {
			return "";
		} else if(value == 'created') {
			return "待支付";
		} else if(value == 'cancel') {
			return "已取消";
		} else if(value == 'paid') {
			return "已支付";
		} else if(value == 'complete') {
			return "已结束";
		} else if(value == 'underLine') {
			return "线下支付";
		} else {
			return "什么情况";
		}
	},
	cutTime:function(value){
	  	if(!value){
	  		 return ''
	  	}else{
	  		  return value.slice(0,5)
	  	}
	  },
	examineType: function(value) {
		if(!value) {
			return ''
		} else if(value == 'CREATED') {
			return '请完善企业资质';
		} else if(value == 'APPROVALING') {
			return '审核中';
		} else if(value == 'PASSED') {
			return '审核通过';
		} else if(value == 'NOT_PASSED') {
			return '不通过';
		} else {
			return '什么情况';
		}
	},
	sliceloginId: function(value) {
		if(value) {
			return value.slice(0, 4) + '***' + value.slice(-4)
		} else {
			return '';
		}
	},
	sliceTime: function(value) {
		if(value) {
			return value.slice(0, 10)
		} else {
			return '';
		}
	},
	weekfilters: function(value) {
		if(!value) {
			return "";
		} else if(value == 1) {
			return "周一";
		} else if(value == 2) {
			return "周二";
		} else if(value == 3) {
			return "周三";
		} else if(value == 4) {
			return "周四";
		} else if(value == 5) {
			return "周五";
		} else if(value == 6) {
			return "周六";
		} else if(value == 7) {
			return "周日";
		} else {
			return "休息休息";
		}
	},
	areaCut: function(value) {
		if(!value) return '';
		return value.substring(0, value.length - 3);
	},
	reckonAge:function(strBirthday){
		if(!strBirthday){
			return ''
		}else{
			var returnAge;
			var strBirthdayArr = strBirthday.split("-");
			var birthYear = strBirthdayArr[0];
			var birthMonth = strBirthdayArr[1];
			var birthDay = strBirthdayArr[2];
			var d = new Date();
			var nowYear = d.getFullYear();
			var nowMonth = d.getMonth() + 1;
			var nowDay = d.getDate();
			if(nowYear == birthYear) {
				returnAge = 0; //同年 则为0岁
			} else {
				var ageDiff = nowYear - birthYear; //年之差
				if(ageDiff > 0) {
					if(nowMonth == birthMonth) {
						var dayDiff = nowDay - birthDay; //日之差
						if(dayDiff < 0) {
							returnAge = ageDiff - 1;
						} else {
							returnAge = ageDiff;
						}
					} else {
						var monthDiff = nowMonth - birthMonth; //月之差
						if(monthDiff < 0) {
							returnAge = ageDiff - 1;
						} else {
							returnAge = ageDiff;
						}
					}
				} else {
					returnAge = 0; //返回-1 表示出生日期输入错误 晚于今天
				}
			}
			return returnAge; //返回周岁年龄
			}
	}
}
export default filters
