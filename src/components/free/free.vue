<template>
	<div class="mui-content" id="app" v-cloak>
		<div id="refreshContainer" class="mui-content mui-scroll-wrapper" style="background-color:#ebebeb;">
			<div class="mui-scroll">
				<!--数据列表-->
				<ul class="mui-table-view mui-table-view-chevron pd-leftright-px15" style="margin-bottom:48px;padding-bottom:20px;">
					<li class="clearfix">
						<div style="text-align:center;">
							<p class="font-px12" style="margin:20px 0 10px 0;">2018-08-16 08:00</p>
						</div>
						<!-- 自己 -->
						<!-- <div class="mui-chat-cen-self pull-right mg-bottom-px10">
                            <img src="../../img/p2404647190.jpg" style="width:.8rem;height:.8rem; float: right; border-radius:50%;" alt="">
                            <div class="self-news">
                                <div>
                                    <p style="font-size:18px; color:#fff;margin-bottom:10px;">张叁 女 20岁</p>
                                </div>
                                <p>顶顶顶顶顶大大大多多多多多多顶顶顶顶顶顶顶顶顶多多多多多多多多多多多多多多</p>
                                <div class="mui-chat-self-pic">
                                    <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                    <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                    <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                    <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                    <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                </div>
                            </div>
                            <span class="self-triangle"></span>

                        </div> -->
						<!-- 对方 -->
						<div class="mui-chat-cen-others pull-left">
							<img src="../../assets/img/p2404647190.jpg" style="width:.8rem;height:.8rem;float: left; border-radius:50%;" alt="">
							<div class="others-news">
								<p>我是对方我是对方我是对方我是对方我是对方我是对方</p>
							</div>
							<span class="others-triangle"></span>
						</div>
					</li>
					<li class="clearfix">
						<div style="text-align:center;">
							<p class="font-px12" style="margin:20px 0 10px 0;">2018-08-16 08:00</p>
						</div>
						<!-- 自己 -->
						<div class="mui-chat-cen-self pull-right mg-bottom-px10">
							<img src="../../assets/img/p2404647190.jpg" style="width:.8rem;height:.8rem; float: right; border-radius:50%;" alt="">
							<div class="self-news">
								<!-- <div>
                                        <p style="font-size:18px; color:#fff;margin-bottom:10px;">张叁 女 20岁</p>
                                    </div> -->
								<p>我是自己我是自己我是自己我是自己我是自己我是自己我是自己我是自己</p>
								<!-- <div class="mui-chat-self-pic">
                                        <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                        <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                        <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                        <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                        <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                    </div> -->
							</div>
							<span class="self-triangle"></span>

						</div>
						<!-- 对方 -->
						<!-- <div class="mui-chat-cen-others pull-left">
                                <img src="../../img/p2404647190.jpg" style="width:.8rem;height:.8rem;float: left; border-radius:50%;" alt="">
                                <div class="others-news">
                                    <p> 我是对方我是对方我是对方我是对方我是对方我是对方</p>
                                </div>
                                <span class="others-triangle"></span>
                            </div> -->
					</li>
					<li class="clearfix">
						<div style="text-align:center;">
							<p class="font-px12" style="margin:20px 0 10px 0;">2018-08-16 08:00</p>
						</div>
						<!-- 自己 -->
						<!-- <div class="mui-chat-cen-self pull-right mg-bottom-px10">
                                    <img src="../../img/p2404647190.jpg" style="width:.8rem;height:.8rem; float: right; border-radius:50%;" alt="">
                                    <div class="self-news">
                                        <div>
                                            <p style="font-size:18px; color:#fff;margin-bottom:10px;">张叁 女 20岁</p>
                                        </div> 
                                        <p>顶顶顶顶顶大大大多多多多多多顶顶顶顶顶顶顶顶顶多多多多多多多多多多多多多多</p>
                                        <div class="mui-chat-self-pic">
                                            <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                            <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                            <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                            <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                            <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                        </div>
                                    </div>
                                    <span class="self-triangle"></span>
        
                                </div> -->
						<!-- 对方 -->
						<div class="mui-chat-cen-others pull-left">
							<img src="../../assets/img/p2404647190.jpg" style="width:.8rem;height:.8rem;float: left; border-radius:50%;" alt="">
							<div class="others-news">
								<p> 我是对方我是对方我是对方我是对方我是对方我是对方</p>
							</div>
							<span class="others-triangle"></span>
						</div>
					</li>
					<li class="clearfix">
						<div style="text-align:center;">
							<p class="font-px12" style="margin:20px 0 10px 0;">2018-08-16 08:00</p>
						</div>
						<!-- 自己 -->
						<div class="mui-chat-cen-self pull-right mg-bottom-px10">
							<img src="../../assets/img/p2404647190.jpg" style="width:.8rem;height:.8rem; float: right; border-radius:50%;" alt="">
							<div class="self-news">
								<!-- <div>
                                                <p style="font-size:18px; color:#fff;margin-bottom:10px;">张叁 女 20岁</p>
                                            </div> -->
								<p>自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己自己</p>
								<!-- <div class="mui-chat-self-pic">
                                                <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                                <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                                <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                                <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                                <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                            </div> -->
							</div>
							<span class="self-triangle"></span>

						</div>
						<!-- 对方 -->
						<!-- <div class="mui-chat-cen-others pull-left">
                                        <img src="../../img/p2404647190.jpg" style="width:.8rem;height:.8rem;float: left; border-radius:50%;" alt="">
                                        <div class="others-news">
                                            <p> 顶顶顶顶顶大大大多多</p>
                                        </div>
                                        <span class="others-triangle"></span>
                                    </div> -->
					</li>
					<li class="clearfix">
						<div style="text-align:center;">
							<p class="font-px12" style="margin:20px 0 10px 0;">2018-08-16 08:00</p>
						</div>
						<!-- 自己 -->
						<!-- <div class="mui-chat-cen-self pull-right mg-bottom-px10">
                                            <img src="../../img/p2404647190.jpg" style="width:.8rem;height:.8rem; float: right; border-radius:50%;" alt="">
                                            <div class="self-news">
                                                <div>
                                                    <p style="font-size:18px; color:#fff;margin-bottom:10px;">张叁 女 20岁</p>
                                                </div>
                                                <p>顶顶顶顶顶大大大多多多多多多顶顶顶顶顶顶顶顶顶多多多多多多多多多多多多多多</p>
                                                <div class="mui-chat-self-pic">
                                                    <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                                    <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                                    <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                                    <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                                    <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                                </div>
                                            </div>
                                            <span class="self-triangle"></span>
                
                                        </div> -->
						<!-- 对方 -->
						<div class="mui-chat-cen-others pull-left">
							<img src="../../assets/img/p2404647190.jpg" style="width:.8rem;height:.8rem;float: left; border-radius:50%;" alt="">
							<div class="others-news">
								<p> 顶顶顶顶顶大chaifoiejhiofjoiewoifmklcnxlvknckxnvklcxvxcvcxvcxvxcv大大多多</p>
							</div>
							<span class="others-triangle"></span>
						</div>
					</li>
					<li class="clearfix">
						<div style="text-align:center;">
							<p class="font-px12" style="margin:20px 0 10px 0;">2018-08-16 08:00</p>
						</div>
						<!-- 自己 -->
						<div class="mui-chat-cen-self pull-right mg-bottom-px10">
							<img src="../../assets/img/p2404647190.jpg" style="width:.8rem;height:.8rem; float: right; border-radius:50%;" alt="">
							<div class="self-news">
								<!-- <div>
                                                        <p style="font-size:18px; color:#fff;margin-bottom:10px;">张叁 女 20岁</p>
                                                    </div> -->
								<p>顶顶顶顶顶大大大多多多多多多顶顶顶顶顶顶大大大多多多多多多顶顶顶顶顶顶顶顶顶多多多多多多多多多多多多多多顶顶顶顶顶顶顶顶多多多多多多多多多多多多多多</p>
								<!-- <div class="mui-chat-self-pic">
                                                        <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                                        <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                                        <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                                        <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                                        <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                                    </div> -->
							</div>
							<span class="self-triangle"></span>

						</div>
						<!-- 对方 -->
						<!-- <div class="mui-chat-cen-others pull-left">
                                                <img src="../../img/p2404647190.jpg" style="width:.8rem;height:.8rem;float: left; border-radius:50%;" alt="">
                                                <div class="others-news">
                                                    <p> 顶顶顶顶顶大大大多多</p>
                                                </div>
                                                <span class="others-triangle"></span>
                                            </div> -->
					</li>
					<li class="clearfix">
						<div style="text-align:center;">
							<p class="font-px12" style="margin:20px 0 10px 0;">2018-08-16 08:00</p>
						</div>
						<!-- 自己 -->
						<!-- <div class="mui-chat-cen-self pull-right mg-bottom-px10">
                                                    <img src="../../img/p2404647190.jpg" style="width:.8rem;height:.8rem; float: right; border-radius:50%;" alt="">
                                                    <div class="self-news">
                                                        <div>
                                                            <p style="font-size:18px; color:#fff;margin-bottom:10px;">张叁 女 20岁</p>
                                                        </div>
                                                        <p>顶顶顶顶顶大大大多多多多多多顶顶顶顶顶顶顶顶顶多多多多多多多多多多多多多多</p>
                                                        <div class="mui-chat-self-pic">
                                                            <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                                            <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                                            <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                                            <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                                            <img src="../../img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
                                                        </div>
                                                    </div>
                                                    <span class="self-triangle"></span>
                        
                                                </div> -->
						<!-- 对方 -->
						<div class="mui-chat-cen-others pull-left">
							<img src="../../assets/img/p2404647190.jpg" style="width:.8rem;height:.8rem;float: left; border-radius:50%;" alt="">
							<div class="others-news">
								<p> 顶顶顶顶顶大大大多多</p>
							</div>
							<span class="others-triangle"></span>
						</div>
					</li>
					<li class="clearfix">
						<div style="text-align:center;">
							<p class="font-px12" style="margin:20px 0 10px 0;">2018-08-16 08:00</p>
						</div>
						<!-- 自己 -->
						<div class="mui-chat-cen-self pull-right mg-bottom-px10">
							<img src="../../assets/img/p2404647190.jpg" style="width:.8rem;height:.8rem; float: right; border-radius:50%;" alt="">
							<div class="self-news">
								<div>
									<p style="font-size:18px; color:#fff;margin-bottom:10px;">张叁 女 20岁</p>
								</div>
								<p>顶顶顶顶顶大大大多多多多多多顶顶顶顶顶顶顶顶顶多多多多多多多多多多多多多多</p>
								<div class="mui-chat-self-pic">
									<img src="../../assets/img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
									<img src="../../assets/img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
									<img src="../../assets/img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
									<img src="../../assets/img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
									<img src="../../assets/img/p2404647190.jpg" style="width: 1.3rem;height:1.3rem;" alt="">
								</div>
							</div>
							<span class="self-triangle"></span>

						</div>
						<!-- 对方 -->
						<!-- <div class="mui-chat-cen-others pull-left">
                                                        <img src="../../img/p2404647190.jpg" style="width:.8rem;height:.8rem;float: left; border-radius:50%;" alt="">
                                                        <div class="others-news">
                                                            <p> 顶顶顶顶顶大大大多多</p>
                                                        </div>
                                                        <span class="others-triangle"></span>
                                                    </div> -->
					</li>
				</ul>
			</div>
		</div>
		<div class="footer" style="background-color:#F5F5F7;text-align: left; z-index: 3;">
			<textarea id="textarea" style="width:5.7rem;height:.76rem; font-size: 14px;margin:6px 15px;padding:8px 15px 0;" maxlength="500" @input="descInput($event)" v-model="desc" placeholder="说说你的问题…"></textarea>
			<button class="mui-chat-quiz" style="color:#18BC9A;font-size:16px;line-height:.96rem;">提问</button>
		</div>
	</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				start: 0,
				remnant: 500,
				desc: "",
				isShow: false,
				type: '请选择'
			};
		},
		mounted() {
			mui.init({
				pullRefresh: {
					container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
					down: {
						height: 100, //可选,默认50.触发下拉刷新拖动距离,
						auto: false, //可选,默认false.自动下拉刷新一次
						contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
						contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
						contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
						callback: this.pullfreshDown //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
					}

				}
			});
		},
		created() {
			mui.alert("请先完善个人信息");
		},
		methods: {
			pullfreshDown() {
				//业务逻辑代码，比如通过ajax从服务器获取新数据；
				//注意，加载完新数据后，必须执行如下代码，注意：若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
				// var userLoginId=plus.storage.getItem("userLoginId");
				//ajax请求
				// Ajax({
				// 	interfaceName:"findIRIByRecordId",
				// 	interfaceParameters:"{'viewIndex':'1','search':'"+keyWords+"'}",
				// 	success:function(data){
				// 		app.lists=data.data.dataList;
				mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
				mui('#refreshContainer').pullRefresh().refresh(true); //重置上拉刷新
				// 		index=1;
				// 	}
				// });

			},
			descInput: function(e) {
				var tg = e.currentTarget;
				tg.style.height = '40px';
				tg.style.overflow = 'hidden'
				if(tg.scrollHeight > 81) {
					tg.parentNode.style.height = '81px';
					tg.style.height = '71px';
					tg.style.overflow = 'auto'
				} else {
					tg.style.height = tg.scrollHeight + 'px';
					var height = parseInt(tg.style.height.substring(0, tg.style.height.length - 2)) + 10 + 'px';
					tg.parentNode.style.height = height;
				}
			},
			submit: function() {
				app.desc = "";
			},
			selectTime: function(event) {
				var event = event.currentTarget;
				this.isShow = true;
			},
			inquiMode: function(type) {
				console.log(type);
				if(type == 'text') {
					this.type = '图文';
				} else {
					this.type = '视频';
				}
				this.isShow = false;
			},
			caseSelect: function() {
				mui.openWindow({
					url: '../selectCase.html',
					extras: {
						name: 'mui' //扩展参数
					}
				});
			},
			// showajax: function () {
			//     console.log(local.url)
			//     Ajax({
			//         interfaceName: '/joieosc',
			//         interfaceParameters: '',
			//         success: function () { },
			//         error: function () { }
			//     })
			// }
		}
	};
</script>

<style scoped>
	.mui-table-view .mui-chat-cen-self .self-news {
		background-color: #18BC9A;
		max-width: 5rem;
		padding: 10px;
		margin-right: 8px;
		float: left;
		display: block;
		border-radius: 3px;
		margin-left: 15px;
		word-break: break-all;
		/*英文字母换行*/
		word-wrap: break-word;
		/*英文单词换行*/
		/* white-space:pre-wrap; 中文换行*/
	}
	
	.mui-table-view .mui-chat-cen-self .self-news p {
		color: #fff;
		font-size: 16px;
	}
	
	.mui-table-view .mui-chat-cen-self {
		position: relative;
	}
	
	.self-triangle {
		width: .16rem;
		height: .16rem;
		background-color: #18BC9A;
		display: block;
		position: absolute;
		top: .32rem;
		right: .88rem;
		transform: rotate(315deg);
		border-radius: 0 0 3px 0;
	}
	
	.mui-chat-cen-self .mui-chat-self-pic {
		border-top: 1px solid #8AD7C1;
		margin-top: 6px;
		padding-top: 10px;
	}
	
	.mui-table-view .mui-chat-cen-others .others-news {
		background-color: #fff;
		max-width: 5rem;
		padding: 10px;
		margin-right: 15px;
		float: left;
		display: block;
		border-radius: 3px;
		margin-left: 8px;
		border: 1px solid #ccc;
		word-break: break-all;
		/*英文字母换行*/
		word-wrap: break-word;
		/*英文单词换行*/
		/* white-space:pre-wrap; 中文换行*/
	}
	
	.mui-table-view .mui-chat-cen-others .others-news p {
		color: #333;
		font-size: 16px;
	}
	
	.mui-table-view .mui-chat-cen-others {
		position: relative;
	}
	
	.others-triangle {
		width: .16rem;
		height: .16rem;
		background-color: #fff;
		display: block;
		position: absolute;
		top: .32rem;
		left: .88rem;
		transform: rotate(315deg);
		border-radius: 3px 0 0 0;
		border-left: 1px solid #ccc;
		border-top: 1px solid #ccc;
	}
	
	.mui-chat-quiz {
		border: none;
		background-color: transparent;
	}
	
	button:enabled:active {
		background-color: transparent;
	}
	
	.mui-table-view:after {
		height: 0;
	}
	
	.mui-table-view:before {
		height: 0;
	}
	
	.mui-table-view {
		background-color: transparent;
	}
</style>