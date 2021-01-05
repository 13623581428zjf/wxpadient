<template>
	<div class="mui-content">
		<div>
			<div class="mui-inqui pd-leftright-px15 bg-fff border-bt">
				<span class="pull-left font-px16 color-333">病情描述</span>
			</div>
			<div style="position: relative;" class=" bg-fff">
				<textarea id="textarea" rows="6" maxlength="500" v-model="desc" @input="descInput"></textarea>
				<span class='numShow'>{{start}}/{{remnant}}</span>
			</div>
			<div class="border-top pd-px15 bg-fff mui-inqu-update clearfix" style="margin-bottom: 48px;">
				<ul class='showpicList clearfix'>
					<li v-for='(item,index) in localIds'>
						<div class='showpicBox'>
							<img :src="item" class='showUpLoad' alt="上传图片">
							<img src="../../assets/img/delUploadImg.png" class='delUpLoad' @click="delImg(index)" alt="删除图片">
						</div>
					</li>
					<li>
						<div>
							<img src="../../assets/img/Group@2x.png" class='upLoadImg' @click="updataImg()" alt="上传图片">
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="footer clearfix">
			<button type="button" class="mui-btn mui-delBtn bg-fff  mui-inqui-active" @click='delCase()'>删除</button>
			<button type="button" class="mui-btn mui-btn-success mui-addBtn" @click='editCase()'>保存</button>
		</div>
	</div>
</template>

<script>
	import wx from 'weixin-js-sdk'
	export default {
		data: function() {
			return {
				desc: "",
				start: 10,
				remnant: 500,
				id: window.location.href.split('?')[1],
				localIds: [],
				serverList: [],
				id: '',
				count:''
			}
		},
		mounted: function() {
			this.getappId()
			this.id = this.$route.query.id;
			this.showCase();
		},
		 beforeDestroy() {
    		mui.closePopups()
		},
		methods: {
			descInput: function() {
				var text = this.desc.length;
				this.remnant = 500 - text;
				this.start = 0 + text;
			},
			delImg(index) {
				this.localIds.splice(index,1)
				this.serverList.splice(index,1)
			},
			//删除病例
			delCase() {
				var _this=this
				mui.confirm('您确定要删除吗？', function(e) {
					if(e.index == 1) {
						_this.postRequest('/weixin/delePatientCase', {
							id: parseInt(_this.id)
						}).then((data) => {
							if(data.code=='0'){
								mui.toast('删除成功！')
								_this.$router.push("/case/dossier");
							}
						})
					}
				})
			},
			showCase() {
				this.postRequest('/weixin/patientCaseInfo', {
					id: parseInt(this.id)
				}).then((data) => {
					if(data.code=='0'){
						console.log(data)
						this.desc = data.map.caseEntity.content;
						this.start = data.map.caseEntity.content.length;
						var queryPictureList = data.map.queryPictureList;
						for(var i = 0; i < queryPictureList.length; i++) {
							var url = queryPictureList[i].url
							this.localIds.push(url)
							this.serverList.push(url)
						}

					}else{
						mui.toast(data.msg)
					}
					
				})
			},
			//编辑病例
			editCase: function() {
//				var reg=/^[A-Za-z\u4e00-\u9fa5]+$/
				if(!this.desc){
					mui.toast('病情描述不能为空！');
				}else if(this.desc.length < 10) {
					mui.toast('病情描述最少输入10个字！');
				}
//				else if(!reg.test(this.desc)){
//					mui.toast('不能输入表情图片！');
//				}
				else {
					this.postRequest('/weixin/updataPatientCase', {
						content: this.desc,
						id: parseInt(this.id),
						caseUrl: this.serverList
					}).then((data) => {
						if(data.code=='0'){
							this.$router.push("/case/dossier");
						}else{
							mui.toast(data.msg)
						}
					})
				}
			},
			updataImg(){
					var _this=this
					this.count=9-_this.localIds.length;
					if(this.count>0){
				 		wx.chooseImage({
							count: this.count, // 默认9
							sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
							sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
							success: function(res) {
								_this.uploadImg(res.localIds);
							}
					 	})
				 	}else{
				 		mui.toast('最多可添加9张！')
				 	}
			},
			//具体上传图片  
			uploadImg(e) {
				var _this=this
				if(e.length<=0) return 
					wx.uploadImage({
						localId: e[0], // 需要上传的图片的本地ID，由chooseImage接口获得
						isShowProgressTips: 1, // 默认为1，显示进度提示
						success: function(res) {
							if (window.__wxjs_is_wkwebview){
								wx.getLocalImgData({
					                  localId: e[0],
					                  success: function (res) {
					                  	var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
					                    localData = localData.replace('jgp', 'jpeg');//iOS 系统里面得到的数据，类型为 image/jgp,因此需要替换一下
					                     _this.localIds.push(localData)
					                  },
					                  fail: function (res) {
					                    mui.toast('该图片暂时无法查看')
					                  }
					                })
							}
							else{
								_this.localIds.push(e[0]) // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
							}
							e.splice(0,1)
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
			}
		}
	}
</script>

<style scoped>
	.mui-btn{
		height: 1rem;
		border-radius: 0;
	}
	.mui-inqui {
		height: .96rem;
		line-height: .94rem;
	}
	
	#textarea {
		padding: 10px 15px;
		font-size: .3rem;
		border: none;
	}
	
	.mui-inqu-update>div {
		float: left;
		margin: 0 10px 10px 0;
	}
	
	.numShow {
		position: absolute;
		bottom: 0px;
		right: 15px;
		font-size: 12px;
		color: #999
	}
	
	.upLoadImg {
		width: 1.4rem;
		height: 1.4rem;
	}
	
	.showpicList li {
		float: left;
	}
	
	.showpicBox {
		position: relative;
		width: 1.4rem;
		height: 1.4rem;
		margin-right: 0.2rem;
		margin-bottom: 0.2rem;
	}
	
	.showUpLoad {
		width: 1.4rem;
		height: 1.4rem;
		border-radius: 0.08rem;
	}
	
	.delUpLoad {
		width: 0.36rem;
		height: 0.36rem;
		position: absolute;
		top: 0;
		right: 0;
	}
	
	.mui-delBtn {
		width: 50%;
		display: inline-block;
		float: left;
		border: none;
		color: #18BC9A;
		border-radius: 0;
	}
	
	.mui-addBtn {
		width: 50%;
		display: inline-block;
		float: left;
	}
	
	.mui-delBtn:enabled:active {
		background-color: #eee !important;
		color: #999 !important;
	}
</style>