<template>
	<div class="mui-content" id="app" v-cloak>
		<div class="prelist">
			<div class="prepeo"><img src="../../assets/img/Group 2@2x.png" /></div>
			<div class="prename">{{allMsg.patientName}}</div>
			<div class="prebo"><span style="color: #9D9D9D;">|</span>&nbsp;{{allMsg.patientSex}}&nbsp;<span style="color: #9D9D9D;">|</span></div>
			<div class="preolder">{{allMsg.patientAge}}岁</div>
		</div>
		<!--诊断结果-->
		<div class="result">
			<div>诊断结果</div>
			<div>{{this.caseResult}}</div>
		</div>
		<div style="width: 100%;height: .2rem;"></div>
		<!--Rp-->
		<div class="prelist">Rp</div>
		<div class="named" v-for="item in presciotion">
			<div class="name1">{{item.medicinesName}}({{item.single}})</div>
			<div class="name2">数量:{{item.quantity}}{{item.unit}}</div>
			<div class="name3">用法用量:{{item.usage}},{{item.tips}}</div>
		</div>
		<div class="dayafd">
			<div>开方日期&nbsp;&nbsp;{{this.createDate|areaCut}}</div>
			<div>有效期:&nbsp;3天</div>
		</div>
		<!--开方老师-->
		<div class="opendier">
			<div>开方医师:</div>
			<div><img src="../../assets/img/h.png" /></div>
		</div>
		<div class="opendier">
			<div>审核/调配:</div>
			<div><img src="../../assets/img/h.png" /></div>
		</div>
		<div class="opendier">
			<div>审核/发药:</div>
			<div><img src="../../assets/img/h.png" /></div>
		</div>
		<div style="width: 100%;height: 1rem;"></div>
		<!--底部-->
		<footer @click="clearscriptions()" v-if="this.recipeHeader==0">
			取消申请
		</footer>
		<!--底部-->
		<footer @click="goodscriptions()" v-if='this.recipeHeader==1'>
			查看新处方
		</footer>
		<!--底部-->
		<footer @click="replaceiptions()" v-if='this.recipeHeader==2'>
			需重新问诊
		</footer>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				id: '',
				againId: '',
				//患者资料
				allMsg: {},
				//诊断结果
				caseResult: '',
				//药品信息
				presciotion: [],
				//开方日期
				createDate: '',
				//状态
				recipeHeader: '',
				//续方id
				conId: '',
			}
		},
		mounted() {
			console.log(this.$route.query.id);
			console.log(this.$route.query.againId);
			this.id = this.$route.query.id;
			this.againId = this.$route.query.againId;
			this.getAllMsg();
		},
		methods: {
			doction: function(value) {
				this.index = value;
				this.getAllMsg();
			}, //获取所有数据
			getAllMsg() {
				this.postRequest('/weixin/recipeAgain/getInfoById', {
					id: parseInt(this.id),
					againId: parseInt(this.againId),
				}).then((data) => {
					if(data && data.code === 0) {
						this.createDate = data.recipeHeader.createDate;
						this.allMsg = data.recipeHeader.patient;
						this.presciotion = data.recipeHeader.recipeItemList;
						this.recipeHeader = data.entity.status;
						this.caseResult = data.recipeHeader.caseEntity.caseResult;
						this.conId = data.entity.id;
					} else {
						mui.toast(data.msg);
					}
				})
			},
			//取消申请
			clearscriptions() {
				this.postRequest('/weixin/recipeAgain/cancelRecipeAgain', {
					id: parseInt(this.conId),
				}).then((data) => {
					if(data && data.code === 0) {
						console.log(data);
						this.$router.push({
							name: '/successive/continuation',
						})
					} else {
						mui.toast(data.msg);
					}
				})
			},
			//查看新处方
			goodscriptions() {
				this.$router.push({
					name: '/successive/continuationtwo',
					query: {
						id: 1
					}
				})
			}
		},
		filters: {
			areaCut: function(value) {
				if(!value) return '';
				return value.substring(0, value.length - 9);
			}
		},

	}
</script>

<style scoped>
	.prelist {
		width: 100%;
		height: 1rem;
		background: #fff;
		line-height: 1rem;
		display: flex;
		padding-left: .3rem;
		border-bottom: .01rem solid #E6E6E6;
	}
	
	.prepeo {
		width: 10%;
	}
	
	.prepeo img {
		width: .5rem;
		height: .5rem;
		margin: .22rem .1rem;
	}
	
	.prename {
		width: 28%;
		font-size: .32rem;
		color: #333333;
		letter-spacing: 0.00188rem;
		text-align: center;
	}
	
	.prebo {
		width: 18%;
		font-size: .32rem;
		color: #333333;
		letter-spacing: 0.00188rem;
		text-align: center;
	}
	
	.preolder {
		width: 54%;
		font-size: .32rem;
		color: #333333;
		text-align: left;
		letter-spacing: 0.00188rem;
	}
	
	.result {
		width: 100%;
		height: 2.3rem;
		padding: .2rem;
		text-align: left;
		background: #fff;
	}
	
	.result div:nth-of-type(1) {
		font-size: .32rem;
		color: #333333;
		height: .5rem;
		line-height: .5rem;
		letter-spacing: 0.0056rem;
	}
	
	.result div:nth-of-type(2) {
		font-size: .3rem;
		color: #666666;
		height: 1.8rem;
		line-height: 1.8rem;
		line-height: .41rem;
		text-align: justify;
		letter-spacing: 0.0056rem;
	}
	
	.named {
		width: 100%;
		height: 1.6rem;
		background: #fff;
		padding: .2rem .3rem;
		border-bottom: .01rem solid #E6E6E6;
		text-align: left;
	}
	
	.name1 {
		width: 100%;
		height: .43rem;
		line-height: .43rem;
		font-size: .30rem;
		color: #333333;
		letter-spacing: 0;
	}
	
	.name2 {
		font-size: .28rem;
		color: #666666;
		height: .43rem;
		line-height: .43rem;
		letter-spacing: 0;
	}
	
	.name3 {
		font-size: .28rem;
		color: #666666;
		height: .43rem;
		line-height: .43rem;
		letter-spacing: 0;
	}
	
	.dayafd {
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		font-size: .32rem;
		color: #333333;
		display: flex;
		background: #fff;
		padding-left: .3rem;
		margin-top: .15rem;
		letter-spacing: 0.0056rem;
		border-bottom: .01rem solid #E6E6E6;
		text-align: left;
	}
	
	.dayafd div:nth-of-type(1) {
		width: 70%;
	}
	
	.dayafd div:nth-of-type(2) {
		width: 30%;
		text-align: right;
		padding-right: .3rem;
	}
	
	.opendier {
		width: 100%;
		display: flex;
		background: #fff;
		height: 1.3rem;
		padding: .3rem;
		font-size: .32rem;
		color: #333333;
		letter-spacing: 0.0056rem;
	}
	
	.opendier div:nth-of-type(1) {
		padding-top: 2%;
	}
	
	.opendier div img {
		width: 1.28rem;
		height: .6rem;
		margin-left: 1rem;
	}
	
	footer {
		width: 100%;
		height: 1rem;
		text-align: center;
		line-height: 1rem;
		background: #18BC9A;
		color: #fff;
		font-size: .34rem;
		position: fixed;
		bottom: 0;
		left: 0;
	}
</style>