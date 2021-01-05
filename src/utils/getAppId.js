import wx from 'weixin-js-sdk'
import {postRequest} from '@/utils/httpRequest';
var getappId=function(){
	var url = encodeURIComponent(location.href.split('#')[0]);
		this.postRequest('/weixin/createJsapiSignature', {
			url: url
		}).then((data) => {
	  		wx.config({
			// debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: data.signature.appId, // 必填，公众号的唯一标识
			timestamp: data.signature.timestamp, // 必填，生成签名的时间戳
			nonceStr: data.signature.nonceStr, // 必填，生成签名的随机串
			signature: data.signature.signature, // 必填，签名
			jsApiList: ['chooseImage', 'previewImage', 'uploadImage', 'downloadImage','translateVoice','getLocalImgData','openLocation'] // 必填，需要使用的JS接口列表
		});
		wx.error(function(res) {
			console.log(res)
			// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
		});
		})
}
export {getappId}