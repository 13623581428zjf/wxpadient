<template>
	<div>
		<div class="search clearfix bg-f5f5f5">
			<input v-model='title' placeholder="请输入关键字" />
			<img src="../../assets/img/searchImg.png" alt="" class='searchImg' />
			<span class='pull-right searchText' @click='search()'>搜索</span>
		</div>
		<div id="refreshContainer" class="mui-content mui-order-list mui-scroll-wrapper">
			<div class="mui-scroll">
				<ul class='healthly clearfix' style="text-align: left;"  v-if='isShow=="Y"'>
					<li class='bg-fff' v-for='data in dataList' @tap='$router.push({name:"/bulletin/htalthyDetail",params:{id:data.id}})'>
						<div class='healthlyTop'>
							<img :src="data.picture" alt="" class='pull-left' v-if='data.picture'/>
							<img src="../../assets/img/docter_head.png" alt="" class="pull-left  mg-right-px15" v-else>
							<p class='p1'>
								<span class='text1'>{{data.name}}</span>
								<span class='text2'>|</span>
								<span class='text3'>{{data.jobName}}</span>
							</p>
							<p class='p2'>{{data.hospital}}&nbsp;{{data.department}}</p>
						</div>
						<div class='healthlyBody'>
							<p class='healthlyBody_title text-over2'>{{data.title}}</p>
							<p class='healthlyBody_time'>{{data.releaseDate|sliceTime}}
								<span class='pull-right'>阅读{{data.num}}</span>
							</p>
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
				pageIndex:1,
				pageSize:20,
				dataList:[],
				title:'',
				isShow:'Y'
			}
		},
		mounted(){
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
				this.postRequest('/weixin/information/findInformationList',{
					title:this.title,
					pageIndex:this.pageIndex,
					pageSize:this.pageSize
				}).then((data) => {
					this.dataList=data.dataList
					if(data.dataList.length==0){
						this.isShow='N'
					}else{
						this.isShow='Y'
					}
				})
			},
			//搜索
			search(){
				this.pageIndex=1
				this.getInfo()
			},
			pullfreshDown() {
				this.postRequest('/weixin/information/findInformationList', {
					title:this.title,
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
				this.postRequest('/weixin/information/findInformationList', {
					title:this.title,
					pageIndex:this.pageIndex,
					pageSize:this.pageSize
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
	/*健康咨询*/
	*{
		touch-action: none;  
	}
	.search {
		width: 100%;
		padding: 14px 15px;
		height: 1.24rem;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		text-align: left;
		z-index: 99;
	}
	.mui-scroll-wrapper{
		top: 60px;
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
		position: relative;
		top: -0.5rem;
		left: 0.34rem;
		z-index: 99;
	}
	
	.searchText {
		color: #18BC9A;
		font-size: 0.3rem;
		position: absolute;
		right: 0.58rem;
		top: 0.42rem;
	}
	
	.healthly li {
		padding: 0 0.3rem;
		margin-bottom: 0.2rem;
	}
	
	.healthlyTop {
		padding: 0.3rem 0 0.2rem 0;
		border-bottom: 0.01rem solid #f0f0f0;
	}
	
	.healthlyTop img {
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 0.16rem;
	}
	
	.healthlyTop .p1 .text1 {
		line-height: 0.26rem;
		font-size: 0.26rem;
		color: #333;
	}
	
	.healthlyTop .p1 .text2 {
		color: #ccc;
	}
	
	.healthlyTop .p1 .text3 {
		line-height: 0.34rem;
		font-size: 0.24rem;
		color: #333;
	}
	
	.healthlyTop .p2 {
		line-height: 0.34rem;
		font-size: 0.24rem;
		color: #BEBEBE;
	}
	
	.healthlyBody_title {
		line-height: 0.44rem;
		font-size: 0.32rem;
		color: #333;
		margin: 0.13rem 0 0.08rem 0;
	}
	
	.healthlyBody_text {
		line-height: 0.36rem;
		font-size: 0.26rem;
		color: #666;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.healthlyBody_time {
		line-height: 0.34rem;
		font-size: 0.24rem;
		color: #ccc;
		padding: 0.2rem 0;
	}
</style>