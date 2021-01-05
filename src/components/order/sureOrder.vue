<template>
	<div class="mui-content">
		<p class='mui-order-top mui-padding bg-fff color-666'>订单类型：预约挂号</p>
		<div class="mui-order-main mui-padding clearfix">
			<img src="https://i.loli.net/2017/11/09/5a046546a2a1f.jpg" alt="" class='pull-left mui-pic' />
			<div class="mui-main-right pull-left">
				<p class='mui-text1 color-333'>
					<span>胡一天</span>&nbsp;主任医师
				</p>
				<p class='mui-text2 color-999'>北京协和医院 &nbsp;皮肤科</p>
				<p class='mui-text3 color-666'>
					<img src="../../assets/img/time.png" alt="" class='mui-text-time' /> 会诊时间：2018-07-13 周五 下午</p>
			</div>
		</div>
		<div class="mui-order-top bg-fff color-666 mui-padding">
			<span class='pull-left'>线上支付</span>
			<span class='pull-right mui-price'>¥500.00</span>
		</div>
		<div class="footer">
			<button type="button" class="mui-btn mui-btn-success">提交</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
		mounted() {

		}
	}
</script>

<style scoped>
	.mui-padding {
		padding: 0 0.3rem;
	}
	
	.mui-order-top {
		height: 0.8rem;
		line-height: 0.8rem;
		font-size: 0.26rem;
	}
	
	.mui-order-main {
		width: 100%;
		height: 1.8rem;
		background-color: #FAFAFA;
	}
	
	.mui-order-main .mui-pic {
		width: 1.24rem;
		height: 1.24rem;
		margin: 0.28rem 0.22rem 0 0;
		overflow: hidden;
		border-radius: 50%;
	}
	
	.mui-main-right {
		width: 5rem;
		margin-top: 0.28rem;
	}
	
	.mui-main-right .mui-text1 {
		line-height: 0.42rem;
		margin-bottom: 0.06rem;
	}
	
	.mui-text1 span {
		font-weight: 600;
	}
	
	.mui-main-right .mui-text2 {
		line-height: 0.34rem;
		font-size: 0.24rem;
		margin-bottom: 0.08rem;
	}
	
	.mui-main-right .mui-text3 {
		line-height: 0.34rem;
		font-size: 0.24rem;
	}
	
	.mui-main-right .mui-text-time {
		width: 0.26rem;
		height: 0.26rem;
		position: relative;
		top: 0.03rem;
	}
	
	.mui-price {
		font-size: 0.3rem;
		color: #FA5D40;
	}
</style>