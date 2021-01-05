<template>
	<div class="mui-content">
		<!--数据列表-->
		<div class="wrapper" ref="wrapper">
			<ul class="content">
				<ul class="mui-table-view mui-table-view-chevron pd-leftright-px15" v-for="(item,index) in sList" :key='index'>
					<li class="clearfix" v-if="item.partyId!=NewpartyId">
						<div style="text-align:center;">
							<p class="font-px12" style="margin:20px 0 10px 0;">{{item.date}}</p>
						</div>
						<div class="mui-chat-cen-others pull-left">
							<img :src="item.url" style="width:.8rem;height:.8rem;float: left; border-radius:50%;" alt="" v-if="item.url != undefined">
							<img style="width:.8rem;height:.8rem;float: left; border-radius:50%;" src="../../assets/img/docter_head.png" alt="头像" v-else />
							<div class="others-news">
								<p v-if="item.type=='picture'"><img class="imgtest" @click="imgBig(item.content)" :src="item.content" alt="" ref="img" /></p>
								<p v-else-if="item.type== undefined">{{item.content}}</p>
								<p v-else>{{item.content}}</p>
							</div>
							<span class="others-triangle"></span>
							<p></p>
						</div>
					</li>
					<li class="clearfix" v-else>
						<div style="text-align:center;">
							<p class="font-px12" style="margin:20px 0 10px 0;">{{item.date}}</p>
						</div>
						<div class="mui-chat-cen-self pull-right mg-bottom-px10">
							<img :src="item.url" style="width:.8rem;height:.8rem; float: right; border-radius:50%;" alt="" v-if="item.url != undefined">
							<img src="../../assets/img/docter_head.png" style="width:.8rem;height:.8rem; float: right; border-radius:50%;" alt="" v-else>
							<div class="self-news">
								<p v-if="item.type=='picture'"><img @click="imgBig(item.content)" ref="img" class="imgtest" :src="item.content" alt="" /></p>
								<p v-else-if="item.type== undefined">{{item.content}}</p>
								<p v-else>{{item.content}}</p>
							</div>
							<span class="self-triangle"></span>
						</div>
					</li>
				</ul>
			</ul>
		</div>
		<div class="footer" style="background-color:#E6E6E6;text-align: left; z-index: 3;" ref='topLi'>
			<img @click="updataImg()" style="width: .45rem;height: .45rem;position: relative;top: -.28rem;left: .24rem;" src="../../assets/img/conde.png" />
			<textarea id="textarea" ref='textarea' style="width:5.0rem;height:.76rem; font-size: 14px;margin:6px 20px;padding:8px 15px 0;" maxlength="500" @input="descInput($event)" v-model="desc" placeholder="说说你的问题…"></textarea>
			<button class="mui-chat-quiz" style="color:#888888;font-size:16px;line-height:.96rem;" v-show="this.desc==''">提问</button>
			<button class="mui-chat-quiz" style="color:#18BC9A;font-size:16px;line-height:.96rem;" @click="success()" v-show="this.desc!=''">提问</button>
		</div>
		<div class="img-box" v-show="swiperShow" @click="hideSwiper">
			<div></div><img :src="imageUrl" alt="" /></div>
	</div>
</template>

<script>
	import { setStore, getStore, getSession, setSession } from "@/utils/storage";
	import BScroll from 'better-scroll';
	import wx from 'weixin-js-sdk'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		components: {
			swiper,
			swiperSlide
		},
		data() {
			return {
				swiperShow: false,
				imageUrl: '',
				start: 0,
				remnant: 500,
				desc: "",
				isShow: false,
				pageIndex: 1,
				pageSize: 10,
				type: '请选择',
				NewpartyId: '',
				sList: [],
				list: 100,
				type: '',
				//图片
				localIds: [],
				imgPic: '',
				visible: false,
			}
		},
		mounted() {
			this.NewpartyId = getStore('partyId');
			//获取所有数据
			this.getall();
			//scroll初始化
			this.$nextTick(() => {
				this.scroll = new BScroll(this.$refs.wrapper, {
					click: true,
					tap: true,
					pullDownRefresh: {
						threshold: 50,
						top: 20
					},

				});
				//上拉加载更多
				this.scroll.on('pullingDown', () => {
					this.pageIndex++;
					this.postRequest('/weixin/chat/findChatDes', {
						pageIndex: this.pageIndex,
						pageSize: this.pageSize,
						partyId: parseInt(this.$route.query.partyId)
					}).then((data) => {
						if(data && data.code === 0) {
							if(data.dataList.length === 0) {
								//this.scroll.finishPullDown()
							} else {
								this.sList = data.dataList.concat(this.sList);
								console.log('data', data);
								this.scroll.finishPullDown()
								this.$nextTick(() => {
									this.scroll.refresh();
								})
								this.scroll.scrollTo(0, -1000, 100)
							}
						} else {
							mui.toast(data.msg);
						}

					})
				});
			})
			this.getappId();
		},
		methods: { //图片放大
			hideSwiper() {
				this.swiperShow = false;
				this.imageUrl = '';
			},
			imgBig(_url) {
				this.imageUrl = _url;
				this.swiperShow = true;
			},
			//获取聊天信息
			getall() {
				this.postRequest('/weixin/chat/findChatDes', {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
					partyId: parseInt(this.$route.query.partyId)
				}).then((data) => {
					if(data && data.code === 0) {
						if(data.dataList.length === 0) {
							//this.scroll.finishPullDown()
						} else {
							this.sList = data.dataList.concat(this.sList);
							console.log('data', data);
							this.scroll.finishPullDown()
							this.$nextTick(() => {
								this.scroll.refresh();
								//确保一进来滚动条至于底部
								this.scroll.scrollTo(0, this.scroll.maxScrollY, 100)
							})
						}
					} else {
						mui.toast(data.msg);
					}
				})
			},
			//回复
			success() {
				this.type = 'text'
				this.postRequest('/weixin/chat/cretedOrUpdateChat', {
					partyId: parseInt(this.$route.query.partyId),
					type: this.type,
					content: this.desc
				}).then((data) => {
					if(data && data.code === 0) {
						console.log(data.data);
						this.sList.push(data.data);
						this.desc = '';
						this.$nextTick(() => {
							this.scroll.refresh();
							//发送完消息滚动条底部
							this.scroll.scrollTo(0, this.scroll.maxScrollY, 100);
						})
					} else {
						mui.toast(data.msg);
					}
				})
				//重新更新底部高度
				var heightStyle = this.$refs.textarea.style.height; // ？px
				this.$refs.textarea.style.height = '40px';
				this.$refs.textarea.parentNode.style.height = '50px';
			},
			//图片
			updataImg() {
				console.log(1)
				var _this = this
				wx.chooseImage({
					count: 1, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: function(res) {
						_this.uploadImg(res.localIds);
					}
				})
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
					this.imgPic = data.filePath;
					this.type = 'picture'
					this.postRequest('/weixin/chat/cretedOrUpdateChat', {
						partyId: parseInt(this.$route.query.partyId),
						type: this.type,
						content: this.imgPic
					}).then((data) => {
						if(data && data.code === 0) {
							console.log(data.data);
							this.sList.push(data.data);
							this.$nextTick(() => {
								this.scroll.refresh();
								//发送完消息滚动条底部
								this.scroll.scrollTo(0, this.scroll.maxScrollY, 100)
							})
						} else {
							mui.toast(data.msg);
						}
					})
				})
			},
			//提问
			descInput: function(e) {
				var tg = e.currentTarget;
				tg.style.height = '40px';
				tg.style.overflow = 'hidden'
				if(tg.scrollHeight > 81) {
					tg.parentNode.style.height = '81px';
					tg.style.height = '71px';
					tg.style.overflow = 'auto'
				} else {
					tg.style.height = tg.scrollHeight + 'px';
					var height = parseInt(tg.style.height.substring(0, tg.style.height.length - 2)) + 10 + 'px';
					tg.parentNode.style.height = height;
				}
			}

		}
	}
</script>

<style scoped>
	* {
		touch-action: pan-y;
	}
	
	html,
	body,
	.mui-content {
		height: 100%;
	}
	
	.wrapper {
		height: calc(100% - 46px);
	}
	
	.wrapper {
		height: calc(100% - 46px);
	}
	
	.wrapper {
		height: calc(100% - 46px);
	}
	
	.mui-table-view .mui-chat-cen-self .self-news {
		background-color: #18BC9A;
		max-width: 5rem;
		padding: 10px;
		margin-right: 8px;
		float: left;
		display: block;
		border-radius: 3px;
		margin-left: 15px;
		word-break: break-all;
		/*英文字母换行*/
		word-wrap: break-word;
		/*英文单词换行*/
		/* white-space:pre-wrap; 中文换行*/
	}
	
	.mui-table-view .mui-chat-cen-self .self-news p {
		color: #fff;
		font-size: 16px;
	}
	
	.mui-table-view .mui-chat-cen-self {
		position: relative;
	}
	
	.self-triangle {
		width: .16rem;
		height: .16rem;
		background-color: #18BC9A;
		display: block;
		position: absolute;
		top: .32rem;
		right: .88rem;
		transform: rotate(315deg);
		border-radius: 0 0 3px 0;
	}
	
	.mui-chat-cen-self .mui-chat-self-pic {
		border-top: 1px solid #8AD7C1;
		margin-top: 6px;
		padding-top: 10px;
	}
	
	.mui-table-view .mui-chat-cen-others .others-news {
		background-color: #fff;
		max-width: 5rem;
		padding: 10px;
		margin-right: 15px;
		float: left;
		display: block;
		border-radius: 3px;
		margin-left: 8px;
		border: 1px solid #ccc;
		word-break: break-all;
		/*英文字母换行*/
		word-wrap: break-word;
		/*英文单词换行*/
		/* white-space:pre-wrap; 中文换行*/
	}
	
	.mui-table-view .mui-chat-cen-others .others-news p {
		color: #333;
		font-size: 16px;
	}
	
	.mui-table-view .mui-chat-cen-others {
		position: relative;
	}
	
	.others-triangle {
		width: .16rem;
		height: .16rem;
		background-color: #fff;
		display: block;
		position: absolute;
		top: .32rem;
		left: .88rem;
		transform: rotate(315deg);
		border-radius: 3px 0 0 0;
		border-left: 1px solid #ccc;
		border-top: 1px solid #ccc;
	}
	
	.mui-chat-quiz {
		border: none;
		background-color: transparent;
	}
	
	button:enabled:active {
		background-color: transparent;
	}
	
	.mui-table-view:after {
		height: 0;
	}
	
	.mui-table-view:before {
		height: 0;
	}
	
	.mui-table-view {
		background-color: transparent;
	}
	
	.imgs {
		width: .9rem;
		height: .9rem;
		border-radius: 0.62rem;
	}
	
	.imgtest {
		width: 1.6rem;
		height: 2.1rem;
	}
	
	.img-box {
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 9999999999;
		text-align: center;
		background-color: rgba(0, 0, 0, 1);
	}
	
	.img-box>div {
		display: inline-block;
		width: 1px;
		height: 100%;
		margin-left: -1px;
		vertical-align: middle;
	}
	
	.img-box>img {
		max-width: 100%;
		max-height: 100%;
		vertical-align: middle;
	}
</style>