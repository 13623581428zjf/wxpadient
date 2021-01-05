<template>
	<div class="mui-centent">
		<div class="search  bg-f5f5f5">
			<input type="text" v-model="searchId" placeholder="搜索医院、医生、科室、疾病" />
			<img src="../../assets/img/searchImg.png" alt="" class='searchImg' />
			<span class='searchText' @click="searchHospital">搜索</span>
		</div>
		<div id="refreshContainer" class="mui-content mui-scroll-wrapper" style="background-color:#fff;margin-top: 62px;">
			<div class="mui-scroll">
				<!--数据列表-->
				<ul class="mui-table-view mui-table-view-chevron"  v-if='isShow=="Y"'>
					<li v-for="item in lists">
						<div class='bg-fff changeDoctor_part'>
							<div class="myDoctor clearfix">
								<div class='clearfix'>
									<div class="myDoctor_left pull-left clearfix" @tap='$router.push({name:"/docter/doctorMain",query:{partyId:item.partyId}})'>
										<img :src="item.picture" alt="头像" v-if="item.picture" />
										<img src="../../assets/img/docter_head.png" alt="头像" v-else />
									</div>
									<div class="myDoctor_right pull-left">
										<p class='p1'>
											<span @tap='$router.push({name:"/docter/doctorMain",query:{partyId:item.partyId}})'>
												<span class='color-333 doctorName'>{{item.name}}</span>
												<span class='color-333 doctorRanks'>{{item.job}}</span>
											</span>
											<button href="javascript:;" class='follow pull-right' v-if="!item.concern" @click="followDoc(item)">关注</button>
											<button href="javascript:;" class='cancelfollow pull-right' v-else>已关注</button>
										</p>
										<p class='p2' @tap='$router.push({name:"/docter/doctorMain",query:{partyId:item.partyId}})'>{{item.hospital}}&nbsp;{{item.deparment}}</p>
									</div>
								</div>
								<p class='describe over-ellipsis' @tap='$router.push({name:"/docter/doctorMain",query:{partyId:item.partyId}})'>擅长：{{item.strong || '请完善信息'}}</p>
							</div>
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
				searchId: '',
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
				this.postRequest('/weixin/Doctorlist', {
					key: this.searchId,
					pageIndex: this.pageIndex,
					pageSize: 10
				}).then((data) => {
					this.lists = data.dataList;
					if(data.dataList.length==0){
						this.isShow='N'
					}else{
						this.isShow='Y'
					}
				})
			},
			//搜索条件
			searchHospital(){
				setStore('searchId',this.searchId)
				this.pageIndex=1
				this.getInfo()
			},
			//关注
			followDoc: function(item) {
				this.postRequest('/weixin/createdConcern',{
					partyId: item.partyId,
				}).then((data)=>{
					mui.toast('关注成功');
					item.concern='Y'
					// this.pageIndex=1
					// this.getInfo();
				})
			},
			pullfreshDown() {
				this.searchId=getStore('searchId')
				this.postRequest('/weixin/Doctorlist', {
					key: this.searchId,
					pageIndex: 1,
					pageSize: 10
				}).then((data) => {
					console.log(data);
					this.lists = data.dataList;
					mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
					mui('#refreshContainer').pullRefresh().refresh(true); //重置上拉刷新
					this.pageIndex = 1;
				})
			},
			pullfreshUp() {
				this.searchId=getStore('searchId')
				this.pageIndex++;
				this.postRequest('/weixin/Doctorlist', {
					key: this.searchId,
					pageIndex: this.pageIndex,
					pageSize: 10
				}).then((data) => {
					if(data.dataList.length == 0) {
						mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
						this.pageIndex = 1;
					} else {
						for(var i = 0; i < data.dataList.length; i++) {
							this.lists.push(data.dataList[i]);
						}
						mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
					}
				})
			}
		}
	}
</script>

<style scoped>
	* {
		touch-action: pan-y;
	}
	html,
	body,
	.mui-centent {
		height: 100%;
	}
	
	.mui-table-view:before {
		height: 0;
	}
	
	.mui-table-view:after {
		background-color: #e6e6e6;
	}
	
	.mui-table-view .cancelfollow {
		display: inline-block;
		width: 1.4rem;
		height: 0.6rem;
		line-height: 0.6rem;
		background-color: #ccc;
		border-radius: 3px;
		color: #fff !important;
		text-align: center;
		margin-top: 0.16rem;
		border: none;
	}
	
	.mui-table-view .cancelfollow:active {
		background-color: #999;
	}
	
	.mui-table-view .follow:active {
		background-color: #1c977f;
	}
	/*更换医生*/
	
	.search {
		width: 100%;
		padding: 14px 15px;
		height: 1.24rem;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		text-align: left;
	}
	
	.search input {
		width: 5.7rem;
		height: 0.68rem;
		line-height: 0.34rem;
		background-color: #FFFFFF !important;
		border: 0.01rem solid #F5F5F5;
		border-radius: 0.34rem;
		font-size: 0.28rem;
		padding-left: 0.88rem;
		outline: none;
		box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
		-webkit-appearance: none;
	}
	
	.search input::-webkit-input-placeholder {
		font-size: 0.28rem;
	}
	
	.searchImg {
		width: 0.34rem;
		height: 0.36rem;
		display: block;
		position: absolute;
		top: 0.45rem;
		left: 0.6rem;
		z-index: 99;
	}
	
	.searchText {
		color: #18BC9A;
		font-size: 0.3rem;
		position: absolute;
		right: 0.5rem;
		top: 0.42rem;
	}
	
	.mui-table-view .changeDoctor_part {
		border-bottom: 0.01rem solid #E6E6E6;
		text-align: left;
	}
	
	.mui-table-view .follow {
		display: inline-block;
		width: 1.4rem;
		height: 0.6rem;
		line-height: 0.6rem;
		background-color: #18BC9A;
		border-radius: 3px;
		color: #fff !important;
		text-align: center;
		margin-top: 0.16rem;
		border: none;
	}
	
	.myDoctor_part {
		margin-bottom: 0.2rem;
	}
	
	.myDoctor {
		padding: 0.2rem 0.3rem 0 0.3rem;
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
	}
	
	.myDoctor_right .p1 .doctorName {
		font-size: 0.36rem;
		margin-right: 0.16rem;
	}
	
	.doctorRanks {
		font-size: 0.26rem;
		border-left: 0.01rem solid #ccc;
		padding-left: 0.14rem;
	}
	
	.describe {
		height: 0.36rem;
		line-height: 0.36rem;
		color: #999;
		font-size: 0.26rem;
		margin: 0.18rem 0 0.2rem 0;
		width: 100%;
	}
</style>