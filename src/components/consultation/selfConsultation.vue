<template>
	<div class="mui-content">
		<div id="refreshContainer" class="mui-content mui-scroll-wrapper" style="background-color:#ECECEC;margin-top: 0%;" ref='scrollRight'>
			<div>
				<ul class="mui-table bg-fff">
					<li @click="detailSee()" v-for="item in dataList" @tap="option(item)" style="height: 1.4167rem;line-height: .64rem;border-bottom:.01rem solid #F4F4F4;">
						<div class="disFlex">
							<div class="pull-left" style="position:relative;">
								<span v-if="item.status=='N'" class="mui-badge mui-badge-danger" style="position:absolute;right:-2px;top:4px;background-color:#F43530; padding: 5px 5px;"></span>
								<img class="imgs" :src="item.url" alt="头像" v-if="item.url != undefined" />
								<img class="imgs" src="../../assets/img/docter_head.png" alt="头像" v-else />
							</div>
							<div class="mui-media-body pull-right " style="margin-left: 15px;width: 100%;">
								<p class="clearfix" style="margin-top:.1rem;width: 100%;">
									<span class="color-333 font-px16 pull-left" style="width: 70%;font-size: 17px;">{{item.name}}</span>
									<span v-if="new Date(item.date).toDateString() != new Date().toDateString()" style="color:#CCCCCC;">{{item.date |areaCut}}</span>
									<span v-else style="color:#CCCCCC;margin-left: .73rem;">{{item.date |areaCutData}}</span>
								</p>
								<p class="color-999 font-px14 text-over" v-if="item.type=='text'" style="width: 5.8rem;">{{item.content}}</p>
								<p class="color-999 font-px14 text-over" v-else>[图片]</p>
							</div>
						</div>
					</li>
				</ul>
				<!--没有商品时显示此图片文字-->
				<div class='default' v-show="picShow" style="background:#ECECEC;">
					<img src="../../assets/img/default.png" alt="" class='defaultImg' />
					<p style="background:#ECECEC;" class='defalutText'>暂无相关数据</p>
				</div>
				<div></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				pageIndex: 1,
				pageSize: 10,
				picShow: false,
				dataList: [],
				time: '',
			}
		},

		mounted() {
			//获取医生留言列表
			this.detailSee();
			for(var i = mui.hooks.inits.length - 1, item; i >= 0; i--) {
				item = mui.hooks.inits[i];
				if(item.name == "pullrefresh") {
					item.repeat = true;
				}
			}
			//上拉刷新下拉加载
			mui.init({
				pullRefresh: {
					container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
					down: {
						height: 50, //可选,默认50.触发下拉刷新拖动距离,
						auto: false, //可选,默认false.自动下拉刷新一次
						contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
						contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
						contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
						callback: this.pullfreshDown //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
					},
					up: {
						height: 50, //可选.默认50.触发上拉加载拖动距离
						auto: false, //可选,默认false.自动上拉加载一次
						contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
						contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
						callback: this.pullfreshUp //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
					}
				}
			});
		},
		methods: {
			//获取医生留言列表
			detailSee() {
				this.postRequest('/weixin/chat/findMyChat', {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}).then((data) => {
					if(data && data.code === 0) {
						this.dataList = data.dataList;
						if(data.dataList.length == 0) {
							this.picShow = true;
						}
						console.log(data.dataList)

					} else {
						mui.toast(data.msg);
					}
				})
			},
			option(item) {
				this.$router.push({
					name: '/consultation/consultChat',
					query: {
						partyId: item.partyId
					}
				})
			},
			isToday(str) {
				if(new Date(str).toDateString() === new Date().toDateString()) {
					//今天
					return 'Y'
				} else if(new Date(str) < new Date()) {
					//之前
					return 'N'
				}
			},
			//下拉刷新，上拉加载
			pullfreshDown() {
				this.postRequest('/weixin/chat/findMyChat', {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}).then((data) => {
					this.dataList = data.dataList;
					mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
					mui('#refreshContainer').pullRefresh().refresh(true); //重置上拉刷新
					this.pageIndex = 1;
				})
			},
			pullfreshUp() {
				this.pageIndex++;
				this.postRequest('/weixin/chat/findMyChat', {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}).then((data) => {
					console.log(data)
					if(data.dataList.length == 0) {
						this.pageIndex = 1;
						mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
					} else {
						for(var i = 0; i < data.dataList.length; i++) {
							this.dataList.push(data.dataList[i]);
						}
						mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
					}
				})
			}
		},
		filters: {
			areaCutData: function(value) {
				if(!value) return '';
				return value.substring(10, value.length - 3);
			},
			areaCut: function(value) {
				if(!value) return '';
				return value.substring(0, value.length - 8);
			}
		},
	}
</script>

<style scoped>
	* {
		touch-action: pan-y;
	}
	
	.imgs {
		width: 1.0417rem;
		height: 1.0417rem;
		margin: .2rem 0rem;
		border-radius: 0.62rem;
		margin-left: .2rem;
	}
	
	.disFlex {
		display: flex;
	}
</style>