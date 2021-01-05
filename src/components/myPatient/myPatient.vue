<template>
	<!--顶部tab切换-->
	<div class="mui-content">
		<div class="doctorlecture">
			<ul class="header">
				<li @click="doctorle(0)" :class="index==0?'active':''">全部</li>
				<li @click="doctorle(1)" :class="index==1?'active':''">待支付</li>
				<li @click="doctorle(2)" :class="index==2?'active':''">待就诊</li>
			</ul>
		</div>
		<!--获取数据-->
		<div id="refreshContainer" class="mui-content mui-scroll-wrapper" style="margin-top: 39px;background: #F5F5F5;">
			<div style="background: #F5F5F5;">
				<div class="content" v-for="(item,index) in dataListArr" :key='index'>
					<div class="title">
						<span style="color: #666666;">下单时间：  {{item.createDate}}</span>
						<span style="color: #F5A623;">{{item.status|statusType}}</span>
					</div>
					<div class="con">
						<img :src="item.picture" alt="" class="pull-left  mg-right-px15" v-if="item.picture">
						<img src="../../assets/img/che.png" v-else/>
						<div>
							<p><span style="font-family: PingFangSC-Medium;">{{item.doctorName}}&nbsp;&nbsp;</span><span style="font-family: PingFang-SC-Regular;">{{item.job}}</span></p>
							<p style="color: #999999;">{{item.hospital}}&nbsp;&nbsp;{{item.deparment}}</p>
							<p style="color: #666666;width: 4.2rem;"><img src="../../assets/img/gt.png" style="width: .24rem;height: .24rem;" />&nbsp;&nbsp;就诊时间:&nbsp;{{item.consultationTime|sliceTime}}&nbsp;{{item.weekDay|weekfilters}}
								<span v-if="item.fromTime=='08:00:00'">上午</span>
								<span v-if="item.fromTime=='14:00:00'">下午</span>
								<span v-if="item.fromTime=='20:00:00'">晚上</span>
							</p>
						</div>
						<p>¥{{Math.round(item.price *100) /100}}</p>
					</div>
					<div class="foot">
						<p v-if="item.status=='created' && item.paymentType!='underLine'">15分钟内未支付将自动取消</p>
						<p v-if="item.status =='underLine'" style="color: #333333;">就诊前一天12:00前可取消预约</p>
						<p v-if="item.status=='paid'">就诊前一天12:00前可取消预约</p>
						<p></p>
						<div>
							<button style="border-color: #F5A623 ;color: #F5A623;" @click="nav(item.hospital,item.partyId)" v-if="item.status=='underLine'">就诊导航</button>
							<button style="border-color: #F5A623 ;color: #F5A623;" v-if="item.status=='created' && item.paymentType!='underLine'" @click='toPay(item.consultation_id,item.price)'>立即支付</button>
							<!--<button href="javascript:;" @click="cancel(item)" v-if="item.status!='cancel'">取消预约</button>-->
							<button @click="cancel(item)" v-if="new Date(new Date(item.consultationTime).getTime()-3600*1000*12) > new Date() && (item.status!='cancel')">取消预约</button>
							<button @click="deletet(item,index)" style="border-color: #18BC9A ;color: #18BC9A;" v-if="item.status=='cancel'">删除订单</button>
						</div>
					</div>
				</div>
				<!--没有商品时显示此图片文字-->
				<div class='default' v-show="ispicshow" style="background: #F5F5F5;">
					<img src="../../assets/img/default.png" alt="" class='defaultImg' />
					<p class='defalutText' style="background: #F5F5F5 !important;">暂无相关数据</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import wx from 'weixin-js-sdk'
	export default {
		data() {
			return {
				//tab切换
				index: 0,
				pageIndex: 1,
				pageSize: 10,
				//全部数据
				dataListArr: [],
				leftTime: null,
				leftTimeArr: [],
				ispicshow: false,
				status: '',
				type: "register",
			}
		},
		mounted() {
			this.allData();
			this.getappId();
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
		//路由离开后
		destroyed: function() {
			console.log('离开')
		},
		methods: {
			formatStr(str) {
				//	debugger
				str = str.replace(/-/g, "/");
				return str;
			},
			doctorle: function(value) {
				//tab切换
				this.pageIndex = 1;
				this.index = value;
				if(value == 0) {
					this.status = ''
				} else if(value == 1) {
					this.status = 'created'
				} else {
					this.status = 'paid'
				}
				this.ispicshow = false;
				this.allData();
				mui('#refreshContainer').pullRefresh().scrollTo(0, 0);
				mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
			},
			//获取全部数据
			allData() {
				this.postRequest('/weixin/order/findOrder', {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
					status: this.status,
					type: this.type,
				}).then((data) => {
					if(data && data.code === 0) {
						console.log(data)
						this.dataListArr = data.dataList;
						if(data.dataList.length == 0) {
							console.log(data.dataList.length)
							this.ispicshow = true;
						} else {
							this.ispicshow = false;
						}
					} else {
						mui.toast(data.msg);
					}
				})
			},
			//取消预约
			cancel(item) {
				console.log(item)
				let _this = this;
				let _id = item.id;
				mui.confirm('确定取消么？', '提示', ['取消', '确定'], function(e) {
					if(e.index == 1) {
						_this.postRequest('/weixin/order/cancelOrder', {
							id: parseInt(_id)
						}).then((data) => {
							if(data.code == 0) {
								item.status = 'cancel';
								mui.toast('取消预约成功！');
							}
						})
					} else {}
				})
			},
			//删除订单
			deletet(item, index) {
				console.log(item);
				console.log(index)
				let _this = this;
				let _id = item.id;
				mui.confirm('确定删除么？', '提示', ['取消', '确定'], function(e) {
					if(e.index == 1) {
						_this.postRequest('/weixin/register/deleRegisterOrder', {
							id: JSON.stringify(_id)
						}).then((data) => {
							if(data.code == 0) {
								_this.dataListArr.splice(index, 1)
								mui.toast('删除成功啦！');
							}
						})
					} else {}
				})
			},
			//就诊导航
			nav(hospital, partyId) {
				this.postRequest('/weixin/getWeixinLocation', {
					partyId: parseInt(partyId),
					hospital: hospital
				}).then((data) => {
					if(data && data.code === 0) {
						wx.openLocation({
							latitude: Number(data.lat), // 纬度，浮点数，范围为90 ~ -90
							longitude: Number(data.lng), // 经度，浮点数，范围为180 ~ -180。
							name: '', // 位置名
							address: '', // 地址详情说明
							scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
							infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
						});
					} else {
						mui.toast(data.msg)
					}
				})
			},
			//下拉刷新
			pullfreshDown() {
				this.postRequest('/weixin/order/findOrder', {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
					status: this.status,
					type: this.type,
				}).then((data) => {
					this.dataListArr = data.dataList;
					mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
					mui('#refreshContainer').pullRefresh().refresh(true); //重置上拉刷新
					this.pageIndex = 1;
				})
			},
			pullfreshUp() {
				if(this.dataListArr.length < (this.pageSize - 1)) {
					mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
					return;
				}
				this.pageIndex++;
				this.postRequest('/weixin/order/findOrder', {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
					status: this.status,
					type: this.type,
				}).then((data) => {
					console.log(data)
					if(data.dataList.length == 0) {
						this.pageIndex = 1;
						mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
					} else {
						for(var i = 0; i < data.dataList.length; i++) {
							this.dataListArr.push(data.dataList[i]);
						}
						mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
					}
				})
			},
			//立即支付
			toPay(consultation_id, price) {
				this.postRequest("/weixin/pay/wxJsApi", {
					internalId: consultation_id,
					totalFee: price.toString()
				}).then((data) => {
					this.jsSdk(data.outPutParamsMap)
				})
			},
			jsSdk(outPutParamsMap) {
				var _this = this
				if(typeof WeixinJSBridge == "undefined") {
					if(document.addEventListener) {
						document.addEventListener('WeixinJSBridgeReady', _this.onBridgeReady(outPutParamsMap), false);
					} else if(document.attachEvent) {
						document.attachEvent('WeixinJSBridgeReady', _this.onBridgeReady(outPutParamsMap));
						document.attachEvent('onWeixinJSBridgeReady', _this.onBridgeReady(outPutParamsMap));
					}
				} else {
					_this.onBridgeReady(outPutParamsMap);

				}
			},
			onBridgeReady(outPutParamsMap) {
				var _this = this;
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId": outPutParamsMap.appId, //公众号名称，由商户传入
						"timeStamp": outPutParamsMap.timeStamp, //时间戳，自1970年以来的秒数
						"nonceStr": outPutParamsMap.nonceStr, //随机串
						"package": outPutParamsMap.package,
						"signType": "MD5", //微信签名方式：
						"paySign": outPutParamsMap.paySign //微信签名
					},
					function(res) {
						if(res.err_msg == "get_brand_wcpay_request:ok") {
							mui.toast('支付成功！')
							_this.allData()
						} else if(res.err_msg == 'get_brand_wcpay_request:cancel') {
							mui.toast('取消成功！')
						} else if(res.err_msg == 'get_brand_wcpay_request:fail') {
							mui.toast('支付失败！')
						}
					}
				);
			}
		},
		//时间过滤器
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
			}
		}
	}
</script>

<style scoped>
	* {
		touch-action: pan-y;
	}
	
	div,
	ul,
	p {
		background: #FFFFFF;
	}
	
	.header {
		width: 100%;
		height: 0.8rem;
		display: flex;
		justify-content: space-around;
		border-bottom: 1px solid #E7E7E7;
		position: fixed;
		top: 0rem;
	}
	
	.header li {
		font-size: .28rem;
		height: 100%;
		line-height: .8rem;
		box-sizing: border-box;
	}
	
	.header .active {
		border-bottom: 1px solid #18BC9A;
		color: #18BC9A;
	}
	
	.content {
		margin: 0 0 .15rem 0;
	}
	
	.content:first-child {
		border-top: 1px solid #eaeaea;
	}
	
	.content>.title {
		height: .8rem;
		line-height: .8rem;
		display: flex;
		padding: 0 .3rem;
		justify-content: space-between;
		text-align: left;
	}
	
	.content>.title span {
		font-family: PingFang-SC-Regular;
		font-size: .26rem;
	}
	
	.con {
		height: 1.8rem;
		background: #FAFAFA;
		display: flex;
		padding: 0 0.3rem;
	}
	
	.con>img {
		width: 1.24rem;
		height: 1.24rem;
		margin: auto 0.3rem auto 0;
		border-radius: .62rem;
		border: 0.01rem solid gainsboro;
	}
	
	.con>div:nth-of-type(1) {
		background: inherit;
		height: 1.24rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin: auto 0;
		text-align: left;
	}
	
	.con>div:nth-of-type(1)>p:nth-of-type(1) {
		background: inherit;
		font-size: .3rem;
		color: #333333;
		width: 100%;
	}
	
	.con>div:nth-of-type(1)>p:nth-of-type(2),
	.con>div:nth-of-type(1)>p:nth-of-type(3) {
		background: inherit;
		font-family: PingFang-SC-Regular;
		font-size: .24rem;
	}
	
	.con>p {
		background: inherit;
		font-size: .30rem;
		color: #333333;
		width: 100%;
		text-align: right;
		margin-top: .25rem;
	}
	
	.foot {
		display: flex;
		height: .8rem;
		line-height: .8rem;
		padding: 0 0.3rem;
		justify-content: space-between;
		background: #fff;
		padding-top: 0.12rem;
		box-sizing: border-box;
	}
	
	.foot>p {
		font-size: .24rem;
		line-height: 0.6rem;
	}
	
	.foot>p {
		font-family: PingFang-SC-Regular;
		color: #ED5A5A;
	}
	
	.foot>div>button {
		display: inline-block;
		font-size: .24rem;
		padding: 0 0.2rem;
		height: .54rem;
		margin: auto 0;
		line-height: .54rem;
		border: 1px solid #9C9C9C;
		border-radius: .36rem;
	}
</style>