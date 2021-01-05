<template>
	<ul class="noticeList bg-fff">
		<li>
			<a href="">
				<p class='noticeTitle'>
					<img src="../../assets/img/notice.png" alt="" /> 硝苯地平控释片(欣然)口服后吸收迅速、完全口服后10分钟即可测出其硝苯地平控释片(欣然)口服后吸收迅速、完全口服后10分钟即可测出其血药浓度血药浓
				</p>
				<p class='noticeTime'>2018-08-22 &nbsp;12:00</p>
			</a>
		</li>
		<li>
			<a href="">
				<p class='noticeTitle'>
					<img src="../../assets/img/notice.png" alt="" /> 硝苯地平控释片(欣然)口服后吸收迅速、完全口服后10分钟即可测出其血药浓度…
				</p>
				<p class='noticeTime'>2018-08-22 &nbsp;12:00</p>
			</a>
		</li>
		<li>
			<a href="">
				<p class='noticeTitle'>
					<img src="../../assets/img/notice.png" alt="" /> 硝苯地平控释片(欣然)口服后吸收迅速、完全口服后10分钟即可测出其血药浓度…
				</p>
				<p class='noticeTime'>2018-08-22 &nbsp;12:00</p>
			</a>
		</li>
	</ul>
</template>

<script>
</script>

<style scoped>
	/*医生公告*/
	.noticeList{
		text-align: left;
	}
	.noticeList li {
		border-bottom: 0.01rem solid #E6E6E6;
		padding: 0.26rem 0.3rem 0.24rem 0.3rem;
	}
	
	.noticeList li:last-child {
		border-bottom: none;
	}
	
	.noticeList li img {
		width: 0.28rem;
		height: 0.28rem;
		display: inline-block;
		position: relative;
		top: 0.02rem;
	}
	
	.noticeList .noticeTitle {
		width: 100%;
		line-height: 0.42rem;
		font-size: 0.3rem;
		color: #333;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.noticeList .noticeTime {
		line-height: 0.34rem;
		font-size: 0.24rem;
		color: #999;
	}
</style>