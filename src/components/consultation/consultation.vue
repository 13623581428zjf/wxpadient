<template>
	<div class="mui-content">
		<ul class="mui-top-info clearfix bg-fff pd-leftright-px15 mg-bottom-px10 font-px16">
			<li> <img src="../../assets/img/name.png" style="width:.46rem;height: .46rem;vertical-align: middle;" alt=""> 胡汉三<span style="color:#E0E0E0;padding-left:10px;">|</span></li>
			<li>男<span style="color:#E0E0E0;padding-left:10px;">|</span></li>
			<li>25岁</li>
		</ul>
		<div>
			<div class="mui-inqui mui-inqui-active pd-leftright-px15 bg-fff border-bt" @click="caseSelect">
				<span class="pull-left font-px16 color-333">病情描述</span>
				<span class="pull-right font-px14 color-999"><span style="vertical-align: middle;">从病历夹中选择病例&nbsp;&nbsp;</span>
				<img src="../../assets/img/next.png" style="width: .16rem;height:.28rem; vertical-align: middle;" alt="">
				</span>
			</div>
			<div style="position: relative;" class=" bg-fff">
				<textarea id="textarea" rows="6" maxlength="500" @input="descInput" v-model="desc" placeholder="详细描述您的病情症状，曾经做过的检查、用药情况，目前病情是加重还是缓解，想要获得医生的什么帮助（最少输入10个字，最多500个字）"></textarea>
				<span style="position: absolute;bottom: 0px;right: 15px;font-size: 12px;color: #999">{{start}}/{{remnant}}</span>
			</div>
			<div class="border-top pd-px15 bg-fff mui-inqu-update clearfix" style=" margin-bottom: 48px;">
				<div>
					<img src="../../assets/img/Group@2x.png" style="width:1.4rem; height:1.4rem;" @click="updataImg()" alt="上传图片">
				</div>
				<div>
					<img src="../../assets/img/Group@2x.png" style="width:1.4rem; height:1.4rem;" alt="上传图片">
				</div>
				<div>
					<img src="../../assets/img/Group@2x.png" style="width:1.4rem; height:1.4rem;" alt="上传图片">
				</div>
				<div>
					<img src="../../assets/img/Group@2x.png" style="width:1.4rem; height:1.4rem;" alt="上传图片">
				</div>
				<div>
					<img src="../../assets/img/Group@2x.png" style="width:1.4rem; height:1.4rem;" alt="上传图片">
				</div>
				<div>
					<img src="../../assets/img/Group@2x.png" style="width:1.4rem; height:1.4rem;" alt="上传图片">
				</div>
				<div>
					<img src="../../assets/img/Group@2x.png" style="width:1.4rem; height:1.4rem;" alt="上传图片">
				</div>
				<div>
					<img src="../../assets/img/Group@2x.png" style="width:1.4rem; height:1.4rem;" alt="上传图片">
				</div>
				<div>
					<img src="../../assets/img/Group@2x.png" style="width:1.4rem; height:1.4rem;" alt="上传图片">
				</div>
				<div>
					<img src="../../assets/img/Group@2x.png" style="width:1.4rem; height:1.4rem;" alt="上传图片">
				</div>
			</div>
		</div>
		<div class="footer">
			<button type="button" class="mui-btn mui-btn-success">提交</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				start: 0,
				remnant: 500,
				desc: "",
				isShow: false,
				type: '请选择'
			}
		},
		mounted() {
//			this.getappId();
			wx.ready(function() {
				Ajax({
					interfaceName: '/wechat/createJsapiSignature',
					interfaceParameters: {},
					success: function(data) {
						console.log(data);
						wx.config({
							debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							appId: data.appId, // 必填，公众号的唯一标识
							timestamp: data.timestamp, // 必填，生成签名的时间戳
							nonceStr: data.nonceStr, // 必填，生成签名的随机串
							signature: data.signature, // 必填，签名
							jsApiList: ['chooseImage', 'previewImage', 'uploadImage', 'downloadImage'] // 必填，需要使用的JS接口列表
						});
						wx.error(function(res) {
							console.log(res)
							// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
						});
					},
					error: function() {}
				})

			});
		},
		methods: {
			descInput: function() {
				var text = this.desc.length;
				this.remnant = 500 - text;
				this.start = 0 + text;
			},
			submit: function() {
				app.desc = "";
			},
			selectTime: function(event) {
				var event = event.currentTarget;
				this.isShow = true;
			},
			inquiMode: function(type) {
				console.log(type);
				if(type == 'text') {
					this.type = '图文';
				} else {
					this.type = '视频';
				}
				this.isShow = false;
			},
			caseSelect: function() {
				mui.openWindow({
					url: '../selectCase.html',
					extras: {
						name: 'mui' //扩展参数
					}
				});
			},
			showajax: function() {
				console.log(local.url)
				Ajax({
					interfaceName: '/joieosc',
					interfaceParameters: '',
					success: function() {},
					error: function() {}
				})
			},
			getappId: function() {
				Ajax({
					interfaceName: '/wechat/createJsapiSignature',
					interfaceParameters: {},
					success: function(data) {
						console.log(data);
						wx.config({
							debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							appId: data.appId, // 必填，公众号的唯一标识
							timestamp: data.timestamp, // 必填，生成签名的时间戳
							nonceStr: data.nonceStr, // 必填，生成签名的随机串
							signature: data.signature, // 必填，签名
							jsApiList: ['chooseImage', 'previewImage', 'uploadImage', 'downloadImage'] // 必填，需要使用的JS接口列表
						});
						wx.error(function(res) {
							console.log(res)
							// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
						});
					},
					error: function() {}
				})
			},
			updataImg: function() {
				console.log()
				wx.chooseImage({
					count: 1, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: function(res) {
						var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
					}
				});
			}

		}
	}
</script>

<style scoped>
	.mui-inqui {
		height: .96rem;
		line-height: .94rem;
	}
	
	.mui-inqui-active:active {
		background-color: #eee !important;
	}
	
	#textarea {
		padding: 10px 15px;
		font-size: .28rem;
		border: none;
	}
	
	.mui-inqu-update>div {
		float: left;
		margin: 0 10px 10px 0;
	}
	
	.mui-mode {
		text-align: left;
	}
	
	.mui-btn-green,
	.mui-btn-positive,
	.mui-btn-success {
		border-radius: 0;
		border: 1px solid #18BC9A;
		background-color: #18BC9A;
	}
	
	.mui-btn-success:enabled:active {
		border: 1px solid #52A58E;
		background-color: #52A58E;
	}
	
	.mui-top-info {
		height: 1rem;
		line-height: 1rem;
	}
	
	.mui-top-info li {
		float: left;
		margin-right: 10px;
	}
</style>