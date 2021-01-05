<template>
	<div class="mui-content" id="app" v-cloak>
		<ul class="continuation">
			<li @click="doction(0)" :class="{active:index==0}">全部</li>
			<li @click="doction(1)" :class="{active:index==1}">待取药</li>
			<li @click="doction(2)" :class="{active:index==2}">取药中</li>
			<li @click="doction(3)" :class="{active:index==3}">可续方</li>
		</ul>
		<br /><br />
		<!--全部-->
		<div id="refreshContainer" class="mui-content mui-scroll-wrapper" style="background-color:#ECECEC;margin-top: 10.7%;" ref='scrollRight'>
			<div>
				<div @tap="contionOption(item)" v-for="(item,index) in allDatas" :key='index' class="cont">
					<div class="allconlist">
						<div class="allconlo">NO.{{item.id}}</div>
						<div class="hace" v-if='item.status==1'>待取药</div>
						<div class="hace" v-if='item.status==5'>取药中</div>
						<div class="hace" v-if='item.status==3'>已取药</div>
						<div class="hace" v-if='item.status==4'>已过期</div>
					</div>
					<div class="allTop">
						<div class="doctory">开方医生:&nbsp;{{item.name}}&nbsp;&nbsp;{{item.deparment}}</div>
						<div class="result">诊断结果:&nbsp;{{item.caseResult}}</div>
						<div class="datadoc">开方日期:&nbsp;{{item.createDate|areaCut}}</div>
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
				allDatas: [],
				createDate: '',
				picShow: false,
			}
		},
		mounted() {
			//获取所有数据
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
			//tab切换
			doction: function(value) {
				this.index = value;
				this.picShow = false;
				this.getAlladd();
			},
			//获取所有数据
			getAlladd() {
				this.postRequest('/weixin/recipe/getRecipeList', {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
					style: this.index
				}).then((data) => {
					if(data && data.code === 0) {
						this.allDatas = data.dataList;
						if(data.dataList.length == 0) {
							this.picShow = true;
						}
					} else {
						mui.toast(data.msg);
					}
				})
			},
			//处方详情
			contionOption(item) {
				this.$router.push({
					name: '/successive/prescription',
					query: {
						id: item.id,
						caseResult: item.caseResult
					}
				})
			},
			//下拉刷新，上拉加载
			pullfreshDown() {
				this.postRequest('/weixin/recipe/getRecipeList', {
					pageIndex: 1,
					pageSize: 5,
					style: this.index
				}).then((data) => {
					this.allDatas = data.dataList;
					mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
					mui('#refreshContainer').pullRefresh().refresh(true); //重置上拉刷新
					this.pageIndex = 1;
				})
			},
			pullfreshUp() {
				this.pageIndex++;
				this.postRequest('/weixin/recipe/getRecipeList', {
					pageIndex: this.pageIndex,
					pageSize: 5,
					style: this.index
				}).then((data) => {
					console.log(data)
					if(data.dataList.length == 0) {
						this.pageIndex = 1;
						mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
					} else {
						for(var i = 0; i < data.dataList.length; i++) {
							this.allDatas.push(data.dataList[i]);
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
		border-bottom: .01rem solid #E0E0E0;
		position: fixed;
		top: 0px;
	}
	.cont{
		margin: .15rem 0;
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
		width: 86%;
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
		height: 2rem;
		background: #fff;
		padding: .2rem;
		font-size: .30rem;
		color: #333333;
		letter-spacing: 0.0064rem;
		text-align: left;
	}
	
	.doctory,
	.result,
	.datadoc {
		height: .5rem;
		line-height: .5rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.datadoc {}
	
	.aside {
		width: 100%;
		height: 100%;
		text-align: center;
		padding-top: 50%;
	}
	
	.aside img {
		width: 3.5rem;
		height: 3.5rem;
	}
	
	.aside>div {
		font-size: .32rem;
		color: #333;
	}
</style>