<template>
	<div class="mui-content">
		<ul class='personalList'>
			<li>
				<a @click="$router.push({ name: '/user/information'})">
					<p>
						信息完善
						<img src="../../assets/img/arrow.png" alt="" class='arrowImg arrowImg1 pull-right' />
					</p>
				</a>
			</li>
			<li>
				<a @click="$router.push({ name: '/user/bindPhone'})">
					<p>
						手机绑定
						<img src="../../assets/img/arrow.png" alt="" class='arrowImg arrowImg1 pull-right' />
						<span class='pull-right phoneShow'>{{phoneNum|sliceloginId}}</span>
					</p>
				</a>
			</li>
			<li>
				<a @click="$router.push({ name: '/delivery/histoys'})">
					<p>
						收货地址
						<img src="../../assets/img/arrow.png" alt="" class='arrowImg arrowImg1 pull-right' />
					</p>
				</a>
			</li>
			<li>
				<a @click="$router.push({ name: '/docter/changeDoctor'})">
					<p>
						更换医生
						<img src="../../assets/img/arrow.png" alt="" class='arrowImg arrowImg1 pull-right' />
					</p>
				</a>
			</li>
		</ul>
		<a @click="switchNum()" class='changeAccount bg-fff'>
			切换登录账号
		</a>
	</div>
</template>

<script>
	import { getStore,removeStore} from "@/utils/storage";
	export default {
		data: function() {
			return {
				phoneNum: ''
			};
		},
		mounted: function() {
			this.getPhone()
		},
		methods: {
			switchNum() {
				this.$router.push({name:'/user/changeAccount'})
			},
			getPhone(){
				this.getRequest('/weixin/findPhoneNum').then((data) =>{
					if(data.code == 0){
						this.phoneNum=data.patient.patientPhoneNum
					}else{
						mui.toast(data.msg);
					}
				})
			}
		}
	}
</script>

<style scoped>
	.phoneShow {
		font-size: 0.3rem;
		color: #999;
		margin-right: 0.16rem;
	}
	
	.changeAccount {
		display: inline-block;
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		font-size: 0.34rem;
		color: #333 !important;
	}
	
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
	}
	
	.personalList li:last-child a {
		border-bottom: none;
	}
	
	.personalList li a p {
		height: 0.98rem;
		line-height: 0.98rem;
		color: #333;
		font-size: 0.34rem;
		text-align: left;
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
	}
	
	.arrowImg {
		width: 0.16rem;
		height: 0.28rem;
		position: relative;
		top: 0.04rem;
	}
	
	.arrowImg1 {
		top: 0.34rem !important;
	}
</style>