<template>
	<div class="mui-content">
		<div id="refreshContainer" class="mui-content mui-order-list mui-scroll-wrapper">
			<div class=" mui-scroll">
				<ul class="mui-table-view" v-if='status=="Y"'>
					<li class="mui-table-view-cell mui-media" v-for='(data,index) in dataList' :key='index' @tap='toggle(index)'>
						<div class="mui-media-body">
							<p class="color-333 font-px16" v-if='num==index&&isShow'>{{data.content}}</p>
							<p class="color-333 font-px16  text-over2" v-else>{{data.content}}</p>
							<p class="color-999 font-px12">{{data.releaseDate|sliceTime}}</p>
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
	
	export default {
		data: function() {
			return {
				partyId:'',
				pageIndex:1,
				pageSize:20,
				dataList:[],
				num:1,
				isShow:false,
				status:'Y'
			}
		},
		mounted(){
			this.partyId=this.$route.params.partyId
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
			getInfo: function() {
				this.postRequest('/weixin/findNoticeByDoctor',{
					partyId:parseInt(this.partyId),
					pageIndex:this.pageIndex,
					pageSize:this.pageSize
				}).then((data) => {
					this.dataList=data.dataList
					if(data.dataList.length==0){
						this.status='N'
					}else{
						this.status='Y'
					}
				})
			},
			//显示公告与隐藏
			toggle(index){
				this.num=index
				this.isShow=!this.isShow
			},
			pullfreshDown() {
				this.postRequest('/weixin/findNoticeByDoctor', {
					partyId:parseInt(this.partyId),
					pageIndex:this.pageIndex,
					pageSize:this.pageSize
				}).then((data) => {
					this.dataList=data.dataList
					mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
					mui('#refreshContainer').pullRefresh().refresh(true); //重置上拉刷新
					this.pageIndex = 1;
				})
			},
			//上拉加载
			pullfreshUp() {
				this.pageIndex++;
				this.postRequest('/weixin/findNoticeByDoctor', {
					partyId:parseInt(this.partyId),
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}).then((data) => {
					if(data.dataList.length == 0) {
						this.pageIndex = 1;
						mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
					} else {
						for(var i = 0; i < data.dataList.length; i++) {
							this.dataList.push(data.dataList[i]);
						}
						mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
					}
				})
			}
		}
	}
</script>

<style scoped>
	.mui-table-view-cell p {
		line-height: .48rem;
	}
	.mui-content > .mui-table-view:first-child{
		margin-top: 0;
	}
	*{
		touch-action: none;  
	}
</style>