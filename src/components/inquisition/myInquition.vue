<template>
	<div class="mui-content">
		<div>
			<div class="mui-inqui pd-leftright-px15 bg-fff border-top ">
				<span class="pull-left font-px16 color-333">问诊时间</span>
				<span class="pull-right font-px14 color-999">{{info.fromDate}}&nbsp;{{info.weekDay|weekfilters}}&nbsp;{{info.fromTime|cutTime}}-{{info.thruTime|cutTime}}</span>
			</div>
			<div class="mui-inqui mui-inqui-active pd-leftright-px15 bg-fff border-top" @click="selectTime($event)">
				<span class="pull-left font-px16 color-333">问诊类型</span>
				<span class="pull-right font-px14 color-999"><span>{{type}}&nbsp;&nbsp;</span>
				<img src="../../assets/img/next.png" style="width: .16rem;height:.28rem; vertical-align: middle;" alt="">
				</span>
			</div>
			<div class="mui-inqui pd-leftright-px15 bg-fff mg-bottom-px10 border-top">
				<span class="pull-left font-px16 color-333">问诊人</span>
				<span class="pull-right font-px14 color-999">{{user.patientName}}&nbsp;&nbsp;{{user.patientSex}}&nbsp;&nbsp;{{user.patientAge|reckonAge}}岁 </span>
			</div>
			<div class="mui-inqui mui-inqui-active pd-leftright-px15 bg-fff border-bt" @click="$router.push({name:'/docter/selectCase',query:{inquisitionType:inquisitionType,desc:desc,localIds:localIds}})">
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
				<div v-for='(item,index) in localIds' class='showpicBox'>
					<img :src="item" style="width:1.4rem; height:1.4rem;" alt="上传图片">
					<img src="../../assets/img/delUploadImg.png" class='delUpLoad' @click="delImg(index)" alt="删除图片">
				</div>
				<div>
					<img src="../../assets/img/Group@2x.png" @click="updataImg()" style="width:1.4rem; height:1.4rem;" alt="上传图片">
				</div>
			</div>
		</div>
		<div class="mui-popup mui-popup-in" v-show="isShow">
			<div class="mui-popup-inner">
				<div class="clearfix mui-mode" style="padding-bottom: 10px;" @click="inquiMode('text')" v-if='info.inquisitionType=="text"||info.inquisitionType=="all"'>
					<div class="pull-left">
						<img src="../../assets/img/twwz.png" style="width: 0.8rem;height:0.8rem;" alt="">
					</div>
					<div class="pull-left" style="margin-left: 10px">
						<p class="font-px16 color-333">图文问诊</p>
						<p class="font-px12 color-999">通过图文/语音进行问诊</p>
					</div>
					<div class="pull-right">
						<p class="font-px16 color-18BC9A" style="line-height: .8rem">¥{{info.textPrice}}/次</p>
					</div>
				</div>
				<div class="clearfix mui-mode border-top" style="padding-top: 10px;" @click="inquiMode('video')" v-if='info.inquisitionType=="video"||info.inquisitionType=="all"'>
					<div class="pull-left">
						<img src="../../assets/img/livewz.png" style="width: 0.8rem;height:0.8rem;" alt="">
					</div>
					
					<div class="pull-left" style="margin-left: 10px">
						<p v-if="info.inquisitionType=='video'" style="width: 113%;background:#FAFAFA;height:.21rem;position: absolute;top:.23rem;left: -.8rem;"></p>
						<p class="font-px16 color-333">视频问诊</p>
						<p class="font-px12 color-999">通过视频进行问诊</p>
					</div>
					<div class="pull-right">
						<p class="font-px16 color-18BC9A" style="line-height: .8rem">¥{{info.price}}/次</p>
					</div>
				</div>
			</div>
		</div>
		<div class="mui-popup-backdrop mui-active" v-show="isShow"></div>
		<div class="footer">
			<button type="button" class="mui-btn mui-btn-success" @click='saveInquition()'>提交</button>
		</div>
	</div>
</template>

<script>
	import { getStore, setStore } from "@/utils/storage";
	import wx from 'weixin-js-sdk'
	export default {
		data() {
			return {
				start: 0,
				remnant: 500,
				desc: "",
				isShow: false,
				type: '请选择',
				localIds: [],
				consultationTime: '2018-10-19',
				time: ' 周四 8:00-9:00',
				inquisitionType: '',
				serverList: [],
				partyId: '',
				schedulingId: '',
				inquisitionType1:'',
				week:'',
				fromTime:'',
				thruTime:'',
				date:'',
				name:'',
				age:'',
				sex:'',
				info:{},
				queryPictureList:[],
				user:{}
			}
		},
		filters: {
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
			timeCut: function(value) {
				if(!value) return '';
				return value.substring(0, value.length - 3);
			}
		},
		mounted: function() {
			this.getappId();
			if(this.$route.query.content) {
				this.desc = this.$route.query.content
				this.queryPictureList = this.$route.query.queryPictureList
				if(this.queryPictureList) {
					for(var i = 0; i < this.queryPictureList.length; i++) {
						this.localIds.push(this.queryPictureList[i].url)
						this.serverList.push(this.queryPictureList[i].url)
					}
				}
			}else{
				if(this.$route.query.desc){
					this.desc = this.$route.query.desc
					this.start=this.desc.length
				}
				console.log(this.$route.query.localIds)
				if(this.$route.query.localIds&&this.$route.query.localIds>0){
					this.localIds = this.$route.query.localIds
					this.serverList.push(this.$route.query.localIds)
				}
			}
			this.inquisitionType = this.$route.query.inquisitionType
			if(this.inquisitionType == 'text') {
				this.type = '图文问诊';
			} else if(this.inquisitionType == 'video') {
				this.type = '视频问诊';
			} else {
				this.type = '请选择';
			}
			this.schedulingId=getStore('schedulingId')
			this.date=getStore('date')
			this.getMsg()
		},
		methods: {
			descInput: function() {
				if(this.desc) {
					this.remnant = 500 - this.desc.length;
					this.start = 0 + this.desc.length;
				}
			},
			selectTime: function(event) {
				var event = event.currentTarget;
				this.isShow = true;
			},
			inquiMode: function(type) {
				if(type == 'text') {
					this.type = '图文问诊';
					this.inquisitionType = 'text'
				} else {
					this.type = '视频问诊';
					this.inquisitionType = 'video'
				}
				this.isShow = false;
			},
			delImg(index) {
				this.localIds.splice(index, 1)
				this.serverList.splice(index, 1)
			},
			getMsg() {
				this.postRequest('/weixin/order/findSchedulingDes', {
					type: 'inquisition',
					schedulingId: this.schedulingId,
					fromDate: this.date
				}).then((data) => {
					this.info = data.data;
					this.user=data.user
					this.partyId = data.data.partyId;
				})
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
			//保存问诊信息
			saveInquition() {
				//				var reg=/^[A-Za-z\u4e00-\u9fa5]+$/
				if(!this.inquisitionType) {
					mui.toast('请选择问诊类型！');
				} else if(!this.desc) {
					mui.toast('病情描述不能为空！');
				} else if(this.desc.length < 10) {
					mui.toast('病情描述最少输入10个字！');
				}
				//				else if(!reg.test(this.desc)){
				//					mui.toast('不能输入表情图片！');
				//				}
				else {
					this.postRequest('/weixin/order/createdOrder', {
						consultationTime: this.date,
						partyId: parseInt(this.partyId),
						schedulingId: parseInt(this.schedulingId),
						description: this.desc,
						inquisitionType: this.inquisitionType,
						type: 'inquisition',
						urlList: this.serverList
					}).then((data) => {
						if(data.code == 0) {
							mui.toast('预约成功')
							this.$router.push('/inquisition/selfInqui')
						} else {
							mui.toast(data.msg)
						}
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
	
	.showpicBox {
		position: relative;
		width: 1.4rem;
		height: 1.4rem;
		margin-right: 0.2rem;
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
	
	.clearfix {}
</style>