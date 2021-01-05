<template>
	<div class="mui-content">
		<div class='orderAddress clearfix mui-padding mui-margin-bottom bg-fff'>
			<img src="../../assets/img/position.png" alt="" class='position pull-left' />
			<div class='pull-left orderAddress_right'>
				<p class='order_name font-13rem color-333'>章叁 1344886688</p>
				<p class='order_address  font-13rem color-333'>北京北京市朝阳区平房镇定福家园南里三号号号院一院号院一院一</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
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
	.position {
		width: 0.48rem;
		height: 0.48rem;
		display: block;
		margin: 0.66rem 0.34rem 0.66rem 0;
	}
	
	.orderAddress {
		height: 1.76rem;
	}
	
	.orderAddress_right {
		width: 6rem;
	}
	
	.order_name {
		line-height: 0.36rem;
		margin: 0.3rem 0 0.08rem 0;
	}
	
	.order_address {
		line-height: 0.36rem;
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
</style>