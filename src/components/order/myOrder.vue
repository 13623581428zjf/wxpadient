<template>
	<div class="mui-content">
		<div>
			<div class="mui-segmented-control">
				<a href="javascript:;" class="mui-control-item" :class='{"mui-active":num==0}' @click='changeTab("",0)'>全部
					<span></span>
				</a>
				<a href="javascript:;" class="mui-control-item" :class='{"mui-active":num==1}' @click='changeTab("",1)'>待付款
					<span></span>
				</a>
				<a href="javascript:;" class="mui-control-item" :class='{"mui-active":num==2}' @click='changeTab("",2)'>待就诊
					<span></span>
				</a>
				<a href="javascript:;" class="mui-control-item" :class='{"mui-active":num==3}' @click='changeTab("",3)'>待取药
					<span></span>
				</a>
				<a href="javascript:;" class="mui-control-item" :class='{"mui-active":num==4}' @click='changeTab("",4)'>待评价
					<span></span>
				</a>
			</div>
		</div>
		<div id="refreshContainer" class="mui-content mui-order-list mui-scroll-wrapper" style="margin-top: 41px;">
			<div class=" mui-scroll">
				<ul class="mui-table-view mui-table-view-chevron" v-if='isShow=="N"'>
					<li>
						<div style="height: .8rem;line-height: .8rem;" class="pd-leftright-px15 bg-fff">
							<span class='orderTime'>下单时间：2018-07-22 10:00:00</span>
							<span class='payStatus1'>待支付</span>
							<span class='payStatus2'>待发货</span>
							<span class='payStatus2'>待收货</span>
						</div>
						<div style="padding:0.2rem 0.3rem" class='clearfix'>
							<img src="../../assets/img/p2404647190.jpg" class='mui-pic' alt="">
							<div class="pull-left" style="width:4.9rem">
								<p class='mui-name'>
									<span class='mui-name1'>双黄连口服液</span>&nbsp;&nbsp;
									<span class='mui-name2'>¥500.00</span>
								</p>
								<p class='mui-guig clearfix'>
									<span class='pull-left'>规格：10ml*10支</span>
									<span class='pull-right'>X1</span>
								</p>
								<p class='mui-address'>
									<img src="../../assets/img/time.png" alt="" class='mui-img-time'>
									<span class='mui-cj'>厂家：哈药集团哈药集团</span>
								</p>
							</div>
						</div>
						<div class='mui-total bg-fff color-666'>
							共1件商品 合计：¥28.00（含运费¥10.00）
						</div>
						<div style="height: .8rem;" class="pd-leftright-px15 bg-fff">
							<span class='actionText'>15分钟内未支付将自动取消</span>
							<span class='actionBtn'>
                                    <!-- <button type="button" id="confirmBtn" class="mui-btn mui-btn-outlined">删除订单</button> -->
                                    <button type="button" class="mui-btn mui-btn-outlined" @click="deleteOrder($event)">取消订单</button>
                                    <button type="button" class="mui-btn mui-btn-warning mui-btn-outlined" style="color: #F5A623;" @click="seeCase($event)">立即支付</button> 
                                    <!--<button type="button" class="mui-btn mui-btn-warning mui-btn-outlined" @click="seeCase($event)">确认收货</button>--> 
                                    <!--<button type="button" class="mui-btn  mui-btn-outlined" @click="seeCase($event)">药店导航</button>--> 
                                </span>
						</div>
					</li>
				</ul>
				<div v-else>
					<img src="../../assets/img/default.png" alt="" class='defaultImg'/>
					<p class='defalutText'>暂无相关数据</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				pageIndex:1,
				isShow:'Y',
				num:0
			}
		},
		mounted() {
			mui.init({
				pullRefresh: {
					container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
					down: {
						height: 50, //可选,默认50.触发下拉刷新拖动距离,
						auto: true, //可选,默认false.自动下拉刷新一次
						contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
						contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
						contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
						callback:this.pullfreshDown //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
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
			changeTab(status,index){
				this.num=index
			},
			deleteOrder(e) {
				var btnArray = ['取消', '确定'];
				mui.confirm('', '你确定取消订单吗？', btnArray, function(e) {
					console.log('nice');
				})
			},
			seeCase() {
				mui.openWindow({
					url: '../checkRecords.html',
					extras: {
						name: 'mui' //扩展参数
					}
				});
			},
			pullfreshDown() {
				this.postRequest("/weixin/Doctorlist",{
					pageIndex: this.pageIndex,
					pageSize: 10
				}).then((data)=>{
					this.lists = data.dataList;
					mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
					mui('#refreshContainer').pullRefresh().refresh(true); //重置上拉刷新
					this.pageIndex = 1;
				})
			},
			//上拉加载
			pullfreshUp() {
				this.pageIndex++;
				this.postRequest("/weixin/Doctorlist",{
					pageIndex: this.pageIndex,
					pageSize: 10
				}).then((data)=>{
					if(data.dataList.length == 0) {
						mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
					} else {
						for(var i = 0; i < data.dataList.length; i++) {
							app.lists.push(data.dataList[i]);
						}
						mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
					}
				})
			}
		}

	}
</script>

<style scoped>
	.mui-control-item {
		position: relative;
	}
	
	.mui-control-item.mui-active span {
		height: 2px;
		left: 0px;
		width: 30%;
		display: block;
		background-color: #18BC9A;
		margin: 0 auto;
	}
	
	.mui-btn {
		width: 1.48rem;
		height: .56rem;
		line-height: .28rem;
		color: #333;
		padding: 0;
		font-size: 12px;
		border-radius: 10px;
	}
	
	.mui-btn-outlined.mui-btn-success {
		color: #5ab795;
	}
	
	.mui-btn-success {
		border: 1px solid #5ab795;
	}
	
	.mui-btn-success:enabled:active {
		border: 1px solid #52A58E;
		background-color: #52A58E;
	}
	
	.mui-order-list ul li {
		margin-bottom: .2rem;
	}
	
	.mui-popup-button {
		color: #18BC9A;
	}
	
	.mui-popup-inner {
		padding: 30px 15px;
	}
	
	.mui-table-view {
		background-color: transparent;
	}
	
	.mui-table-view:after {
		height: 0;
	}
	
	.orderTime {
		font-size: 0.26rem;
		float: left;
		color: #666;
	}
	
	.payStatus1 {
		font-size: 0.26rem;
		color: #f5A623;
		float: right
	}
	
	.payStatus2 {
		font-size: 0.26rem;
		color: #F5A623;
		float: right
	}
	
	.mui-pic {
		width: 1.66rem;
		height: 1.66rem;
		display: block;
		float: left;
		margin-right: 0.3rem;
	}
	
	.mui-name {
		margin-bottom: 0.08rem;
	}
	
	.mui-name .mui-name1 {
		font-size: 0.32rem;
		color: #333;
		float: left;
	}
	
	.mui-name .mui-name2 {
		font-size: 0.3rem;
		float: right;
		color: #333;
	}
	
	.mui-guig {
		margin-bottom: 0.02rem;
		font-size: 0.24rem;
		color: #999;
	}
	
	.mui-address {
		font-size: 12px;
		color: #666;
		line-height: 0.34rem;
	}
	
	.mui-address .mui-img-time {
		width: .26rem;
		height: .26rem;
		vertical-align: middle;
	}
	
	.mui-cj {
		line-height: 0.34rem;
		display: inline-block;
		vertical-align: middle;
	}
	
	.actionText {
		font-size: 12px;
		line-height: .8rem;
		float: left;
		color: #ED5A5A;
	}
	
	.actionBtn {
		float: right;
		padding-top: 6px;
	}
	
	.mui-total {
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		font-size: 0.24rem;
		text-align: right;
		padding: 0 0.3rem;
		border-bottom: 0.01rem solid #e6e6e6;
	}
	* {
		touch-action: pan-y;
	}
</style>