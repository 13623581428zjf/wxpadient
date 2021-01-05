<template>
	<div class="mui-content">
		<div>
			<div class="mui-inqui pd-leftright-px15 bg-fff border-top ">
				<span class="pull-left font-px16 color-333">问诊时间</span>
				<span class="pull-right font-px14 color-999">{{info.consultationTime|sliceTime}} {{info.weekDay|weekfilters}} {{info.fromTime|areaCut}}-{{info.thruTime|areaCut}}</span>
			</div>
			<div class="mui-inqui pd-leftright-px15 bg-fff border-top ">
				<span class="pull-left font-px16 color-333">问诊类型</span>
				<span class="pull-right font-px14 color-999" v-if='info.inquisitionType=="text"'>图文问诊</span>
				<span class="pull-right font-px14 color-999" v-if='info.inquisitionType=="video"'>视频问诊</span>
			</div>
			<div class="mui-inqui pd-leftright-px15 bg-fff mg-bottom-px10 border-top">
				<span class="pull-left font-px16 color-333">问诊人</span>
				<span class="pull-right font-px14 color-999">{{info.name}}&nbsp;&nbsp;{{info.sex}}&nbsp;&nbsp;{{info.age|reckonAge}}岁 </span>
			</div>
			<div class="bg-fff pd-tb10px-lr15px about-detail-cen">
				<p style="margin-bottom:8px;" class="font-px16 color-333">病情描述</p>
				<p class="font-px16 color-333" style="line-height:.48rem;">{{info.description}}</p>
				<div v-if='info.pictureList'>
					<img :src="picture.url" alt="" v-for='picture in info.pictureList'>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import { getStore, setStore} from "@/utils/storage";
	export default {
		data() {
			return {
				consultation_id:'',
				info:{},
				age:''
			}
		},
		mounted() {
			this.consultation_id=this.$route.query.consultation_id
			this.getInfo();
		},
		methods: {
			getInfo(){
				this.getRequest('/weixin/order/findOrderDes/'+this.consultation_id).then((data) => {
					this.info=data.date
				})
			}
		}
	}
</script>

<style scoped>
	.mui-inqui {
		height: .96rem;
		line-height: .94rem;
	}
	
	.mui-inqui-active:active {
		background-color: #eee !important;
	}
	
	.about-detail-cen img {
		width: 100%;
		margin-top: 0.1rem;
		display: block;
	}
</style>