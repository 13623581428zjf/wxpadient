<template>
	<div id="refreshContainer" class="mui-content mui-scroll-wrapper" ref='scrollRight'>
		<div class="mui-content">
			<!--团队详情-->
			<div class="teamdetailxq">
				<div class="teamdetailxqlogo">
					<img :src="entity.picture" alt="头像" v-if="entity.picture" />
					<img src="../../assets/img/docter_head.png" alt="头像" v-else />
				</div>
				<div class="teamdetailxqname">{{entity.teamName}}</div>
			</div>
			<!--详情-->
			<div class="teamdetailContainer">
				{{entity.text}}
			</div>
			<!--团队列表-->
			<div style="margin-top: 0.2rem;">
				<!--团队成员-->
				<div class="teamdetailCy">
					团队成员
				</div>
				<div class="teamdetaillist" v-for="item in gitMonmer" @tap="docterOption(item)">
					<div class="teamdetaillistft">
						<div>
							<img :src="item.picture" alt="头像" v-if="item.picture != undefined" />
							<img src="../../assets/img/p2404647190.jpg" alt="头像" v-else />
						</div>
					</div>
					<div class="teamdetaillistRi">
						<div class="teamdetaillisname">{{item.name}}</div>
						<div class="teamdetaillistT">{{item.jobName}}&nbsp;&nbsp;|&nbsp;&nbsp;{{item.deparment}}</div>
					</div>
				</div>
				<div></div>
			</div>
			<!--没有商品时显示此图片文字-->
			<div class='default' v-show="picShow" style="background:#ECECEC;">
				<img src="../../assets/img/default.png" alt="" class='defaultImg' />
				<p style="background:#ECECEC;" class='defalutText'>暂无相关数据</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				//团队成员
				gitMonmer: [],
				entity: {},
				nameDoct: '',
				imgDoc: '',
				contant: '',
				teamId: '',
				pageIndex: 1,
				pageSize: 10,
				oldPartyId: '',
				picShow: false,
			}
		},
		mounted() {
			this.teamId = this.$route.query.teamId;
			this.oldPartyId = this.$route.query.partyId;
			console.log(this.oldPartyId)
			this.getDoctor();
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
			//获取医生详情
			getDoctor() {
				this.postRequest('/weixin/doctorTeam/teamItem', {
					teamId: parseInt(this.teamId),
					pageIndex: 1,
					pageSize: 10
				}).then((data) => {
					if(data && data.code === 0) {
						this.entity = data.entity;
						this.gitMonmer = data.dataList;
						if(data.dataList.length == 0) {
							this.picShow = true;
						}
					} else {
						mui.toast(data.msg);
					}
				})
			},
			//团队成员跳转详情
			docterOption(item) {
				this.postRequest('/weixin/doctorTeam/judge', {
					oldPartyId: parseInt(this.oldPartyId),
					partyId: parseInt(item.partyId),
				}).then((data) => {
					if(data && data.code === 0) {
						this.$router.push({
							name: '/docter/doctorMain',
							query: {
								partyId: item.partyId
							}
						})
					} else {
						mui.toast(data.msg);
					}
				})
			},
			//下拉刷新，上拉加载
			pullfreshDown() {
				this.postRequest('/weixin/doctorTeam/teamItem', {
					teamId: parseInt(this.teamId),
					pageIndex: 1,
					pageSize: 10
				}).then((data) => {
					this.gitMonmer = data.dataList;
					mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
					mui('#refreshContainer').pullRefresh().refresh(true); //重置上拉刷新
				})
			},
			pullfreshUp() {
				if(this.gitMonmer.length < (this.pageSize - 1)) {
					mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
					return;
				}
				this.pageIndex++;
				this.postRequest('/weixin/doctorTeam/teamItem', {
					teamId: parseInt(this.teamId),
					pageIndex: this.pageIndex,
					pageSize: 10
				}).then((data) => {
					console.log(data)
					if(data.dataList.length == 0) {
						mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
					} else {
						for(var i = 0; i < data.dataList.length; i++) {
							this.gitMonmer.push(data.dataList[i]);
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
	
	.teamdetailxq {
		width: 100%;
		height: 1.24rem;
		line-height: 1.24rem;
		background: #fff;
		display: flex;
		border-bottom: .01rem solid #E6E6E6;
		text-align: left;
	}
	
	.teamdetailxqlogo {
		width: 18%;
		text-align: center;
	}
	
	.teamdetailxqlogo img {
		width: .64rem;
		height: .64rem;
		margin: .3rem 0;
		border-radius: .32rem;
	}
	
	.teamdetailxqname {
		width: 72%;
		font-size: .32rem;
		color: #333333;
	}
	
	.teamdetailContainer {
		width: 100%;
		line-height: .4rem;
		background: #fff;
		font-size: .28rem;
		color: #999999;
		padding: .15rem .3rem;
		text-align: left;
	}
	
	.teamdetailCy {
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		margin-top: .2rem;
		background: #fff;
		padding-left: .3rem;
		font-size: .28rem;
		color: #666666;
		letter-spacing: 0;
		border-bottom: .01rem solid #E6E6E6;
		text-align: left;
	}
	
	.teamdetaillist {
		width: 100%;
		height: 1.36rem;
		border-bottom: .01rem solid #E6E6E6;
		background: #fff;
		display: flex;
	}
	
	.teamdetaillistft {
		width: 20%;
		text-align: right;
		text-align: center;
	}
	
	.teamdetaillistft img {
		width: 1rem;
		height: 1rem;
		margin: .16rem 0;
		border-radius: .5rem;
	}
	
	.teamdetaillistRi {
		width: 80%;
		padding-top: .3rem;
		text-align: left;
	}
	
	.teamdetaillisname {
		font-size: .34rem;
		height: .4rem;
		color: #333333;
	}
	
	.teamdetaillistT {
		font-size: .26rem;
		color: #BFBFBF;
		margin-top: .04rem;
	}
</style>