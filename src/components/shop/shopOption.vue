<template>
	<div class="mui-content" id="app" v-cloak>
		<!--轮播图-->
		<div class="swipper">
			<div class="mui-slider">
				<div class="mui-slider-group mui-slider-loop">
					<!--支持循环，需要重复图片节点-->
					<div class="mui-slider-item mui-slider-item-duplicate">
						<a href="#"><img src="../../assets/img/sswiper1.png" /></a>
					</div>
					<div class="mui-slider-item">
						<a href="#"><img src="../../assets/img/sswiper2.jpeg" /></a>
					</div>
					<div class="mui-slider-item mui-slider-item-duplicate">
						<a href="#"><img src="../../assets/img/sswiper1.png" /></a>
					</div>
					<div class="mui-slider-item mui-slider-item-duplicate">
						<a href="#"><img src="../../assets/img/sswiper1.png" /></a>
					</div>
					<!--支持循环，需要重复图片节点-->
					<div class="mui-slider-item mui-slider-item-duplicate">
						<a href="#"><img src="../../assets/img/sswiper2.jpeg" /></a>
					</div>
				</div>
			</div>
		</div>
		<!--商品说明-->
		<div class="alipay" v-for="item in arr1">
			<div class="alipayLest">
				<div class="alipayLest1">
					<div class="alipayName">{{item.name}}</div>
					<!--非处方logo-->
					<div class="alipayImg"><img src="../../assets/img/re.png" /></div>
					<!--处方logo-->
					<!--<div class="alipayImg"><img src="../../assets/img/rx.png" /></div>-->
				</div>
				<div class="alipayGui">规格:{{item.guige}}</div>
				<div class="alipayHome">厂家:{{item.yl}}</div>
				<div class="alipayPrice">￥{{item.price}}</div>
			</div>
			<div class="alipayRight">
				<!--详情的时候显示加入购物车-->
				<!-- <div><span style="display: inline-block;color: #fff;font-size: .3rem;">+</span>&nbsp;加入购物车</div> -->
				<!--评论的时候显示加加减减-->
				<div style="border: 1px solid red;background: none;border: none;color: #000;margin-left: .2rem;">
					<img v-show="item.nums>1" style="width: 0.44rem;height: 0.42rem;margin-left: .01rem;" src="../../assets/img/jian.png" @click="minus(item)">
					<span style="margin-left: .2rem;position: relative;left: -.06rem;top: -.11rem;">{{item.nums}}</span>
					<img src="../../assets/img/jia.png" style="width: 0.44rem;height: 0.42rem;margin-left: .1rem;" @click="plus(item)" />
				</div>
				<!--医生咨询-->
				<!--<div style="padding-top: .03rem;" @click="doctorzx()">医生咨询</div>-->
			</div>
		</div>
		<!--优惠-->
		<div class="you" @click="yhAlert()">
			<div class="yh">优惠</div>
			<div class="ma">满18减2</div>
			<div class="yonimg"><img src="../../assets/img/arrow.png" /></div>
		</div>
		<!--相关推荐-->
		<div class="rexommend">
			<div class="rexommendNum">&nbsp;&nbsp;&nbsp;&nbsp;相关推荐</div>
			<div class="rexommendBox">

				<dl class="rexommendImg">
					<dt><img src="../../assets/img/koufu.jpg"/></dt>
					<dd>牛黄消炎哦消炎哦消炎哦</dd>
					<dd>￥45.00</dd>
				</dl>
				<dl class="rexommendImg">
					<dt><img src="../../assets/img/koufu.jpg"/></dt>
					<dd>牛黄消牛黄消炎哦炎哦</dd>
					<dd>￥45.00</dd>
				</dl>
				<dl class="rexommendImg">
					<dt><img src="../../assets/img/koufu.jpg"/></dt>
					<dd>牛黄消炎哦</dd>
					<dd>￥45.00</dd>
				</dl>
				<dl class="rexommendImg">
					<dt><img src="../../assets/img/koufu.jpg"/></dt>
					<dd>牛黄消炎哦</dd>
					<dd>￥45.00</dd>
				</dl>
				<dl class="rexommendImg">
					<dt><img src="../../assets/img/koufu.jpg"/></dt>
					<dd>牛黄消炎哦</dd>
					<dd>￥45.00</dd>
				</dl>
				<dl class="rexommendImg">
					<dt><img src="../../assets/img/koufu.jpg"/></dt>
					<dd>牛黄消炎哦</dd>
					<dd>￥45.00</dd>
				</dl>

			</div>
		</div>
		<!--详情评论-->
		<div class="optionPl">
			<div class="optionOpt" @click="optionPl(0)" :class="{active:!index}">
				详情
			</div>
			<div class="optionPlo" @click="optionPl(1)" :class="{active:index}">
				评论
			</div>
		</div>
		<!--详情列表-->
		<div class="optionOpt_list" v-if="this.index==0">
			<!-- <div><img src="../sswiper1.jpg" /></div> -->
		</div>
		<!--评论列表-->
		<div v-else>
			<div class="optionPlo_list">
				<div class="optionOpt_listbotton">
					<div class="hest"><img src="../../assets/img/di.png" /></div>
					<div class="optionOpt_listNa">小甜甜</div>
					<div class="optionOpt_listtime">2018-09-21</div>
				</div>
				<div class="optionOpt_listtop">
					这个要特别好喝哈哈哈哈哈哈喝哈哈哈哈哈哈喝哈哈哈哈哈喝 哈哈哈喝哈哈哈哈哈哈哈喝哈哈哈哈哈哈哈哈哈哈哈哈，赫勒苟南侧的发财呢。
				</div>
			</div>
			<div class="optionPlo_list">
				<div class="optionOpt_listbotton">
					<div class="hest"><img src="../../assets/img/di.png" /></div>
					<div class="optionOpt_listNa">小甜甜</div>
					<div class="optionOpt_listtime">2018-09-21</div>
				</div>
				<div class="optionOpt_listtop">
					这个要特别好喝哈哈哈哈哈哈 哈哈 哈哈，赫勒苟南侧的发财呢。
				</div>
			</div>
		</div>
		<!--空的div-->
		<div style="width: 100%;height: 1rem;"></div>
		<!--底部-->
		<footer>
			<div class="fotimg" @click="showShade()"><img src="../../assets/img/che.png" /></div>
			<div class="fotnum">{{this.arr.length}}</div>
			<div class="gong">共&nbsp;￥{{total}}</div>
			<div class="select" @click="selectok()">选好了</div>
		</footer>
		<!--遮罩-->
		<div class="shade" v-show="shadeShow &&this.arrLength!==0" @click="clesd()"></div>
		<!--购物车弹框-->
		<div class="alert" v-show="clearList &&this.arrLength!==0">
			<div class="laji">
				<img src="../../assets/img/laji.png" />
				<div class="clear" @click="clesa">清空</div>
			</div>
			<div class="shopList" v-for="(item,index) in arr">
				<p class="shopName">{{item.name}}</p>
				<p class="shopPrice">￥{{item.price}}</p>
				<p class="shopImg"><img src="../../assets/img/jian.png" @click="minus(item,index)" /></p>
				<p class="shopNum">{{item.nums}}</p>
				<p class="shopImg2"><img src="../../assets/img/jia.png" @click="plus(item)" /></p>
			</div>
		</div>
		<!--优惠弹框-->
		<div class="alerts" v-show="youohuiAlert">
			<div class="aleyh"><span>满减</span><span @click="clesd"><img src="../../assets/img/cha.png"/></span></div>
			<ul>
				<li class="aleryho">
					<div>
						<img src="../../assets/img/gb.png" />
					</div>
					<div>
						<span>优惠1</span>
					</div>
				</li>
				<li class="aleryho">
					<div>
						<img src="../../assets/img/gb.png" />
					</div>
					<div>
						<span>优惠1</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				shadeShow: false,
				clearList: false,
				arr: [{
						'name': '哈哈1哈哈1哈哈1哈哈1哈哈1哈哈1',
						'guige': '规格11规格1规格11格11格111规格1111111',
						'yl': '用量规格111规格111111规格11111规格111111111',
						'price': '118',
						'nums': 1
					},
					{
						'name': '哈哈1哈哈1哈哈1哈哈1哈哈1哈哈1',
						'guige': '规格11规格1规格11格11格111规格1111111',
						'yl': '用量规格111规格111111规格11111规格111111111',
						'price': '118',
						'nums': 1
					},
					{
						'name': '哈哈1哈哈1哈哈1哈哈1哈哈1哈哈1',
						'guige': '规格11规格1规格11格11格111规格1111111',
						'yl': '用量规格111规格111111规格11111规格111111111',
						'price': '118',
						'nums': 1
					},
					{
						'name': '哈哈1哈哈1哈哈1哈哈1哈哈1哈哈1',
						'guige': '规格11规格1规格11格11格111规格1111111',
						'yl': '用量规格111规格111111规格11111规格111111111',
						'price': '118',
						'nums': 1
					},
					{
						'name': '哈哈1哈哈1哈哈1哈哈1哈哈1哈哈1',
						'guige': '规格11规格1规格11格11格111规格1111111',
						'yl': '用量规格111规格111111规格11111规格111111111',
						'price': '118',
						'nums': 1
					},
					{
						'name': '哈哈1哈哈1哈哈1哈哈1哈哈1哈哈1',
						'guige': '规格11规格1规格11格11格111规格1111111',
						'yl': '用量规格111规格111111规格11111规格111111111',
						'price': '118',
						'nums': 1
					}
				],
				arr1: [],
				total: 0, //总价
				youohuiAlert: false,
				arrLength: '',
			}
		},
		mounted() {
			var gallery = mui('.mui-slider');
			gallery.slider({
				interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
			});
			 
		},
		created: function() {
			//计算总价
			this.count();
			this.arr1.push(this.arr[0]);
		},
		methods: {
			optionPl: function(value) {
				this.index = value;
			},
			//加
			plus: function(item) {
				item.nums = parseInt(item.nums) + 1;
				this.count();
			},
			//减
			minus: function(item, index) {
				if(item.nums > 1) {
					item.nums--;
				} else if(item.nums == 1) {
					this.arr.splice(index, 1);
					this.arrLength = this.arr.length;
				}
				this.count();
			},
			//清空
			clesa: function() {
				this.shadeShow = false;
				this.clearList = false;
				this.youohuiAlert = false;
				this.arr = [];
				this.total = this.total;
			},
			//弹框显示隐藏
			showShade() {
				this.shadeShow = true;
				this.clearList = true;
			},
			//选好了
			selectok: function() {

			},
			//关闭弹框
			clesd() {
				this.shadeShow = false;
				this.clearList = false;
				this.youohuiAlert = false;
			},
			//计算总价
			count: function() {
				var totalPrice = 0; //临时总价
				this.arr.forEach(function(val, index) {
					totalPrice += val.nums * val.price; //累计总价
				});
				this.total = parseFloat(totalPrice);
			},
			//优惠弹框
			yhAlert() {
				this.youohuiAlert = true;
				this.shadeShow = true;
			},
			//医生咨询
			doctorzx() {
				this.$router.push('/user/setting');
			}

		}
	}
</script>

<style scoped>
	.swipper {
		width: 100%;
		height: 200px;
		z-index: 0;
	}
	
	.swipper img {
		width: 100%;
		height: 200px;
	}
	
	.alipay {
		width: 100%;
		display: flex;
		background: #fff;
		padding: .2rem .3rem;
	}
	
	.alipayLest {
		width: 70%;
		height: auto;
	}
	
	.alipayLest1 {
		display: flex;
		width: 100%;
	}
	
	.alipayName {
		padding-top: .1rem;
		font-size: 0.32rem;
		color: #333333;
		letter-spacing: 0;
		width: 110px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.alipayImg img {
		width: 0.62rem;
		height: 0.32rem;
		margin: 0 .2rem;
		margin-top: .13rem;
	}
	
	.alipayGui,
	.alipayHome {
		font-size: 0.24rem;
		height: .4rem;
		line-height: .4rem;
		color: #666666;
		letter-spacing: 0;
		text-align: left;
		width: 260px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.alipayPrice {
		font-size: 16px;
		color: #FA5D40;
		letter-spacing: 0;
		padding-top: .1rem;
		text-align: left;
	}
	
	.alipayRight {
		width: 30%;
		height: auto;
		font-size: 0.24rem;
		color: #FFFFFF;
		letter-spacing: 0;
		padding-top: 22%;
		padding-left: 3%;
	}
	
	.alipayRight div {
		width: 1.94rem;
		height: 0.56rem;
		text-align: center;
		line-height: 0.55rem;
		background: #18BC9A;
		border-radius: 0.3rem;
	}
	
	.you {
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		background: #fff;
		margin-top: .2rem;
		display: flex;
		line-height: 1rem;
		padding-left: .3rem;
	}
	
	.yh {
		width: 10%;
		font-size: 0.24rem;
		color: #999999;
		letter-spacing: 0;
	}
	
	.ma {
		width: 80%;
		font-size: 0.24rem;
		color: #333333;
		letter-spacing: 0;
		text-align: left;
	}
	
	.yonimg {
		width: 10%;
		text-align: center;
	}
	
	.yonimg img {
		width: 0.16rem;
		height: 0.28rem;
	}
	
	.rexommend {
		width: 100%;
		height: auto;
		background: #fff;
		margin-top: .2rem;
		padding: .15rem 0rem;
		overflow: hidden;
	}
	
	.rexommendImg {
		width: 2rem;
		height: auto;
	}
	
	.rexommendImg dd {
		width: 80px;
		margin-left: .4rem;
		overflow: hidden;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.rexommendBox {
		width: 100%;
		display: flex;
		overflow-x: scroll;
	}
	/*隐藏滚动条*/
	
	.rexommendBox::-webkit-scrollbar {
		display: none;
	}
	
	.rexommendNum {
		font-size: 0.26rem;
		color: #333333;
	}
	
	.rexommendImg img {
		width: 2rem;
		height: 2rem;
	}
	
	.rexommendImg dd:nth-of-type(1) {
		font-size: 0.02rem;
		color: #333333;
		text-align: center;
		letter-spacing: 0;
	}
	
	.rexommendImg dd:nth-of-type(2) {
		font-size: 0.28rem;
		color: #FA5D40;
		text-align: center;
		letter-spacing: 0;
	}
	
	.optionPl {
		width: 100%;
		height: 0.84rem;
		line-height: 0.84rem;
		display: flex;
		margin-top: .2rem;
		background: #F0F0F0;
	}
	
	.optionOpt {
		width: 50%;
		height: 100%;
		font-size: 0.28rem;
		color: #999999;
		letter-spacing: 0;
		border-bottom: 1px solid #C0C0C0;
		text-align: center;
		border-right: none;
	}
	
	.optionPlo {
		width: 50%;
		height: 100%;
		font-size: 0.28rem;
		color: #999999;
		letter-spacing: 0;
		border-left: 1px solid #C0C0C0;
		border-bottom: 1px solid #C0C0C0;
		text-align: center;
	}
	
	.optionOpt_list {
		width: 100%;
		height: auto;
		color: #999999;
		background: #fff;
		font-size: 0.28;
		letter-spacing: 0;
	}
	
	.optionOpt_list div {
		width: 100%;
		height: auto;
	}
	
	.active {
		background: #fff;
		border-top: 0.02rem solid #18BC9A;
		border-bottom: none;
		color: #18BC9A;
	}
	
	.optionPlo_list {
		width: 100%;
		background: #fff;
		border-bottom: 0.02rem solid #E6E6E6;
		padding-top: .2rem;
	}
	
	.hest img {
		width: 0.56rem;
		height: 0.56rem;
		border-radius: 0.28rem;
		margin-left: .2rem;
	}
	
	.optionOpt_listbotton {
		width: 100%;
		height: auto;
		display: flex;
	}
	
	.optionOpt_listNa {
		font-size: 0.32rem;
		color: #333333;
		letter-spacing: 0;
		padding: .1rem .2rem;
		width: 69%;
		text-align: left;
	}
	
	.optionOpt_listtime {
		width: 21%;
		font-size: 0.24rem;
		color: #CCCCCC;
		letter-spacing: 0.28px;
	}
	
	.optionOpt_listtop {
		font-size: 0.28rem;
		color: #333333;
		letter-spacing: 0;
		padding: .1rem .2rem;
		opacity: .8;
		text-align: left;
	}
	
	footer {
		width: 100%;
		height: 1rem;
		display: flex;
		background: #495250;
		position: fixed;
		bottom: 0;
		z-index: 3;
	}
	
	.fotimg {
		width: 26%;
		height: 100%;
	}
	
	.fotimg img {
		width: 1rem;
		height: 1rem;
		margin-left: .4rem;
		position: relative;
		top: -0.2rem;
	}
	
	.fotnum {
		width: 0.29rem;
		height: 0.28rem;
		text-align: center;
		line-height: 0.28rem;
		border-radius: 0.15rem;
		background: #FA5D40;
		color: #fff;
		position: relative;
		left: -0.5rem;
		top: -0.2rem;
	}
	
	.gong {
		font-size: 0.36;
		height: 1rem;
		line-height: 1rem;
		width: 40%;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: left;
	}
	
	.select {
		background: #18BC9A;
		width: 30.5%;
		text-align: center;
		height: 1rem;
		line-height: 1rem;
		color: #fff;
	}
	
	.shade {
		width: 100%;
		height: 100%;
		background: rgba(1, 1, 1, 0.2);
		position: fixed;
		top: 0;
		z-index: 1;
	}
	
	.alert {
		width: 100%;
		height: 5.5rem;
		background: #fff;
		position: fixed;
		bottom: 1rem;
		left: 0;
		right: 0;
		z-index: 2;
		overflow: hidden;
		overflow-y: scroll;
	}
	
	.laji {
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		background: #eeeeee;
		padding-right: 0.3rem;
		font-size: 0.24rem;
		color: #666666;
		display: flex;
		letter-spacing: 0.0056rem;
		padding-left: 6.2rem;
		position: sticky;
		top: 0;
	}
	
	.laji img {
		width: 0.28rem;
		height: 0.3rem;
		margin: 0.24rem 0;
	}
	
	.clear {
		margin-left: 0.1rem;
	}
	
	.shopList {
		width: 100%;
		display: flex;
		height: 1rem;
		line-height: 1rem;
		border-bottom: 0.02rem solid #e6e6e6;
	}
	
	.shopImg {
		margin: 0.12rem 0.3rem;
	}
	
	.shopImg2 {
		margin: 0.12rem 0.3rem;
	}
	
	.shopName {
		width: 40%;
		font-size: 0.32rem;
		color: #333333;
		letter-spacing: 0.0056rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		padding-left: 0.2rem;
	}
	
	.shopImg img {
		width: 0.42rem;
		height: 0.42rem;
	}
	
	.shopImg2 img {
		width: 0.42rem;
		height: 0.42rem;
	}
	
	.shopPrice {
		width: 30%;
		font-size: 0.32rem;
		color: #fa5d40;
		letter-spacing: 0;
		text-align: right;
	}
	
	.alerts {
		width: 100%;
		height: 330px!important;
		background: #fff;
		position: fixed;
		bottom: 1rem;
		z-index: 2;
		left: 0;
		right: 0;
		overflow: hidden;
		overflow-y: scroll;
		padding: .1rem;
	}
	
	.alerts ul li {
		height: .8rem;
		line-height: .8rem;
	}
	
	.aleyh {
		padding-top: 10px;
		overflow: hidden;
		overflow-y: scroll;
		display: flex;
	}
	
	.aleyh img {
		width: .3rem;
		height: .3rem;
	}
	
	.aleyh span:nth-of-type(1) {
		width: 93%;
		padding-left: 5%;
	}
	
	.aleryho {
		text-align: left;
		padding-left: 20px;
		display: flex;
	}
	
	.aleryho div img {
		width: .38rem;
		height: .38rem;
		margin-top: .2rem;
	}
	
	.aleryho div span {
		margin: 0 .2rem;
	}
</style>