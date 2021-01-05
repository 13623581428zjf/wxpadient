<template>
	<div class="mui-centent" id="app" v-cloak>
		<div class="personal  bg-fff">
			<div class="personal_left clearfix">
				<div class='headPortrait pull-left'>
					<img :src="portraitUrl" alt=""  v-if='portraitUrl'/>
					<img src="../../assets/img/self_head.png" alt="" v-else/>
				</div>
				<div class='pull-left headPortrait_right'>
					<p class='p1' v-if='patientName'>{{patientName}}</p>
					<p class='p1' v-else>微信昵称</p>
					<p class='p2' v-if="doctorInfo == 'n'">待完善</p>
				</div>
				<a class="personal_right clearfix pull-right" @click="$router.push({ name: '/user/setting'})">
					设置
					<span class="mui-icon  mui-icon-arrowright"></span>
				</a>
			</div>
		</div>
		<ul class='personalList'>
			<li>
				<a  @click="$router.push({ name: '/order/myOrder'})">
					<p>
						我的订单
						<img src="../../assets/img/arrow.png" alt="" class='arrowImg arrowImg1 pull-right' />
					</p>
				</a>
			</li>
			<li>
				<a  @click="$router.push({ name: '/successive/continuationtwo'})">
					<p>
						我的处方
						<img src="../../assets/img/arrow.png" alt="" class='arrowImg arrowImg1 pull-right' />
					</p>
				</a>
			</li>
			<li>
				<a  @click="$router.push({ name: '/successive/continuation'})">
					<p>
						续方申请
						<img src="../../assets/img/arrow.png" alt="" class='arrowImg arrowImg1 pull-right' />
					</p>
				</a>
			</li>
			<li>
				<a @click="$router.push({ name: '/docter/myDoctor'})">
					<p>
						我的关注
						<img src="../../assets/img/arrow.png" alt="" class='arrowImg arrowImg1 pull-right' />
					</p>
				</a>
			</li>
			<li>
				<a @click="$router.push({ name: '/case/dossier'})">
					<p>
						病历夹
						<img src="../../assets/img/arrow.png" alt="" class='arrowImg arrowImg1 pull-right' />
					</p>
				</a>
			</li>
			<li>
				<a href="">
					<p>
						云药房
						<img src="../../assets/img/arrow.png" alt="" class='arrowImg arrowImg1 pull-right' />
					</p>
				</a>
			</li>
		</ul>
		<div class="actionMsg">
			<p>工作时间：工作日08:30-17:30</p>
			<p>联系电话：400-0050-075</p>
			<p>如使用过程中遇到任何问题，可以联系慧疗</p>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				doctorInfo: '',
				patientName: '',
				portraitUrl:''
			};
		},
		methods: {
			showajax: function() {
				var url = window.location.href;
//				token(url);
			},
			getInfo: function() {
				this.postRequest('/weixin/patientInfo').then((data)=>{
					this.doctorInfo = data.map.remarks;
					this.patientName = data.map.findByPartyId.patientName;
					this.portraitUrl = data.map.findByPartyId.portraitUrl;
				})
			},

		},
		mounted: function() {
			this.showajax();
			this.getInfo();
		}
	}
</script>

<style scoped>
	.personal {
		padding: 0 0.3rem;
		width: 100%;
		margin-bottom: 0.2rem;
	}
	
	.personal_left {
		padding: 0.28rem 0;
	}
	
	.headPortrait {
		border-radius: 50%;
		width: 1.24rem;
		height: 1.24rem;
		overflow: hidden;
		margin-right: 0.22rem;
	}
	
	.headPortrait img {
		width: 1.24rem;
		height: 1.24rem;
		display: block;
	}
	
	.headPortrait_right .p1 {
		height: 0.5rem;
		color: #333;
		font-size: 0.36rem;
		margin: 0.14rem 0;
	}
	
	.headPortrait_right .p2 {
		height: 0.36rem;
		color: #999;
		font-size: 0.26rem;
	}
	
	.personal_right {
		margin-top: 0.42rem;
		color: #999;
		font-size: 0.3rem;
	}
	
	.mui-icon-arrowright {
		font-size: 0.4rem;
		color: #D8D8D8;
	}
	
	.personalList {
		margin-bottom: 0.2rem;
	}
	
	.personalList li:last-child {
		border-bottom: none;
	}
	
	.personalList li a {
		display: inline-block;
		width: 100%;
		height: 0.98rem;
		background-color: #fff;
		padding: 0 0.3rem;
		border-bottom: 0.01rem solid #E6E6E6;
		box-sizing: border-box;
		text-align: left;
	}
	
	.personalList li:last-child a {
		border-bottom: none;
	}
	
	.personalList li a p {
		height: 0.98rem;
		line-height: 0.98rem;
		color: #333;
		font-size: 0.34rem;
	}
	
	.arrow {
		margin-top: 0.3rem;
	}
	
	.actionMsg {
		background-color: #fff;
		padding: 0.26rem 0.3rem;
	}
	
	.actionMsg p {
		color: #666;
		font-size: 0.26rem;
		line-height: 0.36rem;
		text-align: left;
	}
	.arrowImg{
		width: 0.16rem;
		height: 0.28rem;
		margin-top: 20px;
	}
</style>