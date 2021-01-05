<template>
	<div class="mui-content">
		<ul class="mui-table" style="background: #fff;">
			<li class="mui-table-view-cell mui-media" v-for="(item,index) in appotionment" :key='index'>
				<a>
					<div class="mui-media-body">
						<p class='mui-text-time'>
							{{item.date}} {{item.week|weekfilters}}&nbsp;<span v-if='item.fromTime == "08:00:00"'>上午</span><span v-if='item.fromTime == "14:00:00"'>下午</span><span v-if='item.fromTime == "20:00:00"'>晚上</span>
						</p>
						<p class='mui-ellipsis mg-top-px10' v-if="item.visitsNum !=item.num" @click="tobeFull(item)">
							<span class='mui-text-hospital'>
									{{item.hospital}}
	                        </span>
							<span class='mui-text-money'>
								¥{{Math.round(item.price *100) /100}}
	                        </span>
						</p>
						<p class='mui-ellipsis mg-top-px10' v-else>
							<span class='mui-text-hospital'>
									{{item.hospital}}
	                        </span>
							<span class='mui-text-money'>
								约满
	                        </span>

						</p>
					</div>
					<button type="button" class="mui-btn mui-btn-primary mui-btn-outlined" @click='medicalGuidance(item.hospital)'>就诊导航</button>
				</a>
			</li>
		</ul>
		<!--没有商品时显示此图片文字-->
		<div class='default' v-show="ispicshow">
			<img src="../../assets/img/default.png" alt="" class='defaultImg' />
			<p class='defalutText'>暂无相关数据</p>
		</div>
	</div>
</template>

<script>
	import wx from 'weixin-js-sdk'
	export default {
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				id: '',
				schedulingType: 'register',
				appotionment: [],
				num: '',
				//重新赋值周几周几
				week: '',
				ispicshow: false
			}
		},
		created() {
			this.id = this.$route.query.id;
			//预约挂号
			this.appointment();
			this.getappId();
		},
		mounted() {},
		methods: {
			//预约挂号列表
			appointment() {
				this.postRequest('/weixin/order/findScheduling', {
					partyId: parseInt(this.id),
					schedulingType: this.schedulingType
				}).then((data) => {
					if(data && data.code === 0) {
						console.log(data);
						this.appotionment = data.data;
						if(data.data.length == 0) {
							this.ispicshow = true;
						}
					}
				})
			},
			//没有约满跳转页面
			tobeFull(item) {
				this.$router.push({
					name: '/register/firmorder',
					query: {
						consultationTime: item.date,
						id: this.id,
						schedulingId: item.schedulingId,
						hospital: item.hospital,
					}
				})
			},
			//就诊导航
			medicalGuidance(hospital) {
				this.postRequest('/weixin/getWeixinLocation', {
					partyId: parseInt(this.id),
					hospital: hospital
				}).then((data) => {
					if(data && data.code === 0) {
						wx.openLocation({
							latitude: Number(data.lat), // 纬度，浮点数，范围为90 ~ -90
							longitude:  Number(data.lng), // 经度，浮点数，范围为180 ~ -180。
							name: '', // 位置名
							address: '', // 地址详情说明
							scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
							infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
						});
					} else {
						mui.toast(data.msg)
					}
				})
			}
		}
	}
</script>

<style scoped>
	.mui-content {
		text-align: left;
	}
	
	.mui-content>.mui-table-view:first-child {
		margin-top: 0;
	}
	
	.mui-table-view-cell:after {
		left: 0;
	}
	
	.mui-table-view-cell .mui-media-body span i {
		font-size: 16px;
		color: #18BC9A;
		text-align: center;
	}
	
	.mui-btn {
		background: #BCBCBC;
		line-height: .32rem;
		width: 1.7rem;
		height: .56rem;
	}
	
	.mui-btn-outlined.mui-btn-blue,
	.mui-btn-outlined.mui-btn-primary {
		color: #ffffff;
		border-radius: 15px;
		background: #18BC9A;
		border-color: #18BC9A;
		line-height: 16px;
	}
	
	.mui-btn-blue.mui-active:enabled,
	.mui-btn-blue:enabled:active,
	.mui-btn-primary.mui-active:enabled,
	.mui-btn-primary:enabled:active,
	input[type=submit].mui-active:enabled,
	input[type=submit]:enabled:active {
		color: #fff;
		border: 1px solid #52A28B;
		background-color: #52A28B;
	}
	
	.mui-popup-button {
		color: #52A28B;
	}
	
	.mui-text-time {
		font-size: 0.3rem;
		color: #333;
	}
	
	.mui-text-money {
		font-size: 0.24rem;
		color: #FA5D40;
	}
	
	.mui-text-hospital {
		font-size: 0.24rem;
		color: #999;
		padding-right: 0.18rem;
	}
</style>