<template>
	<div class="mui-content">
		<div>
			<div class="mui-segmented-control">
				<a href="javascript:;" class="mui-control-item" :class='{"mui-active":num==0}' @click="changeStatus('',0)" >病历
					<span></span>
				</a>
				<a href="javascript:;" class="mui-control-item" @click="changeStatus('created',1,info.id)" :class='{"mui-active":num==1}' v-if='isRecipe=="Y"'>处方
					<span></span>
				</a>
				<a href="javascript:;" class="mui-control-item" @click="changeStatus('paid',2,info.id)" :class='{"mui-active":num==2}' v-if='isCheck=="Y"'>检查单
					<span></span>
				</a>
			</div>
		</div>
		<div>	
			<!--病历-->
			<div v-if='num==0'>
				<p class='title showInfo'>患者信息</p>
				<p class='name bg-fff showInfo'>{{patient.patientName}} {{patient.patientSex}} {{patient.patientAge}}</p>
				<p class='title showInfo'>主诉</p>
				<p class='content bg-fff textInfo'>
					<span v-if='info.caseTitle'>{{info.caseTitle}}</span>
					<span v-else>无</span>
				</p>
				<p class='title showInfo'>过敏史</p>
				<p class='content bg-fff textInfo'>
					<span v-if='info.anaphylaxis'>{{info.anaphylaxis}}</span>
					<span v-else>无</span>
				</p>
				<p class='title showInfo'>家族史</p>
				<p class='content bg-fff textInfo'>
					<span v-if='info.familyInfo'>{{info.familyInfo}}</span>
					<span v-else>无</span>
				</p>
				<p class='title showInfo'>诊断详情</p>
				<p class='content bg-fff textInfo'>
					<span v-if='info.caseResult'>{{info.caseResult}}</span>
					<span v-else>无</span>
				</p>
				<p class='title showInfo'>治疗建议</p>
				<p class='content bg-fff textInfo'>
					<span v-if='info.doctorTips'>{{info.doctorTips}}</span>
					<span v-else>无</span>
				</p>
			</div>
			<!--处方-->
			<div v-if='num==1'>
				<ul class='cfList bg-fff' v-for='(data,index) in dataList' :key='index'>
					<li class='bg-fff'>
						<div class='partyTitle paddingRight clearfix'>
							<span class='pull-left'>处方{{index+1}}</span>
							<span class='pull-right'>{{data.recipeHeader.status|groupTypefilter}}</span>
						</div>
					</li>
					<li class='showList' v-for='item in data.recipeItemList' :key='index'>
						<p class='showTitle'>{{item.medicinesName}}  {{item.single}}</p>
						<p class='showText'>数量：{{item.quantity}} {{item.unit}}</p>
						<p class='showText'>用法用量：{{item.usage}} {{item.tips}}</p>
					</li>
				</ul>
			</div>
			<!--检查单-->
			<div v-if='num==2' class='check'>
				<ul>
					<li class='bg-fff marginBottom' v-for='(check,index) in checkList' :key="index">
						<div class='partyTitle'>
							检查单{{index+1}}
						</div>
						<ul class='checkList'>
							<li class='clearfix' v-for='(item,index) in check.checkItemList' :key="index">
								<span class='pull-left checkLeft'>{{index+1}}.{{item.checkName}}</span>
								<span class='pull-right checkRight'>¥{{item.price}}</span>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				status: '',
				num:0,
				consultation_id:'',
				isCheck:'',
				isRecipe:'',
				info:{},
				patient:{},
				dataList:[],
				checkList:[]
			}
		},
		mounted() {
			this.consultation_id=this.$route.query.consultation_id
			this.getData()
		},
		methods: {
			//切换状态栏
			changeStatus: function(str,index,id) {
				this.num=index
				this.status = str;
				if(index==1){
					this.getRequest('/weixin/findRecipeByCaseId/'+id).then((data) => {
						if(data.code==0){
							this.dataList=data.recipeList
						}else{
							mui.toast(data.msg)
						}
					})
				}else if(index==2){
					this.getRequest('/weixin/findCheckByCaseId/'+id).then((data) => {
						if(data.code==0){
							console.log(data)
							this.checkList=data.checkList
//							this.dataList=data.recipeList
						}else{
							mui.toast(data.msg)
						}
					})
				}
			},
			//获取数据
			getData() {
				this.getRequest('/weixin/getHisCaseInfo', {
					caseCode: this.consultation_id
				}).then((data) => {
					if(data.code==0){
						this.isCheck=data.isCheck
						this.isRecipe=data.isRecipe
						this.info=data.hisCaseInfo
						this.patient=data.patient
					}else{
						mui.toast(data.msg)
					}
				})
			}
		}
	}
</script>

<style scoped>
	.mui-control-item {
		position: relative;
	}
	
	.mui-control-item.mui-active span {
		height: 2px;
		left: 0px;
		width: 30%;
		display: block;
		background-color: #18BC9A;
		margin: 0 auto;
	}
	.showInfo{
		padding: 0 0.28rem;
	}
	.title{
		height: 0.75rem;
		line-height: 0.75rem;
		font-size: 0.28rem;
	}
	.name{
		height: 0.92rem;
		line-height: 0.92rem;
		font-size: 0.3rem;
		color: #333;
	}
	.content{
		min-height: 1.34rem;
		font-size: 0.3rem;
		line-height: 0.42rem;
	}
	.textInfo{
		padding: 0.26rem 0.3rem;
		color: #333;
	}
	.partyTitle{
		line-height: 0.8rem;
		font-size: 0.26rem;
		color: #999;
		border-bottom: 0.01rem solid #E6E6E6;
		margin-left: 0.28rem;
	}
	.paddingRight{
		padding-right: 0.28rem;
	}
	.cfList{
		margin-top: 0.22rem;
		padding-bottom: 0.38rem;
		margin-bottom: 0.2rem;
	}
	.showList{
		padding: 0.25rem 0.3rem 0.09rem 0.3rem;
	}
	.showTitle{
		line-height: 0.38rem;
		font-size: 0.32rem;
		color: #333;
		margin-bottom: 0.16rem;
	}
	.showText{
		line-height: 0.33rem;
		font-size: 0.24rem;
		margin-bottom: 0.03rem;
	}
	.check{
		margin-top: 0.22rem;
	}
	.checkList{
		padding: 0.25rem 0.3rem 0.1rem 0.3rem;
	}
	.checkList li{
		line-height: 0.38rem;
		font-size: 0.32rem;
		margin-bottom: 0.3rem;
	}
	.checkLeft{
		font-size: 0.32rem;
		color: #333;
	}
	.checkRight{
		font-size: 0.28rem;
		color: #FA5D40;
	}
	.marginBottom{
		margin-bottom: 0.2rem;
	}
</style>