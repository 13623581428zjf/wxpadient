<template>
	<div class="mui-content" style="margin-bottom: 50px;">
		<ul class='dossierList'  v-if='isShow=="Y"'>
			<li class='bg-fff' v-for='item in caseList'>
				<div class="clearfix" @click='toLink(item.id)'>
					<img src="../../assets/img/dossierImg.png" alt="" class='dossierImg pull-left' />
					<div class='pull-left dossierList_right'>
						<p class='font-15rem color-333 info1 text-over2'>{{item.content}}</p>
						<p class='info2 font-12rem color-999'>{{item.date}}</p>
					</div>
				</div>
			</li>
		</ul>
		<div v-else class='defaultInfo'>
			<img src="../../assets/img/default.png" alt="" class='defaultImg'/>
			<p class='defalutText'>暂无相关数据</p>
		</div>
		<div class="footer">
			<button type="button" class="mui-btn mui-btn-success" @click='addCase()'>添加病历</button>
		</div>
	</div>
</template>
<script>
	export default {
		data: function() {
			return {
				caseList: [],
				isShow:'Y'
			};
		},
		mounted: function() {
			this.showList()
		},
		methods: {
			//添加病例
			addCase() {
				this.$router.push("/case/addDossier");
			},
			toLink(id) {
				this.$router.push({
					name: "/case/editDoddier",
					query: {
						id: id
					}
				});
			},
			showList() {
				this.postRequest('/weixin/patientCase').then((data) => {
					this.caseList = data.caseList
					if(data.caseList.length==0){
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
	.mui-btn{
		width: 100%;
		height: 1rem;
		color: #fff;
		border-radius: 0;

	}
	.dossierList li {
		padding: 0.13rem 0.3rem;
		border-bottom: 0.01rem solid #E6E6E6;
		height: 1.4rem;
	}
	
	.dossierList li:last-child {
		border-bottom: 0;
	}
	
	.dossierImg {
		width: 0.26rem;
		height: 0.28rem;
		margin: 0.08rem 0.2rem 0 0;
	}
	
	.dossierList_right .info1 {
		height: 0.8rem;
		line-height: 0.42rem;
		width: 6.4rem;
		text-align: left;
	}
	
	.dossierList_right .info2 {
		line-height: 0.34rem;
		width: 6.4rem;
		text-align: left;
	}
	.defaultInfo{
		overflow: hidden;
	}
</style>