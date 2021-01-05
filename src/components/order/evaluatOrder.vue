<template>
	<div class="mui-content">
		<ul>
			<li class='orderBox'>
				<div class="mui-inqui mui-inqui-active pd-leftright-px15 bg-fff border-bt">
					<img src="../../assets/img/p2404647190.jpg" alt="" class='mui-orderImg pull-left' />
					<span class="pull-left font-px16 color-333 mui-orderName">双黄连口服液</span>
				</div>
				<div style="position: relative;" class=" bg-fff">
					<textarea id="textarea" rows="6" maxlength="500" @input="descInput" v-model="desc" placeholder="至少输入10个字，您的建议很重要，来点评一下吧"></textarea>
					<span class='numShow'>{{start}}/{{remnant}}</span>
				</div>
				<div class="footer">
					<button type="button" class="mui-btn mui-btn-success">提交</button>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
	data() {
			return {
				remnant: 500,
				desc: "",
				start: 0
			}
		},
		methods: {
			descInput() {
				var text = this.desc.length;
				this.remnant = 500 - text;
				this.start = 0 + text;
			}
		}
	}
</script>

<style scoped>
	.mui-inqui {
		height: .96rem;
		line-height: .96rem;
	}
	
	.mui-inqui-active:active {
		background-color: #eee !important;
	}
	
	#textarea {
		padding: 10px 15px;
		font-size: .28rem;
		border: none;
	}
	
	.orderBox {
		margin-bottom: 0.2rem;
	}
	
	.numShow {
		position: absolute;
		bottom: 0px;
		right: 15px;
		font-size: 12px;
		color: #999
	}
	
	.mui-btn {
		background-color: #18BC9A;
		border-radius: 0;
	}
	
	.mui-orderImg {
		display: block;
		width: 0.6rem;
		height: 0.4rem;
		margin: 0.3rem 0.24rem 0 0;
	}
	
	.mui-orderName {
		color: #333;
		font-size: 0.34rem;
	}
</style>