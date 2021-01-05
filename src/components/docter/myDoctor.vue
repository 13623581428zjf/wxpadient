<template>
	<div class="mui-centent" >
		<div id="refreshContainer" class="mui-content mui-scroll-wrapper">
			<div class="mui-scroll">
				<!--数据列表-->
				<ul class="mui-table-view mui-table-view-chevron" v-if='isShow=="Y"'>
					<li v-for="(item,index) in lists">
						<div class='bg-fff myDoctor_part'>
							<div class="myDoctor clearfix">
								<div class='clearfix'>
									<div class="myDoctor_left pull-left clearfix"  @tap='$router.push({name:"/docter/doctorMain",query:{partyId:item.party_id}})'>
										<img :src="item.picture" alt="" v-if="item.picture" />
										<img src="../../assets/img/docter_head.png" alt="" v-else/>
									</div>
									<div class="myDoctor_right pull-left">
										<p class='p1'>
											<span  @tap='$router.push({name:"/docter/doctorMain",query:{partyId:item.party_id}})'>
												<span class='color-333 doctorName'>{{item.name}}</span>
												<span class='color-333 doctorRanks'>{{item.job}}</span>
											</span>
											<span class="mui-radio mui-left pull-right">
												<input name="radio" type="radio" :value="item.approve" :checked='item.approve' @click="defaultDoctor(item)">
												<label class='radioText'>设置为默认</label>
											</span>
										</p>
										<p class='p2'  @tap='$router.push({name:"/docter/doctorMain",query:{partyId:item.party_id}})'>{{item.hospital}}&nbsp;{{item.deparment}}</p>
									</div>
								</div>
								<p class='describe over-ellipsis'  @tap='$router.push({name:"/docter/doctorMain",query:{partyId:item.party_id}})'>擅长：{{item.strong || '请完善信息'}}</p>
							</div>
							<ul class='actionList clearfix'>
								<li>
									<button href="" class='color-F77B3F' @click="sides({ name: '/register/appointment',query:{id:item.party_id}},'',item.party_id)">预约挂号</button>
								</li>
								<li>
									<button class='color-FFB43B yywz' @click="sides({ name: '/inquisition/inquiry',query:{schedulingType:'inquisition',partyId:item.party_id}},'inquisition',item.party_id)">预约问诊</button>
								</li>
								<li>
									<button  class='color-18BC9A' @click="sides({ name: '/consultation/consultChat',query:{partyId:item.party_id}},'inquisition',item.party_id)">免费咨询</button>
								</li>
								<li>
									<button  class='color-00B2F7'>云药房</button>
								</li>
							</ul>
						</div>
					</li>
				</ul>
				<div v-else>
					<img src="../../assets/img/default.png" alt="" class='defaultImg'/>
					<p class='defalutText'>暂无相关数据</p>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import { getStore, setStore} from "@/utils/storage";
	export default {
		data: function() {
			return {
				lists: [],
				pageIndex: 1,
				isShow:'Y'
			};
		},
		mounted: function() {
			this.getInfo()
			for(var i = mui.hooks.inits.length-1,item;i>=0;i--){
				item=mui.hooks.inits[i];
				if(item.name=="pullrefresh"){
				    item.repeat=true;
				}
			}
			mui.init({
				pullRefresh: {
					container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
					down: {
						height: 50, //可选,默认50.触发下拉刷新拖动距离,
						auto: false, //可选,默认false.自动下拉刷新一次
						contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
						contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
						contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
						callback: this.pullfreshDown //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
					},
					up: {
						height: 50, //可选.默认50.触发上拉加载拖动距离
						auto: false, //可选,默认false.自动上拉加载一次
						contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
						contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
						callback: this.pullfreshUp //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
					}

				}
			});
		},
		methods: {
			//获取医生列表
			getInfo() {
				this.postRequest('/weixin/relationList', {
					pageIndex: this.pageIndex,
					pageSize: 10,
				}).then((data) => {
					for(var i = 0; i < data.dataList.length; i++) {
						if(data.dataList[i].approve == 'Y') {
							data.dataList[i].approve = true;
						} else {
							data.dataList[i].approve = false;
						}
					}
					this.lists = data.dataList;
					if(data.dataList.length==0){
						this.isShow='N'
					}else{
						this.isShow='Y'
					}
				})
			},
			//下拉刷新
			pullfreshDown() {
				this.postRequest('/weixin/relationList', {
					pageIndex: 1,
					pageSize: 10
				}).then((data) => {
					for(var i = 0; i < data.dataList.length; i++) {
						if(data.dataList[i].approve == 'Y') {
							data.dataList[i].approve = true;
						} else {
							data.dataList[i].approve = false;
						}
					}
					this.lists = data.dataList;
					mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
					mui('#refreshContainer').pullRefresh().refresh(true); //重置上拉刷新
					this.pageIndex = 1;
				})
			},
			//上拉加载
			pullfreshUp() {
				this.pageIndex++;
				this.postRequest('/weixin/relationList', {
					pageIndex: this.pageIndex,
					pageSize: 10,
				}).then((data) => {
					if(data.dataList.length == 0) {
						mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
						this.pageIndex = 1;
					} else {
						for(var i = 0; i < data.dataList.length; i++) {
							if(data.dataList[i].approve == 'Y') {
								data.dataList[i].approve = true;
							} else {
								data.dataList[i].approve = false;
							}
							this.lists.push(data.dataList[i]);
						}
						mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
					}
				})
			},
			sureInfo(){
				var _this=this
					var btnArray = ['取消', '确定'];
					mui.confirm('', '请先完善个人信息！', btnArray, function(e) {
						if(e.index==1){
							_this.$router.push({name:'/user/information'})
						}
				})
			},
			isForbidden(path,partyId){
				this.getRequest('/weixin/isDoctorBan/'+partyId).then((data) => {
					if(data.code==500){
						mui.toast(data.msg)
					}else{
						this.$router.push(path)
					}
				})
			},
			//挂号，问诊，咨询入口
			sides(path,type,partyId) {
				this.complete=getStore('complete')
				if(!this.complete){
					this.postRequest('/weixin/completeInfo',{
						type:type
					}).then((data)=>{
						if(data.code==0){
							this.complete=data.complete
							setStore('complete',this.complete)
							if(this.complete=='Y'){
								//判断医生是否禁用
								this.isForbidden(path,partyId)
							}else{
								this.sureInfo()
							}
						}
					})
				}else if(this.complete=='Y'){
					//判断医生是否禁用
						this.isForbidden(path,partyId)
				}else{
					this.sureInfo()
				}
			},
			//选择默认
			defaultDoctor(item) {
				this.postRequest('/weixin/updateApprove',{
					partyId: parseInt(item.party_id),
				}).then((data)=>{
					mui.toast('设置成功');
					this.getInfo();
				})
			}
		}
	}
</script>

<style scoped>
	*{
		touch-action: pan-y
	}
	.mui-table-view {
		background-color: transparent;
	}
	
	.mui-table-view:after {
		height: 0;
	}
	
	.myDoctor_part {
		margin-bottom: 0.2rem;
	}
	
	.myDoctor {
		padding: 0.09rem 0.3rem 0 0.3rem;
	}
	
	.myDoctor_left {
		width: 1.24rem;
		height: 1.24rem;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 0.22rem;
	}
	
	.myDoctor_left img {
		width: 100%;
		height: 100%;
		display: block;
	}
	
	.myDoctor_right .p1 {
		width: 5.44rem;
		line-height: 0.5rem;
		margin: 0.14rem 0 0.14rem 0;
		text-align: left;
	}
	
	.myDoctor_right .p1 .doctorName {
		font-size: 0.36rem;
		margin-right: 0.16rem;
		text-align: left;
	}
	
	.doctorRanks {
		font-size: 0.26rem;
		border-left: 0.01rem solid #ccc;
		padding-left: 0.14rem;
	}
	
	.settingDafault {
		font-size: 0.24rem;
		position: relative;
		top: 0.02rem;
	}
	
	.myDoctor_right .p2 {
		line-height: 0.26rem;
		font-size: 0.26rem;
		color: #666;
		text-align: left;
	}
	
	.choose_before {
		width: 0.28rem;
		height: 0.28rem;
		display: inline-block;
		position: relative;
		top: 0.06rem;
	}
	
	.describe {
		height: 0.36rem;
		line-height: 0.36rem;
		color: #999;
		font-size: 0.26rem;
		margin: 0.18rem 0 0.2rem 0;
		width: 100%;
		text-align: left;
	}
	
	.actionList {
		border-top: 0.01rem solid #E6E6E6;
		padding: 0.2rem 0.3rem;
	}
	
	.actionList li {
		float: left;
	}
	
	.actionList li button {
		display: inline-block;
		width: 1.5rem;
		height: 0.52rem;
		line-height: 0.52rem;
		border-radius: 3px;
		text-align: center;
		font-size: 0.26rem;
		margin-right: 0.3rem;
	}
	
	.actionList li:last-child button {
		margin-right: 0 !important;
	}
	
	.color-F77B3F {
		border: 0.01rem solid #F77B3F;
		color: #F77B3F !important;
	}
	
	.color-FFB43B {
		border: 0.01rem solid #FFB43B;
		color: #FFB43B !important;
	}
	
	.color-18BC9A {
		border: 0.01rem solid #18BC9A;
		color: #18BC9A !important;
	}
	
	.color-00B2F7 {
		border: 0.01rem solid #00B2F7;
		color: #00B2F7 !important;
	}
	
	.mui-checkbox input[type=checkbox]:before,
	.mui-radio input[type=radio]:before {
		font-size: 0.3rem;
		color: #18BC9A;
	}
	
	.mui-checkbox input[type=checkbox]:checked:before,
	.mui-radio input[type=radio]:checked:before {
		color: #18BC9A;
	}
	
	.mui-radio input[type=radio] {
		width: 0.28rem;
		height: 0.28rem;
		position: absolute;
		top: 0.08rem;
	}
	
	.mui-checkbox.mui-left label,
	.mui-radio.mui-left label {
		padding: 0rem;
		padding-left: 0.8rem;
	}
	
	.radioText {
		font-size: 0.24rem;
		height: 0.5rem;
		line-height: 0.5rem;
		position: relative;
		top: 0.06rem;
	}
</style>