<template>
	<div class="mui-content" id="app" v-cloak>
		<!--医生团队-->
		<div id="refreshContainer" class="mui-content mui-scroll-wrapper" style="background-color:#ECECEC;margin-top: 0%;" ref='scrollRight'>
			<div>
				<div class="doctoritrm" v-for="item in docterList" @tap="docterTeanOption(item)">
					<div class="doLeft">
						<div class="doctoritrmlog">
							<img :src="item.img" alt="头像" v-if="item.img != undefined" />
							<img src="../../assets/img/p2404647190.jpg" alt="头像" v-else />
						</div>
					</div>
					<div class="doLeRight">
						<div class="doLeRightname">
							{{item.teamName}}
						</div>
						<div class="doLeRightnametwo">
							{{item.text}}
						</div>
					</div>
				</div>
				<div></div>
			</div>
			<!--没有商品时显示此图片文字-->
			<div class='default' v-show="picShow" style="background:#ECECEC;">
				<img src="../../assets/img/default.png" alt="" class='defaultImg'/>
			    <p style="background:#ECECEC;" class='defalutText'>暂无相关数据</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				pageIndex: 1,
				pageSize: 10,
				docterList: [],
				partyId: '',
				picShow: false,
			}
		},
		mounted() {
			this.partyId = this.$route.query.id;
			this.getDataList();
			for(var i = mui.hooks.inits.length - 1, item; i >= 0; i--) {
				item = mui.hooks.inits[i];
				if(item.name == "pullrefresh") {
					item.repeat = true;
				}
			};
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
			//获取医生团队信息
			getDataList() {
				this.postRequest('/weixin/doctorTeam/teams', {
					partyId: this.partyId,
					pageIndex: 1,
					pageSize: 10,
				}).then((data) => {
					if(data && data.code === 0) {
						this.docterList = data.dataList;
						if(data.dataList.length == 0) {
							this.picShow = true;
						}
					} else {
						mui.toast(data.msg);
					}
				})
			},
			//团队详情
			docterTeanOption(item) {
				console.log(this.partyId)
				this.$router.push({
					name: '/team/teamdetails',
					query: {
						teamId: item.teamId,
						partyId: this.partyId
					}
				})
			},
			//下拉刷新，上拉加载
			pullfreshDown() {
				this.postRequest('/weixin/doctorTeam/teams', {
					partyId: this.partyId,
					pageIndex: 1,
					pageSize: 10,
				}).then((data) => {
					this.docterList = data.dataList;
					mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
					mui('#refreshContainer').pullRefresh().refresh(true); //重置上拉刷新
				})
			},
			pullfreshUp() {
				this.pageIndex++;
				this.postRequest('/weixin/doctorTeam/teams', {
					partyId: this.partyId,
					pageIndex: this.pageIndex,
					pageSize: 10,
				}).then((data) => {
					console.log(data)
					if(data.dataList.length == 0) {
						mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
					} else {
						for(var i = 0; i < data.dataList.length; i++) {
							this.docterList.push(data.dataList[i]);
						}
						mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
					}
				})
			}
		}

	}
</script>

<style scoped>
	* {
		touch-action: pan-y;
	}
	
	.doctoritrm {
		width: 100%;
		height: 2rem;
		background: #fff;
		display: flex;
		margin: 0rem 0;
		border-bottom: .01rem solid gainsboro;
	}
	
	.doLeft {
		width: 20%;
		height: auto;
		text-align: right;
	}
	
	.doctoritrmlog img {
		width: 1.24rem;
		height: 1.24rem;
		margin-top: .24rem;
		border-radius: 0.62rem;
	}
	
	.doLeRight {
		width: 80%;
		padding: .29rem .2rem;
		text-align: left;
	}
	
	.doLeRight .doLeRightname {
		width: 100%;
		font-size: .32rem;
		color: #333333;
		margin-top: .1rem;
	}
	
	.doLeRight .doLeRightnametwo {
		width: 100%;
		height: 1rem;
		background: #fff;
		font-size: .28rem;
		color: #999999;
		padding: .15rem .01rem;
		text-align: left;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
		word-break: normal;
	}
</style>