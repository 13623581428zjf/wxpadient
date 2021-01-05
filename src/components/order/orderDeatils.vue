<template>
	<div class="mui-content">
		<div class='orderSatus mui-padding bg-fff mui-margin-bottom clearfix'>
			<span class='pull-left font-14rem color-333 '>订单状态</span>
			<span class='pull-right color-18BC9A font-15rem'>待收货</span>
		</div>
		<div class='bg-fff mui-margin-bottom'>
			<div class='orderSatus border-bt mui-padding clearfix'>
				<span class='pull-left font-14rem color-333 '>配送方式</span>
				<span class='pull-right color-333 font-15rem'>商家配送</span>
			</div>
			<!--商家配送-->
			<!--<div class='orderAddress clearfix mui-padding mui-margin-bottom'>
      			<img src="../../img/position.png" alt="" class='position pull-left'/>
      			<div class='pull-left orderAddress_right'>
      				<p class='order_name font-13rem color-333'>章叁  1344886688</p>
      				<p class='order_address  font-13rem color-333'>北京北京市朝阳区平房镇定福家园南里三号号号院一院号院一院一</p>
      			</div>
      		</div>-->
			<!--商家自提-->
			<div class='orderSelf clearfix mui-padding mui-margin-bottom'>
				<img src="../../assets/img/selfImg.png" alt="" class='selfImg pull-left' />
				<p class='order_name font-13rem color-333' style="margin-top: 0.28rem;">章叁 1344886688</p>
			</div>
		</div>
		<div class='orderSatus mui-padding bg-fff mui-margin-bottom clearfix'>
			<span class='pull-left font-14rem color-333 '>订单明细</span>
		</div>
		<ul>
			<li>
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
			</li>
		</ul>
		<div class="orderPrice bg-fff mui-padding mui-margin-bottom">
			<p class='clearfix'>
				<span class='pull-left font-12rem color-666'>商品总价</span>
				<span class='pull-right font-12rem color-666'>¥18.00</span>
			</p>
			<p class='clearfix'>
				<span class='pull-left font-12rem color-666'>运费</span>
				<span class='pull-right font-12rem color-666'>¥10.00</span>
			</p>
			<p class='clearfix'>
				<span class='pull-left font-12rem color-666'>优惠</span>
				<span class='pull-right font-12rem color-666'>-¥2.00</span>
			</p>
			<p class='clearfix'>
				<span class='pull-left font-14rem color-333'>实付</span>
				<span class='pull-right font-14rem color-FA5D40'>
      				¥<span class='font-16rem'>9</span>.50
				</span>
			</p>
		</div>
		<div class='orderSatus mui-padding bg-fff clearfix border-bt'>
			<span class='pull-left font-14rem color-333 '>其他信息</span>
			<span class='pull-right color-333 font-15rem'>商家配送</span>
		</div>
		<div class="orderTime bg-fff mui-margin-bottom">
			<p class='font-13rem color-333'>订单编号：120463856</p>
			<p class='font-13rem color-333'>下单时间：2018-07-18&nbsp;10:00:00</p>
		</div>
		<div class="bottomBox bg-fff clearfix">
			<div class='actionButton'>
				<button type="button" class="mui-btn mui-btn-warning mui-btn-outlined pull-right" style="color: #F5A623;">确认收货</button>
				<button type="button" class="mui-btn mui-btn-outlined pull-right" >查看物流</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				remnant: 500,
				desc: "",
				start: 0
			}
		},
		methods: {
			descInput: function() {
				var text = this.desc.length;
				app.remnant = 500 - text;
				app.start = 0 + text;
			},
		}
	}
</script>

<style scoped>
	.orderSatus {
		width: 100%;
		height: 0.84rem;
		line-height: 0.84rem;
	}
	
	.position {
		width: 0.48rem;
		height: 0.48rem;
		display: block;
		margin: 0.57rem 0.34rem 0.64rem 0;
	}
	/*商家配送*/
	
	.orderAddress {
		height: 1.63rem;
	}
	
	.orderAddress_right {
		width: 6rem;
	}
	
	.order_name {
		line-height: 0.36rem;
		margin: 0.21rem 0 0.08rem 0;
	}
	
	.order_address {
		line-height: 0.36rem;
	}
	/*自提*/
	
	.orderSelf {
		height: 0.8rem;
	}
	
	.selfImg {
		margin: 0;
		width: 0.48rem;
		height: 0.48rem;
		margin: 0.18rem 0.34rem 0 0;
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
	
	.orderPrice {
		padding: 0.28rem 0.3rem;
	}
	
	.orderPrice p {
		line-height: 0.34rem;
		margin-bottom: 0.02rem;
	}
	
	.orderPrice p:last-child {
		margin-top: 0.04rem;
	}
	
	.orderTime {
		padding: 0.21rem 0.3rem;
		margin-bottom: 1.2rem;
	}
	
	.orderTime p {
		line-height: 0.36rem;
	}
	
	.bottomBox {
		width: 7.5rem;
		height: 1rem;
		line-height: 1rem;
		position: fixed;
		bottom: 0;
	}
	
	.actionButton {
		margin-top: 0.24rem;
	}
	
	.mui-btn {
		width: 1.48rem;
		height: .56rem;
		line-height: .28rem;
		color: #333;
		padding: 0;
		font-size: 0.24rem;
	}
	
	.mui-btn-outlined {
		margin-right: 0.2rem;
	}
</style>