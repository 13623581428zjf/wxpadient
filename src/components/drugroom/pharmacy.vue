<template>
	<div class="mui-content">
		<div class="search">
			<input type="" name="" id="" value="" placeholder="请输入商品名称" />
			<img src="../../assets/img/searchImg.png" alt="" class='searchImg' />
			<span class='pull-right searchText' @click="se()">搜索</span>
		</div><br /><br /><br />
		<div>
			<div class="medicinelist" v-for="(item,index) in pharmacy">
				<div class="medicinelistF"><img src="../../assets/img/koufu.jpg" /></div>
				<div class="medicinelistT">
					<p class="medicinelistT_1">{{item.name}}</p>
					<p class="medicinelistT_2">规格:{{item.guige}}</p>
					<p class="medicinelistT_3">用量:{{item.contant}}</p>
					<p class="medicinelistT_4">
						<span class="price">￥{{item.price}}</span>
						<span class="but" @click="addShop(item)">加入购物车</span>
					</p>
				</div>
			</div>
			<!--遮罩-->
			<div class="shade" v-show="shadeShow &&this.shopArrLength!==0" @click="clesd()"></div>
			<!--弹框-->
			<div class="alert" v-show="clearList &&this.shopArrLength!==0">
				<div class="laji">
					<img src="../../assets/img/laji.png" />
					<div class="clear" @click="clesa">清空</div>
				</div>
				<div class="shopList" v-for="(item,index) in shopArr">
					<p class="shopName">{{item.name}}</p>
					<p class="shopPrice">￥{{item.price}}</p>
					<p class="shopImg"><img src="../../assets/img/jian.png" @click="minus(item,index)" /></p>
					<p class="shopNum">{{item.nums}}</p>
					<p class="shopImg2"><img src="../../assets/img/jia.png" @click="plus(item)" /></p>
				</div>
			</div>
			<!--空的div用来控制高度不够-->
			<div style="height: 1.1rem;"></div>
			<!--底部-->
			<footer>
				<div class="fotimg" @click="showShade()"><img src="../../assets/img/che.png" /></div>
				<div class="fotnum" v-if="this.shopArr.length!=0">{{shopArr.length}}</div>
				<div class="fotnums" v-else></div>
				<div class="gong">共&nbsp;￥{{total}}</div>
				<div class="select" @click="selectok()">选好了</div>
			</footer>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				shadeShow: false,
				clearList: false,
				shopArr: [],
				pharmacy: [],
				total: 0, //总价
				shopArrLength: '',
				pageIndex: 1,
				pageSize: 10,
				status: '',
			};
		},
		mounted() {
			//获取云药房商品
			this.pharmcy();
			//获取购物车商品
			this.getShoppharmacy();
			//计算总价
			this.count();
		},
		created() {},
		methods: {
			//获取云药房商品
			pharmcy() {
				this.getRequest('/weixin/docter/drugroom').then((data) => {
					this.pharmacy = data.list;
				})
			},
			//获取购物车商品
			getShoppharmacy() {
				this.getRequest('/weixin/docter/drugroom').then((data) => {
					this.shopArr = data.list;
					this.count();
				})
			},
			//购物车弹框
			showShade() {
				this.shadeShow = true;
				this.clearList = true;
			},
			//加入购物车
			addShop(item) {
				for (var i = 0; i < this.shopArr.length; i++) {
					console.log(this.shopArr[i].id);
					if (this.shopArr[i].id==item.id) {
						mui.toast('该商品已存在');
						return;
					} else{
						this.shopArr.push(item)
					}
				}
				
			},
			//选好了
			selectok: function() {
				this.shadeShow = false;
				this.clearList = false;
				this.$router.push({
					name: '/order/firmOorder'
				})
			},
			//商品数量加
			plus: function(item) {
				item.nums = parseInt(item.nums) + 1;
				this.count();
			},
			//商品减
			minus: function(item, index) {
				if(item.nums > 1) {
					item.nums--;
				} else if(item.nums == 1) {
					this.shopArr.splice(index, 1);
					this.shopArrLength = this.shopArr.length;
				}
				this.count();
			},
			//清空
			clesa: function() {
				this.shadeShow = false;
				this.clearList = false;
				this.youohuiAlert = false;
				this.shopArr = [];
				this.total = 0;

			},
			//搜索
			se() {
				this.getShoppharmacy()
			},
			//关闭弹框
			clesd() {
				this.shadeShow = false;
				this.clearList = false;
			},
			//计算总价
			count: function() {
				var totalPrice = 0; //临时总价
				this.shopArr.forEach(function(val, index) {
					totalPrice += val.nums * val.price; //累计总价
				});
				this.total = parseFloat(totalPrice);
			}
		}
	};
</script>

<style scoped>
	.medicinelist {
		width: 100%;
		height: 2.2rem;
		background: white;
		display: flex;
		padding: 4% 4%;
		border-bottom: 0.02rem solid #e6e6e6;
	}
	
	.medicinelistF {
		height: 1.66rem;
		width: 2.4rem;
		background: #f7f7f7;
		padding: 4.5% 3.8%;
	}
	
	.medicinelistF img {
		width: 1.84rem;
		height: 1.08rem;
	}
	
	.medicinelistT {
		width: 100%;
		margin-left: 0.3rem;
	}
	
	.medicinelistT_1 {
		font-size: 16px;
		width: 100%;
		height: 0.4rem;
		color: #333333;
		letter-spacing: 0.02rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 180px;
	}
	
	.medicinelistT_2 {
		font-size: 0.24rem;
		color: #666666;
		width: 100%;
		height: 0.4rem;
		letter-spacing: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 180px;
	}
	
	.medicinelistT_3 {
		font-size: 0.24rem;
		width: 100%;
		color: #666666;
		height: 0.4rem;
		letter-spacing: 0;
		white-space: nowrap;
		overflow: hidden;
		width: 180px;
		text-overflow: ellipsis;
	}
	
	.medicinelistT_4 {
		width: 100%;
		display: flex;
	}
	
	.price {
		font-size: 0.32rem;
		color: #fa5d40;
		width: 70%;
		letter-spacing: 0;
		display: inline-block;
	}
	
	.but {
		width: 33%;
		font-size: 0.22rem;
		color: #fff;
		text-align: center;
		height: .42rem;
		line-height: .42rem;
		border-radius: .2rem;
		display: inline-block;
		background: #18bc9a;
	}
	
	footer {
		width: 100%;
		height: 1rem;
		display: flex;
		background: #495250;
		position: fixed;
		bottom: 0;
		z-index: 1;
	}
	
	.fotimg {
		width: 26%;
		height: 100%;
	}
	
	.fotimg img {
		width: 1rem;
		height: 1rem;
		margin-left: 0.4rem;
		position: relative;
		top: -0.2rem;
	}
	
	.fotnum {
		text-align: center;
		border-radius: 0.19rem;
		background: #fa5d40;
		color: #fff;
		position: relative;
		left: -0.7rem;
		top: -0.2rem;
		padding: 0 .1rem;
		line-height: .42rem;
		height: .4rem;
	}
	
	.fotnums {
		background: none;
		padding: 0 .1rem;
		line-height: .42rem;
		height: .4rem;
	}
	
	.gong {
		font-size: 0.36;
		height: 1rem;
		line-height: 1rem;
		width: 40%;
		color: #ffffff;
		letter-spacing: 0;
		text-align: left;
	}
	
	.select {
		background: #18bc9a;
		width: 31.5%;
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
	}
	
	.alert {
		width: 100%;
		height: 5.5rem;
		background: #fff;
		position: fixed;
		bottom: 1rem;
		left: 0;
		right: 0;
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
	
	.search {
		width: 100%;
		padding: 14px 15px;
		height: 1.24rem;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		display: flex;
		background: #F7F7F7;
		z-index: 1000;
	}
	
	.search input {
		width: 5.5rem;
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
		border: 1px solid gainsboro;
	}
	
	.search img {
		width: 0.34rem;
		height: 0.36rem;
		display: block;
		position: relative;
		top: 0.16rem;
		left: -5.2rem;
		z-index: 99;
	}
	
	.search span {
		color: #18BC9A;
		font-size: 0.3rem;
		position: absolute;
		right: 0.58rem;
		top: 0.42rem;
	}
</style>