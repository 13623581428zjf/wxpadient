<template>
	<div class="mui-content">
		<ul class="mui-table-view" v-if='isShow=="Y"'>
			<li class="mui-table-view-cell clearfix" v-for='(item,index) in caseList'  @click='importCase(index)'>
				<div class="pull-left">
					<div class="mui-input-row mui-radio">
						<label></label>
						<input name="radio1" type="radio" v-if='index==0' :checked='checkedZero'>
						<input name="radio1" type="radio" v-else :checked='checked==index'>
					</div>
				</div>
				<div class="pull-right" style=" width: 90%; margin-left:5px;">
					<p class="text-over2">{{item.content}}</p>
					<p>{{item.data}}</p>
				</div>
			</li>
		</ul>
		<div v-else>
			<img src="../../assets/img/default.png" alt="" class='defaultImg'/>
			<p class='defalutText'>暂无相关数据</p>
		</div>
		<div class="footer">
			<button type="button" class="mui-btn mui-btn-success" @click='chooseMsg()'>导入</button>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				caseList: [],
				content:'',
				queryPictureList:[],
				inquisitionType:'',
				checked:'',
				chooseIndex:'',
				isShow:'Y',
				checkedZero:'',
				desc:''
			};
		},
		mounted: function() {
			this.showList()
			this.inquisitionType=this.$route.query.inquisitionType
			this.desc=this.$route.query.desc
			this.localIds=this.$route.query.localIds
		},
		methods: {
			showList() {
				this.postRequest('/weixin/patientCase').then((data) => {
					this.caseList = data.caseList
					if(data.caseList.length==0){
						this.isShow='N'
					}else{
						this.isShow='Y'
					}
				})
			},
			importCase(index) {
				if(index==0){
					this.checkedZero=true
					this.chooseIndex=0
				}else{
					this.checked=index
					this.chooseIndex=index
				}
			},
			getInfo(id){
				this.postRequest('/weixin/patientCaseInfo', {
					id: parseInt(id)
				}).then((data) => {
					if(data.code=='0'){
						this.queryPictureList = data.map.queryPictureList;
						this.$router.push({name:'/inquisition/myInquition',query:{content:this.content,queryPictureList:this.queryPictureList,inquisitionType:this.inquisitionType}})
					}else{
						mui.toast(data.msg)
					}
				})
			},
			chooseMsg(){
				if(this.chooseIndex === ''){
					this.$router.push({name:'/inquisition/myInquition',query:{inquisitionType:this.inquisitionType,desc:this.desc,localIds:this.localIds}})
				}else{
					this.content=this.caseList[this.chooseIndex].content
					this.getInfo(this.caseList[this.chooseIndex].id)
				}
			}
		}
	}
</script>

<style scoped>
	.mui-content>.mui-table-view:first-child {
		margin-top: 0;
	}
	.mui-btn{
		width: 100%;
		height: 1rem;
		color: #fff;
		border-radius: 0;

	}
	.mui-checkbox label,
	.mui-radio label {
		padding-right: 0px;
		width: .56rem;
		height: .7rem;
		line-height: .56rem;
	}
	
	.mui-checkbox input[type=checkbox],
	.mui-radio input[type=radio] {
		right: 0px;
	}
	
	.mui-checkbox input[type=checkbox]:checked:before,
	.mui-radio input[type=radio]:checked:before {
		color: #18BC9A;
	}
	
	.mui-table-view-cell {
		border-bottom: 1px solid #eee;
	}
	
	.mui-table-view:after {
		height: 0;
	}
	
	.mui-btn-green,
	.mui-btn-positive,
	.mui-btn-success {
		border-radius: 0;
		border: 1px solid #18BC9A;
		background-color: #18BC9A;
	}
	
	.mui-btn-success:enabled:active {
		border: 1px solid #52A58E;
		background-color: #52A58E;
	}
</style>