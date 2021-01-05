<template>
	<div class="mui-content">
		<div class="dodesi">订单类型:预约挂号</div>
		<div class="dodeList">
			<div class="dodeIng">
				<img :src="firmOrder.picture" alt="" class="pull-left  mg-right-px15" v-if="firmOrder.picture">
				<img src="../../assets/img/che.png" v-else/>
			</div>
			<div class="doderight">
				<div>
					<p style="color:black;">{{firmOrder.name}}<span style="color: gray;font-size: .2rem;margin-left: .1rem;">{{firmOrder.jobName}}</span></p>
					<p style="font-size: .2rem;">{{schedulingEntity.hospital}}&nbsp;&nbsp;{{schedulingEntity.deparment}}</p>
					<p style="color:black;">就诊时间:&nbsp;&nbsp;{{consultationTime}}&nbsp;&nbsp;{{schedulingEntity.weekDay|weekfilters}}
						<span v-if="schedulingEntity.fromTime=='08:00:00'">上午</span>
						<span v-if="schedulingEntity.fromTime=='14:00:00'">下午</span>
						<span v-if="schedulingEntity.fromTime=='20:00:00'">晚上</span>
					</p>
				</div>
			</div>
		</div>

		<div class="topgt" v-if="this.isLeague==1"><span>线上支付</span><span>¥{{Math.round(schedulingEntity.price *100) /100}}</span></div>
		<div class="topgt" v-else><span>线下支付</span><span>¥{{Math.round(schedulingEntity.price *100) /100}}</span></div>
		<div class="submit" @click="submit()">提交</div>
	</div>
</template>

<script>
	import { setStore, getStore, getSession, setSession } from "@/utils/storage";
	export default {
		data: function() {
			return {
				id: '',
				type: 'register',
				consultationTime: '',
				schedulingId: '',
				firmOrder: {},
				schedulingEntity: {},
				isLeague: '',
				hospital: '',
			};
		},
		created() {
			this.id = this.$route.query.id;
			this.hospital = this.$route.query.hospital;
			this.consultationTime = this.$route.query.consultationTime;
			this.schedulingId = this.$route.query.schedulingId;
			this.getpadeing();
		},
		methods: { //获取确认订单接口
			getpadeing() {
				this.postRequest('/weixin/register/isInfo', {
					partyId: parseInt(this.id),
					schedulingId: parseInt(this.schedulingId),
					consultationTime: this.consultationTime,
					hospital: this.hospital,
				}).then((data) => {
					if(data && data.code === 0) {
						this.firmOrder = data.doctorInfo;
						this.isLeague = data.isLeague;
						this.schedulingEntity = data.schedulingEntity;
					} else {
						mui.toast(data.msg);
					}
				})
			},
			//提交
			submit() {
				if(this.isLeague == 1) {
					this.isLeague = 'Y'
				} else if(this.isLeague == 0) {
					this.isLeague = 'N'
				}
				this.postRequest('/weixin/order/createdOrder', {
					partyId: parseInt(this.id),
					type: this.type,
					schedulingId: parseInt(this.schedulingId),
					consultationTime: this.consultationTime,
					isLeague: this.isLeague,
				}).then((data) => {
					if(data && data.code === 0) {
						this.$router.push('/myPatient/myPatient')
					} else {
						mui.toast(data.msg);
					}
				})
			}
		}
	}
</script>

<style scoped>
	.dodesi {
		width: 100%;
		font-size: .3rem;
		height: .9rem;
		line-height: .9rem;
		padding-left: .3rem;
		background: #fff;
		border-bottom: .01rem solid gainsboro;
	}
	
	.dodeList {
		display: flex;
		height: 1.8rem;
		background: #fff;
		padding-top: .3rem;
		border-bottom: .01rem solid gainsboro;
	}
	
	.dodeList .dodeIng {
		width: 20%;
	}
	
	.dodeList .dodeIng img {
		width: 1rem;
		height: 1rem;
		margin: .2rem .25rem;
		border-radius: .5rem;
		border: 1px solid gainsboro;
	}
	
	.topgt {
		width: 100%;
		height: .9rem;
		line-height: .9rem;
		background: white;
		margin: .15rem 0;
		font-size: .28rem;
		display: flex;
	}
	
	.topgt span:nth-of-type(1) {
		padding-left: .3rem;
		width: 88%;
	}
	
	.topgt span:nth-of-type(2) {
		width: 12%;
	}
	
	.submit {
		width: 100%;
		height: .9rem;
		background: #18BC9A;
		color: #FFFFFF;
		text-align: center;
		line-height: .9rem;
		position: fixed;
		bottom: 0rem;
	}
</style>