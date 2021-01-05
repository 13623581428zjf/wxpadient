<template>
	<div style="text-align: left;">
		<div class="prescriptionTop bg-fff">
			<img src="../../assets/img/name.png" alt="" class='msgIcon' />
			<span>张三三</span>
			<span>男</span>
			<span>25岁</span>
		</div>
		<div class='prescriptionDetail bg-fff'>
			<div class="result">
				<p class="resultTitle">诊断结果</p>
				<p class="resultText">诊断结果诊断结果诊断结果诊断结果诊断结果诊断结果诊断结果诊断结果诊断结果诊断结果诊断结果诊断结果诊断结果诊断 结果诊断结果诊断结果诊断结果诊断结果。
				</p>
			</div>
		</div>
		<div class="bg-fff ypList">
			<p>R</p>
			<ul>
				<li class='clearfix'>
					<img src="https://i.loli.net/2017/11/09/5a046546a2a1f.jpg" alt="" class='pull-left' />
					<div class='pull-left'>
						<p class='ypName'>双黄连口服液
							<span class='pull-right'>x1</span>
						</p>
						<p class='ypSpec'>规格：10ml*10支</p>
						<p class='ypSpec'>用量：一天三次（一次10ml）</p>
						<p class='ypSpec'>用法：口服</p>
					</div>
				</li>
				<li class='clearfix'>
					<img src="https://i.loli.net/2017/11/09/5a046546a2a1f.jpg" alt="" class='pull-left' />
					<div class='pull-left'>
						<p class='ypName'>双黄连口服液
							<span class='pull-right'>x1</span>
						</p>
						<p class='ypSpec'>规格：10ml*10支</p>
						<p class='ypSpec'>用量：一天三次（一次10ml）</p>
						<p class='ypSpec'>用法：口服</p>
					</div>
				</li>
				<li class='clearfix'>
					<img src="https://i.loli.net/2017/11/09/5a046546a2a1f.jpg" alt="" class='pull-left' />
					<div class='pull-left'>
						<p class='ypName'>双黄连口服液
							<span class='pull-right'>x1</span>
						</p>
						<p class='ypSpec'>规格：10ml*10支</p>
						<p class='ypSpec'>用量：一天三次（一次10ml）</p>
						<p class='ypSpec'>用法：口服</p>
					</div>
				</li>
			</ul>
		</div>
		<div class="prescriptRemark bg-fff clearfix">
			<p class='pull-left'>开方日期：2018-07-19</p>
			<p class='pull-right'>有效期：3天</p>
		</div>
		<ul class='remarkList bg-fff'>
			<li>
				开方医师：&nbsp;
				<img src="https://i.loli.net/2017/11/09/5a046546a2a1f.jpg" alt="" />
			</li>
			<li>
				审核/调配：
				<img src="https://i.loli.net/2017/11/09/5a046546a2a1f.jpg" alt="" />
			</li>
			<li>
				审核/发药：
				<img src="https://i.loli.net/2017/11/09/5a046546a2a1f.jpg" alt="" />
			</li>
		</ul>
		<div class='sendMsg' style="position: fixed;">
			续方
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	/*处方详情*/
	
	.msgIcon {
		width: 0.46rem;
		height: 0.46rem;
		display: inline-block;
		position: relative;
		top: 0.12rem;
	}
	
	.prescriptionTop {
		height: 0.98rem;
		line-height: 0.98rem;
		border-bottom: 0.01rem solid #E6E6E6;
		padding: 0rem 0.3rem;
		font-size: 0.32rem;
		color: #333;
	}
	
	.prescriptionTop span {
		border-right: 0.01rem solid #E0E0E0;
		padding: 0 0.18rem;
	}
	
	.prescriptionTop span:last-child {
		border-right: 0;
	}
	
	.prescriptionDetail {
		padding: 0rem 0.3rem;
		margin-bottom: 0.2rem;
	}
	
	.result {
		padding-bottom: 0.18rem;
	}
	
	.resultTitle {
		line-height: 0.44rem;
		padding: 0.26rem 0 0.18rem 0;
		font-size: 0.32rem;
		color: #333;
	}
	
	.resultText {
		line-height: 0.48rem;
		font-size: 0.32rem;
		color: #333;
	}
	
	.ypList {
		padding-top: 0.2rem;
		margin-bottom: 0.2rem;
	}
	
	.ypList>p {
		line-height: 0.44rem;
		font-size: 0.32rem;
		color: #333;
		padding: 0rem 0.3rem;
	}
	
	.ypList ul li {
		padding: 0.3rem;
		border-bottom: 0.01rem solid #E6E6E6;
	}
	
	.ypList ul li img {
		width: 1.66rem;
		height: 1.66rem;
		display: block;
		margin-right: 0.34rem;
	}
	
	.ypList ul li .ypName {
		line-height: 0.44rem;
		font-size: 0.32rem;
		color: #333;
		margin-bottom: 0.18rem;
		width: 4.9rem;
	}
	
	.ypList ul li .ypSpec {
		line-height: 0.34rem;
		font-size: 0.24rem;
		color: #666;
	}
	
	.prescriptRemark {
		padding: 0 0.3rem;
		border-bottom: 0.01rem solid #E6E6E6;
	}
	
	.prescriptRemark>p {
		height: 0.98rem;
		line-height: 0.98rem;
		font-size: 0.32rem;
		color: #333;
	}
	
	.remarkList {
		padding: 0.4rem 0.3rem 0.32rem 0.3rem;
		margin-bottom: 1.44rem;
	}
	
	.remarkList li {
		width: 100%;
		height: 0.6rem;
		line-height: 0.6rem;
		margin-bottom: 0.32rem;
	}
	
	.remarkList li:last-child {
		margin-bottom: 0;
	}
	
	.remarkList li img {
		width: 1.28rem;
		height: 0.6rem;
		display: inline-block;
		margin-left: 0.2rem;
		position: absolute;
	}
</style>