<template>
	<div class="mui-content">
		<div>
			<div class="mui-inqui mui-inqui-active pd-leftright-px15 bg-fff border-bt">
				<span class="pull-left font-px16 color-333">病情描述</span>
			</div>
			<div style="position: relative;" class=" bg-fff">
				<textarea id="textarea" rows="6" maxlength="500" @input="descInput" v-model="desc" placeholder="详细描述您的病情症状，曾经做过的检查、用药情况，（最少输入10个字，最多500个字）"></textarea>
				<span style="position: absolute;bottom: 0px;right: 15px;font-size: 12px;color: #999">{{start}}/{{remnant}}</span>
			</div>
			<div class="border-top pd-px15 bg-fff mui-inqu-update clearfix" style=" margin-bottom: 48px;">
				<div v-for='(item,index) in localIds' class='showpicBox'>
					<img :src="item" style="width:1.4rem; height:1.4rem;" alt="上传图片">
					<img src="../../assets/img/delUploadImg.png" class='delUpLoad' @click="delImg(index)" alt="删除图片">
				</div>
				<div>
					<img src="../../assets/img/Group@2x.png" style="width:1.4rem; height:1.4rem;" alt="上传图片" @click="updataImg()">
				</div>
			</div>
		</div>
		<div class="footer">
			<button type="button" class="mui-btn mui-btn-success" @click='addCase()'>保存</button>
		</div>
	</div>
</template>

<script>
	import wx from 'weixin-js-sdk'
	export default {
		data: function() {
			return {
				start: 0,
				remnant: 500,
				desc: "",
				localIds: [],
				serverList: []
			}
		},
		mounted: function() {
			this.getappId();
		},
		methods: {
			descInput: function() {
				console.log(this.desc)
				var text = this.desc.length;
				this.remnant = 500 - text;
				this.start = 0 + text;
				var reg2 = /([\u00A9\u00AE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9-\u21AA\u231A-\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA-\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614-\u2615\u2618\u261D\u2620\u2622-\u2623\u2626\u262A\u262E-\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665-\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B-\u269C\u26A0-\u26A1\u26AA-\u26AB\u26B0-\u26B1\u26BD-\u26BE\u26C4-\u26C5\u26C8\u26CE-\u26CF\u26D1\u26D3-\u26D4\u26E9-\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733-\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763-\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934-\u2935\u2B05-\u2B07\u2B1B-\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70-\uDD71\uDD7E-\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01-\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50-\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96-\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF])|(\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F-\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95-\uDD96\uDDA4-\uDDA5\uDDA8\uDDB1-\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB-\uDEEC\uDEF0\uDEF3-\uDEF6])|(\uD83E[\uDD10-\uDD1E\uDD20-\uDD27\uDD30\uDD33-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4B\uDD50-\uDD5E\uDD80-\uDD91\uDDC0])/g;
				this.desc = this.desc.replace(reg2, '');
			},
			delImg(index) {
				this.localIds.splice(index, 1)
				this.serverList.splice(index, 1)
			},
			updataImg() {
				var _this = this
				this.count = 9 - _this.localIds.length;
				if(this.count > 0) {
					wx.chooseImage({
						count: this.count, // 默认9
						sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
						success: function(res) {
							_this.uploadImg(res.localIds);
						}
					})
				} else {
					mui.toast('最多可添加9张！')
				}
			},
			//具体上传图片  
			uploadImg(e) {
				var _this = this
				if(e.length <= 0) return
				wx.uploadImage({
					localId: e[0], // 需要上传的图片的本地ID，由chooseImage接口获得
					isShowProgressTips: 1, // 默认为1，显示进度提示
					success: function(res) {
						if(window.__wxjs_is_wkwebview) {
							wx.getLocalImgData({
								localId: e[0],
								success: function(res) {
									var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
									localData = localData.replace('jgp', 'jpeg'); //iOS 系统里面得到的数据，类型为 image/jgp,因此需要替换一下
									_this.localIds.push(localData)
								},
								fail: function(res) {
									mui.toast('该图片暂时无法查看')
								}
							})
						} else {
							_this.localIds.push(e[0]) // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
						}
						e.splice(0, 1)
						var serverId = res.serverId; // 返回图片的服务器端ID
						_this.downloadImage(serverId);
						_this.uploadImg(e);
					}
				});
			},
			downloadImage(mediaId) {
				this.postRequest('/weixin/savePicture', {
					mediaId: mediaId
				}).then((data) => {
					this.serverList.push(data.filePath)
				})
			},
			//添加病例
			addCase() {
				//				var reg=/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/
				if(!this.desc) {
					mui.toast('病情描述不能为空！');
				} else if(this.desc.length < 10) {
					mui.toast('病情描述最少输入10个字！');
				}
				//				else if(!reg.test(this.desc)){
				//					mui.toast('不能输入表情图片！');
				//				}
				else {
					this.postRequest('/weixin/savePatientCase', {
						content: this.desc,
						urlList: this.serverList
					}).then((data) => {
						mui.toast('添加成功！')
						this.$router.replace("/case/dossier");
					})
				}
			}
		}
	}
</script>

<style scoped>
	.mui-btn {
		width: 100%;
		height: 1rem;
		color: #fff;
		border-radius: 0;
	}
	
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
	
	.delUpLoad {
		width: 0.36rem;
		height: 0.36rem;
		position: absolute;
		top: 0;
		right: 0;
	}
	
	.showpicBox {
		position: relative;
		width: 1.4rem;
		height: 1.4rem;
		margin-right: 0.2rem;
	}
</style>