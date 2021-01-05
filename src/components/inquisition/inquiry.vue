<template>
	<div class="mui-content">
		<ul class="mui-table-view"  v-if='isShow=="Y"'>
			<li class="mui-table-view-cell mui-media" v-for="item in lists" @click="about(item)">
				<div class="mui-media-body">
					{{item.date}} {{item.week|weekfilters}}
					<span class="mui-span-time">（{{item.fromTime|areaCut}}-{{item.thruTime|areaCut}}）</span>
					<p class='mui-ellipsis mg-top-px10'>
						<span style="padding-right: 18px;" v-if="item.inquisitionType == 'all'|| item.inquisitionType == 'text'">
                            <img src="../../assets/img/minwx.png" style="width: .28rem;height:.28rem; vertical-align: middle;" alt="">
                            <span style="vertical-align: middle;line-height: .30rem; height: .28rem; display: inline-block;">{{item.textPrice}}元</span>
						</span>
						<span v-if="item.inquisitionType == 'all' || item.inquisitionType == 'video'">
                            <img src="../../assets/img/livemin.png" style="width: .28rem;height:.28rem; vertical-align: middle;" alt="">
                            <span style="vertical-align: middle;line-height: .30rem; height: .28rem; display: inline-block;"> {{item.price}}元</span>
						</span>
					</p>
				</div>
				<button type="button" style="width: 1.28rem;height: .56rem;" class="mui-btn mui-btn-primary mui-btn-outlined" v-if="item.num < item.visitsNum">预约</button>
				<button type="button" style="width: 1.28rem;height: .56rem;" class="mui-btn" v-else>约满</button>
			</li>
		</ul>
		<div v-else>
			<img src="../../assets/img/default.png" alt="" class='defaultImg'/>
			<p class='defalutText'>暂无相关数据</p>
		</div>
	</div>
</template>
<script>
	import { getStore, setStore} from "@/utils/storage";
	export default {
		data() {
			return {
				schedulingType: null,
				partyId: null,
				lists: [],
				isShow:'Y'
			}
		},
		mounted: function() {
			this.partyId = this.$route.query.partyId;
			this.searchSched();
		},
		filters: {
			weekfilters: function(value) {
				if(!value) {
					return "";
				} else if(value == 1) {
					return "周一";
				} else if(value == 2) {
					return "周二";
				} else if(value == 3) {
					return "周三";
				} else if(value == 4) {
					return "周四";
				} else if(value == 5) {
					return "周五";
				} else if(value == 6) {
					return "周六";
				} else if(value == 7) {
					return "周日";
				} else {
					return "休息休息";
				}
			},
			areaCut: function(value) {
				if(!value) return '';
				return value.substring(0, value.length - 3);
			},
		},
		methods: {
			about: function(item) {
				console.log(item)
				if(item.num >= item.visitsNum) {
					var btnArray = ['确定'];
					mui.confirm('', '预约已满，请等待下次预约。', btnArray, function(e) {
						console.log('nice');
					})
				} else {
					this.$router.push({name:'/inquisition/myInquition'})
					setStore('schedulingId',item.schedulingId)
					setStore('date',item.date)
				}
			},
			//查询排班
			searchSched() {
				this.postRequest('/weixin/order/findScheduling',{
					schedulingType:'inquisition',
					partyId: parseInt(this.partyId)
				}).then((data)=>{
					this.lists = data.data;
					if(data.data.length==0){
						this.isShow='N'
					}else{
						this.isShow='Y'
					}
				})
			}
		}
	}
</script>

<style scoped>
	.mui-content > .mui-table-view:first-child{
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
	
	.mui-table-view-cell .mui-media-body .mui-span-time {
		font-size: 12px;
		color: #18BC9A;
		text-align: center;
	}
	
	.mui-btn {
		background: #BCBCBC;
		line-height: .32rem;
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
</style>