<template>
	<div class="mui-content">
		 <div>
			<div class="mui-segmented-control">
				<a href="javascript:;" class="mui-control-item" :class='{"mui-active":num==0}' @click="changeStatus('',0)">全部
					<span></span>
				</a>
				<a href="javascript:;" class="mui-control-item" :class='{"mui-active":num==1}'  @click="changeStatus('created',1)">待付款
					<span></span>
				</a>
				<a href="javascript:;" class="mui-control-item" :class='{"mui-active":num==2}' @click="changeStatus('paid',2)">待就诊
					<span></span>
				</a>
				<!--<a href="javascript:;" class="mui-control-item" @click="changeStatus()">待取药
					<span></span>
				</a>-->
			</div>
		</div>
		<div id="refreshContainer" class="mui-content mui-order-list mui-scroll-wrapper" style="margin-top: 41px;">
			<div class=" mui-scroll">
				<ul class="mui-table-view mui-table-view-chevron" v-if='isShow=="Y"'>
					<li v-for="item in lists">
						<div style="height: .8rem;line-height: .8rem;" class="pd-leftright-px15 bg-fff">
							<span style="font-size: 12px; float: left;color:#666;">下单时间：{{item.createDate}}</span>
							<span style="font-size: 12px; color:#5ab795;float: right" v-if="item.status=='complete'">已完成</span>
							<span style="font-size: 12px; color:#ADADAD;float: right" v-else-if="item.status=='cancel'">已取消</span>
							<span style="font-size: 12px; color:#f5A623;float: right" v-else-if="item.status=='created'">待支付</span>
							<span style="font-size: 12px; color:#f5A623;float: right" v-else-if="item.status=='paid'">待就诊</span>
						</div>
						<div style="padding: 11px 15px;">
							<img :src="item.picture" v-if="item.picture" style="width: 1.24rem;height: 1.24rem; border-radius: 50%;" alt="">
							<img src="../../assets/img/docter_head.png" v-else style="width: 1.24rem;height: 1.24rem; border-radius: 50%;" alt="">
							<div class="pull-right" style="width: 80%;">
								<p>
									<span style="font-size: 14px;font-weight: 700;color: #333;">{{item.doctorName}}</span>&nbsp;&nbsp;
									<span style="font-size: 14px;font-weight: 400;color: #333;">{{item.job}}</span>
									<span style="font-size: 14px;float:right;color: #333;">¥{{item.price}}</span>
								</p>
								<p style="font-size: 12px;color:#999;">{{item.hospital}} {{item.deparment}}</p>
								<p style="font-size: 12px; color: #666;">
									<img src="../../assets/img/time.png" style="width: .28rem;height: .28rem;vertical-align: middle;" alt="">
									<span style="height: 0.4rem;display: inline-block; vertical-align: middle;">会诊时间：{{item.consultationTime|sliceTime}}
                                        {{item.weekDay |weekfilters}} {{item.fromTime|areaCut}}-{{item.thruTime|areaCut}}</span>
								</p>
							</div>
						</div>
						<div style="height: .8rem;" class="pd-leftright-px15 bg-fff">
							<span style="font-size: 12px;line-height: .8rem; float: left;color:#ED5A5A;" v-if="item.status=='created'">15分钟内未支付将自动取消</span>
							<span style="font-size: 12px;line-height: .8rem; float: left;color:#ED5A5A;" v-if="new Date(new Date(item.consultationTime).getTime()-3600*1000*12) > new Date() && item.status=='paid'">就诊前一天12:00前可取消预约</span>
							<span style="font-size: 12px;line-height: .8rem; float: left;color:#ED5A5A;" v-if="new Date(new Date(item.consultationTime).getTime()) < new Date() && item.status=='paid'">请耐心等待医生发起问诊</span>
							<span style="float: right; padding-top:6px;">
                                <button type="button" v-if="new Date(new Date(item.consultationTime).getTime()-3600*1000*12) > new Date() && (item.status=='paid'||item.status=='created')"
                                    @click="deleteMake($event,item)" class="mui-btn mui-btn-outlined">取消预约</button>
                                <button type="button" v-if="item.status=='complete' || item.status=='cancel' " class="mui-btn mui-btn-outlined" @click="deleteOrder($event,item,index)">删除订单</button>
                                <button type="button" v-if="item.status=='complete'" class="mui-btn mui-btn-outlined" @click="seeCase(item.consultationId)">查看病例</button>
                               <button type="button" class="mui-btn pay mui-btn-success mui-btn-outlined"  v-if="item.status=='created'" style="color: #fff;" @click='toPay(item.consultationId,item.price)'>立即支付</button> 
                            </span>
						</div>
					</li>
				</ul>
				<div v-else style="overflow: hidden;">
					<img src="../../assets/img/default.png" alt="" class='defaultImg'/>
					<p class='defalutText'>暂无相关数据</p>
				</div>
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
				status: '',
				lists: [],
				num:'0',
				isShow:'Y'
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
			areaCut: function(value) {
				if(!value) return '';
				return value.substring(0, value.length - 3);
			}
		},
		 beforeDestroy() {
    		mui.closePopups()
		},
		mounted() {
			this.getData()
			for(var i = mui.hooks.inits.length-1,item;i>=0;i--){
				item=mui.hooks.inits[i];
				if(item.name=="pullrefresh"){
				    item.repeat=true;
				}
			}
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
			//删除订单
			deleteOrder(e, item,index) {
				var btnArray = ['取消', '确定'];
				var _this=this
				mui.confirm('', '你确定删除订单吗？', btnArray, function(e) {
					if(e.index == 1) {
						//成功
						_this.postRequest('/weixin/order/deleOrder',{
							orderId: item.consultationId,
						}).then((data)=>{
							if(data.code==0){
								_this.lists.splice(index,1);
								mui.toast('删除成功');
								//_this.getData();
							}else{
								mui.toast(data.msg);
							}
						})
					} else {
//						mui.toast('留下我吧！');
					}
				})
			},
			//取消预约
			deleteMake(e, item) {
				var btnArray = ['取消', '确定'];
				var _this=this
				mui.confirm('', '你确定取消订单吗？', btnArray, function(e) {
					if(e.index == 1) {
				//成功
				_this.postRequest('/weixin/order/cancelOrder', {
					id: item.id,
				}).then((data) => {
					if(data.code==0){
						item.status='cancel'
						mui.toast('取消成功!');
					}else{
						mui.toast(data.msg);
					}
				})
					} else {
//						mui.toast('留下我吧！');
					}
				})
			},
			//查看病例
			seeCase(consultation_id) {
				this.$router.push({name:'/docter/checkRecords',query:{consultation_id:consultation_id}})
			},
			//切换状态栏
			changeStatus(str,index) {
				this.num=index
				this.status = str;
				this.pageIndex=1
				this.getData()
				mui('#refreshContainer').pullRefresh().scrollTo(0,0);
				mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
			},
			//获取数据
			getData() {
				this.postRequest('/weixin/order/findOrder', {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
					type: 'consultation',
					status: this.status
				}).then((data) => {
					this.lists = data.dataList;
					if(data.dataList.length==0){
						this.isShow='N'
					}else{
						this.isShow='Y'
					}
				})
			},
			pullfreshDown() {
				this.postRequest('/weixin/order/findOrder', {
					pageIndex: 1,
					pageSize: this.pageSize,
					type: 'consultation',
					status: this.status
				}).then((data) => {
					this.lists = data.dataList;
					mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
					mui('#refreshContainer').pullRefresh().refresh(true); //重置上拉刷新
					this.pageIndex = 1;
				})
			},
			//上拉加载
			pullfreshUp() {
				if(this.lists.length<(this.pageSize-1)){
					mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
					return ;
				}
				this.pageIndex++;
				this.postRequest('/weixin/order/findOrder', {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
					type: 'consultation',
					status: this.status
				}).then((data) => {
					if(data.dataList.length == 0) {
						this.pageIndex = 1;
						mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
					} else {
						for(var i = 0; i < data.dataList.length; i++) {
							this.lists.push(data.dataList[i]);
						}
						mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
					}
				})
			},
			//立即支付
			toPay(consultation_id,price){
				this.postRequest("/weixin/pay/wxJsApi",{
					 internalId:consultation_id, 
				      totalFee:price.toString()
				}).then((data) => {
					this.jsSdk(data.outPutParamsMap)
				})
			},
			jsSdk(outPutParamsMap){
				var _this=this
				if (typeof WeixinJSBridge == "undefined"){
				        if( document.addEventListener ){
				            document.addEventListener('WeixinJSBridgeReady', _this.onBridgeReady(outPutParamsMap), false);
				        }else if (document.attachEvent){
				            document.attachEvent('WeixinJSBridgeReady', _this.onBridgeReady(outPutParamsMap));
				            document.attachEvent('onWeixinJSBridgeReady', _this.onBridgeReady(outPutParamsMap));
				        }
				    }else{
				        _this.onBridgeReady(outPutParamsMap);
				        
				    }
			},
			onBridgeReady(outPutParamsMap){
				var _this=this
		        WeixinJSBridge.invoke(
		            'getBrandWCPayRequest', {
		                "appId":outPutParamsMap.appId,     //公众号名称，由商户传入
		                "timeStamp":outPutParamsMap.timeStamp,         //时间戳，自1970年以来的秒数
		                "nonceStr":outPutParamsMap.nonceStr, //随机串
		                "package":outPutParamsMap.package,
		                "signType":"MD5",         //微信签名方式：
		                "paySign":outPutParamsMap.paySign //微信签名
		            }, 
		            function(res){
		                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
		                	mui.toast('支付成功！')
		                	_this.getData()
		                }else if(res.err_msg=='get_brand_wcpay_request:cancel'){
		                	mui.toast('取消成功！')
		                }else if(res.err_msg=='get_brand_wcpay_request:fail'){
		                	mui.toast('支付失败！')
		                }
		            }
		        );
		    }
		}
	}
</script>

<style scoped>
	* {
		touch-action: pan-y;
	}
	
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
</style>
