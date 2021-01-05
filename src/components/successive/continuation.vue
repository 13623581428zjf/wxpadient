<template>
	<div class="mui-content">
		<ul class="continuation">
			<li @click="doction(0)" :class="{active:index==0}">全部</li>
			<li @click="doction(1)" :class="{active:index==1}">已申请</li>
			<li @click="doction(2)" :class="{active:index==2}">已续方</li>
			<li @click="doction(3)" :class="{active:index==3}">已拒绝</li>
		</ul>
		<br /><br />
		<!--全部-->
		<div id="refreshContainer" class="mui-content mui-scroll-wrapper" style="background-color:#ECECEC;margin-top: 10.6%;" ref='scrollRight'>
			<div>
				<div class="allcon" v-for="item in dataList" @click="continuation(item)">
					<div class="allconlist">
						<div class="allconlo">NO.{{item.id}}</div>
						<div class="hace" v-if='item.status==0'>已申请</div>
						<div class="hace" v-if='item.status==1'>已续方</div>
						<div class="hace" v-if='item.status==2' style="color: #9C9C9C;">已拒绝</div>
						<div class="hace" v-if='item.status==3'>已取消</div>
					</div>
					<div class="allTop">
						<div class="doctory">开方医生:&nbsp;{{item.name}}&nbsp;{{item.hospital}}</div>
						<div class="result">整断结果:&nbsp;{{item.caseResult}}</div>
						<div class="datadoc">开方日期:&nbsp;{{item.createDate|areaCut}}</div>
						<div class="timedoc">申请时间:&nbsp;{{item.againCreateDate}}</div>
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
				index: 0,
				pageIndex: 1,
				pageSize: 10,
				dataList: [],
				status: '',
				picShow: false,
			}
		},
		mounted() {
			this.getAlladd();
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
			doction: function(value) {
				this.index = value;
				if(this.index == 0) {
					this.status = ''
				}
				if(this.index == 1) {
					this.status = '0'
				}
				if(this.index == 2) {
					this.status = '1'
				}
				if(this.index == 3) {
					this.status = '2'
				}
				this.picShow = false;
				this.getAlladd();

			}, //获取所有数据
			getAlladd() {
				this.postRequest('/weixin/recipeAgain/getRecipeAgainList', {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
					status: this.status
				}).then((data) => {
					if(data && data.code === 0) {
						this.dataList = data.dataList;
						if(data.dataList.length == 0) {
							this.picShow = true;
						}
					} else {
						mui.toast(data.msg);
					}
				})
			},
			//续方详情
			continuation(item) {
				this.$router.push({
					name: '/successive/continuationOption',
					query: {
						id: item.id,
						againId: item.againId,
						caseResult: item.caseResult,
					}
				})
			},
			//下拉刷新，上拉加载
			pullfreshDown() {
				this.postRequest('/weixin/recipeAgain/getRecipeAgainList', {
					pageIndex: 1,
					pageSize: 10,
					status: this.status
				}).then((data) => {
					this.dataList = data.dataList;
					mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
					mui('#refreshContainer').pullRefresh().refresh(true); //重置上拉刷新
					this.pageIndex = 1;

				})
			},
			pullfreshUp() {
				this.pageIndex++;
				this.postRequest('/weixin/recipeAgain/getRecipeAgainList', {
					pageIndex: this.pageIndex,
					pageSize: 10,
					status: this.status
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
			areaCut: function(value) {
				if(!value) return '';
				return value.substring(0, value.length - 9);
			}
		},
	}
</script>

<style scoped>
	* {
		touch-action: pan-y;
	}
	
	.continuation {
		width: 100%;
		height: .8rem;
		line-height: .8rem;
		background: #fff;
		display: flex;
		border-bottom: .01rem solid #ECECEC;
		position: fixed;
		top: 0;
	}
	
	.continuation li {
		font-size: .28rem;
		color: #5D5D5D;
		text-align: center;
		letter-spacing: 0.006rem;
		margin-left: 12%;
	}
	
	.active {
		color: #18BC9A;
		border-bottom: .04rem solid #18BC9A;
	}
	
	.allconlist {
		width: 100%;
		height: .8rem;
		line-height: .8rem;
		background: #fff;
		display: flex;
		padding-left: .3rem;
		padding-right: .2rem;
		border-bottom: .01rem solid #ECECEC;
	}
	
	.allconlo {
		font-size: .26rem;
		color: #666666;
		width: 87%;
		letter-spacing: 0.0056rem;
		text-align: left;
	}
	
	.hace {
		font-size: .26rem;
		color: #18BC9A;
		letter-spacing: 0.0056rem;
	}
	
	.allTop {
		width: 100%;
		height: 2.4rem;
		background: #fff;
		padding: .2rem;
		font-size: .30rem;
		color: #333333;
		letter-spacing: 0.0064rem;
		text-align: left;
	}
	
	.doctory,
	.result,
	.datadoc,
	.timedoc {
		height: .5rem;
		line-height: .5rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>