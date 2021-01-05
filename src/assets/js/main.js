//获取本地时间
var getDateTime = function () {
	var date = new Date();
	var seperator1 = "/";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
	return currentdate;
}

//ajax请求封装
var Ajax = function (obj) {
	// console.log(local.url);
	var str = JSON.stringify(obj.interfaceParameters);
	// console.log(str);
	if(localStorage.getItem('token')){
		var token = localStorage.getItem('token');
	}
	mui.ajax(local.url + obj.interfaceName, {
		data: {
			interfaceParameters: JSON.stringify(obj.interfaceParameters)
		},
		dataType: 'json',//服务器返回json格式数据
		type: 'post',//HTTP请求类型
		timeout: 10000,//超时时间设置为10秒；
		headers: {
			 'Content-Type': 'application/json',
			 token:token
		},
		success: function (data) {
			// console.log(JSON.stringify(data));
			//服务器返回响应，根据响应结果，分析是否登录成功；
			if (data.code == "0") {
				obj.success(data);
			} else if (data.code == "401") {//登录超时处理
				mui.toast(data.msg);
			} else if (data.code == "500") {
				console.log(data.msg);
				mui.toast(data.msg);
				obj.error(data);
			}
		},
		error: function (xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
			if (type == "timeout") {
				mui.toast("服务器链接超时！");
			} else if (type == "abort") {
				mui.toast("服务器请求中断！");
			}
		}
	});
}
var token =  function(url){
	if(!localStorage.getItem('token')) {
		sessionStorage.setItem('url',url);
		mui.openWindow({
			url: '../views/prescription/bindPhone.html',
			extras:{
				url:url
			},
		});
		
	}
}
//获取url参数
var getParameter = function(str){
	var url=window.location.href.split('?')[1];
	var arr1=url.split("&");
	for(var i in arr1){
		var arr2=arr1[i].split("=");
		if(str==arr2[0]){
			return arr2[1];
		}
	}
}

//减法
function FloatSub(a, b) {
	var c, d, e;
	try {
		c = a.toString().split(".")[1].length;
	} catch (f) {
		c = 0;
	}
	try {
		d = b.toString().split(".")[1].length;
	} catch (f) {
		d = 0;
	}
	return e = Math.pow(10, Math.max(c, d)), (accMul(a, e) - accMul(b, e)) / e;
}
//加法
function FloatAdd(a, b) {
	var c, d, e;
	try {
		c = a.toString().split(".")[1].length;
	} catch (f) {
		c = 0;
	}
	try {
		d = b.toString().split(".")[1].length;
	} catch (f) {
		d = 0;
	}
	return e = Math.pow(10, Math.max(c, d)), (accMul(a, e) + accMul(b, e)) / e;
}
//乘法
function accMul(a, b) {
	var c = 0,
		d = a.toString(),
		e = b.toString();
	try {
		c += d.split(".")[1].length;
	} catch (f) { }
	try {
		c += e.split(".")[1].length;
	} catch (f) { }
	return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
//设置安卓微信用户不允许自定义字体大小
(function () {
	if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
		handleFontSize();
	} else {
		if (document.addEventListener) {
			document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
		} else if (document.attachEvent) {
			document.attachEvent("WeixinJSBridgeReady", handleFontSize);
			document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
		}
	}

	function handleFontSize() {
		// 设置网页字体为默认大小
		WeixinJSBridge.invoke('setFontSizeCallback', {
			'fontSize': 0
		});
		// 重写设置网页字体大小的事件
		WeixinJSBridge.on('menu:setfont', function () {
			WeixinJSBridge.invoke('setFontSizeCallback', {
				'fontSize': 0
			});
		});
	}
})();