<template>
	<div>
		<div class='tabChoose bg-fff'>
			<div class="mui-segmented-control">
				<a href="javascript:;" class="mui-control-item mui-active" style='width: 49%;'>全部
					<span></span>
				</a>
				<span href="" class='tabChooseLine'></span>
				<a href="javascript:;" class="mui-control-item" style='width: 49%;'>待取药
					<span></span>
				</a>
			</div>
		</div>
		<ul class='personalList prescriptionList'>
			<li>
				<a href="">
					<p class='color-333'>
						2019-02-03
						<span class='pull-right prescriptionStatus1'>代取药</span>
					</p>
				</a>
			</li>
			<li>
				<a href="">
					<p class='color-333'>
						2019-02-03
						<span class='pull-right prescriptionStatus2'>已取药</span>
					</p>
				</a>
			</li>
			<li>
				<a href="">
					<p class='color-333'>
						2019-02-03
						<span class='pull-right prescriptionStatus3'>已过期</span>
					</p>
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
</script>

<style scoped>
	.mui-control-item.mui-active span {
		height: 0.04rem;
		left: 0px;
		width: 1.62rem;
		display: block;
		background-color: #18BC9A;
		margin: 0 auto;
	}
	
	.mui-segmented-control .mui-control-item {
		height: 0.84rem;
		line-height: 0.84rem;
	}
	
	.tabChooseLine {
		display: inline-block;
		height: 0.52rem;
		width: 0.01rem;
		border-right: 0.01rem solid #f0f0f0;
		position: relative;
		top: 0.16rem;
	}
	
	.prescriptionList li a p {
		font-size: 0.32rem;
		background: #fff;
		text-align: left;
		padding: 0.28rem 0.3rem;
		border-bottom: 1px solid #E6E6E6;
	}
	
	.prescriptionStatus1 {
		font-size: 0.28rem;
		color: #F5A623;
	}
	
	.prescriptionStatus2 {
		font-size: 0.28rem;
		color: #ADADAD;
	}
	
	.prescriptionStatus3 {
		font-size: 0.28rem;
		color: #18BC9A;
	}
</style>