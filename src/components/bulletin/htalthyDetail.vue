<template>
	<div class="mui-content bg-fff">
		<div class="mui-title-doctor clearfix pd-tb10px-lr15px">
			<img :src="info.picture"alt="" class="pull-left newsStyle" v-if='info.picture'>
			<img src="../../assets/img/docter_head.png" alt="" class="pull-left newsStyle mg-right-px15" v-else>
			<div class=" pull-left ">
				<p class="font-px12 color-333" style="margin:2px 0 3px 0;">{{info.name}}<span style="padding:0 4px;color:#ccc;" >|</span>{{info.jobName}}</p>
				<p class="font-px12" style="color:#bebebe;">{{info.hospital}} {{info.department}}</p>
			</div>
		</div>
		<div class="pd-leftright-px15">
			<div class="border-top clearfix">
				<p class="font-px22 color-333" style="line-height:.64rem;padding-top: 8px;">{{info.title}}</p>
				<p class="font-px12 clearfix">
					<span style="color:#bebebe;float: left;margin-bottom: 15px;">
						发布日期{{info.releaseDate |sliceTime}}</span><span style="color:#bebebe; float:right;">阅读{{info.num}}
					</span>
				</p>
				<div style="line-height:27px;" v-html='info.content'>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				id:'',
				info:{
					name:'',
					jobName:'',
					hospital:'',
					department:'',
					title:'',
					num:'',
					releaseDate:'',
					content:''
				}
			}
		},
		mounted: function() {
			this.id=this.$route.params.id
			this.getInfo()
		},
		methods: {
			getInfo: function() {
				this.postRequest('/weixin/findInformationDes',{
					id:this.id
				}).then((data) => {
					this.info=data.data
					console.log(data)
				})
			}
		}
	}
</script>

<style scoped>
	.mui-title-doctor>div p {
		line-height: .28rem;
	}
	
	html,
	body,
	.mui-content {
		height: 100%;
	}
	.newsStyle{
		width:.7rem; height:.7rem; border-radius: 50%; margin-right:8px;
	}
</style>