<template>
	<div class="mui-content">
		<!--选择配送方式-->
		<div class="selects">
			选择配送方式
		</div>
		<!--商家配送-->
		<div class="sjSelect" v-for="(item,index) in getthinfMethods" :key="item.index">
			<div class="sjSelecton">{{item.name}}</div>
			<div class="sjSelectimg" @click="select(item)">
				<img v-if="!item.selected" src="../../assets/img/choose_before.png" />
				<img v-if="item.selected" src="../../assets/img/choose_after.png" />
			</div>
		</div>
		<!--添加收货地址-->
		<div class="addHistory" @click="$router.push({ name: '/delivery/addhistoryed'})">
			<div class="addhis" >添加收货地址</div>
			<span class="addhispan">{{this.addrss}}</span>
			<div class="addhisimg"><img src="../../assets/img/arrow.png" /></div>
		</div>
		<!--选择自提药店-->
		<div v-show="this.selecId ==2">
			<div class="addHistory">
				<div class="addhis">选择自提药店</div>
				<span class="addhispan"></span>
				<div class="addhisimg"><img src="../../assets/img/arrow.png" /></div>
			</div>
			<div class="seName"><input style="font-size: .34rem;border-top: none;border-left: none;border-right: none;height: .9rem;margin: 0;padding: 0;padding-left: .33rem;border-bottom: .02rem solid #E8E8E8;" type="text" name="name" id="name" placeholder="姓名" /></div>
			<div class="seName"><input style="border-top: none;border-left: none;border-right: none;height: .9rem;margin: 0;padding: 0;padding-left: .33rem;border-bottom: .02rem solid #E8E8E8;" type="number" name="number" id="number" placeholder="手机号" /></div>
		</div>
		<!--选择支付方式-->
		<div class="seleZhi">
			选择支付方式
		</div>
		<!--在线支付-->
		<div class="sjSelect" v-for="(item,index) in onboedortis" :key='item.index'>
			<div class="sjSelecton">{{item.name}}</div>
			<div class="sjSelectimg" @click="sel(item)">
				<img v-if="!item.select" src="../../assets/img/choose_before.png" />
				<img v-if="item.select" src="../../assets/img/choose_after.png" />
			</div>
		</div>
		<!--订单明细-->
		<div class="ddMx">
			订单明细
		</div>
		<!--订单明细列表-->
		<div class="ddMxlist" v-for="item in arr" @click="$router.push({name:'/shop/shopOption'})">
			<div class="ddMxLeft">
				<img src="../../assets/img/koufu.jpg" />
			</div>
			<div class="ddMxCenter">
				<div class="ddMxCentername">{{item.name}}</div>
				<div class="ddMxCentergg">规格:&nbsp;&nbsp;{{item.guige}}</div>
				<div class="ddMxCentercj">厂家:&nbsp;&nbsp;{{item.chanjia}}</div>
			</div>
			<div class="ddMxRight">
				<div class="ddMxCenterprice">￥{{item.price}}</div>
				<div class="ddMxCenterpricetwo">X1</div>
			</div>
		</div>
		<!--商家总价-->
		<div class="homeZo">
			<div class="homeprice">&nbsp;商家总价</div>
			<div class="homeprs">￥18.00</div>
		</div>
		<!--运费-->
		<div class="homeZo">
			<div class="homeprice">&nbsp;运费</div>
			<div class="homeprs" v-if="this.selecId==2">￥10.00</div>
			<div class="homeprs" v-else>￥0.00</div>
		</div>
		<!--优惠-->
		<div class="homeZo">
			<div class="homeprice">&nbsp;优惠</div>
			<div class="homeprs">￥2.00</div>
		</div>
		<!--实付-->
		<div class="homeZo">
			<div class="homeprice" style="font-size: .28rem;">&nbsp;实付</div>
			<div class="homeprs" style="color: #FA5D40;">￥900</div>
		</div>
		<!--空的div-->
		<div style="height: 1.3rem;"></div>
		<!--底部-->
		<footer>
			<div class="gong">共￥688</div>
			<div class="select" @click="meage()">确认下单</div>
		</footer>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				/*商家配送，到店自提*/
				getthinfMethods: [{
						'name': '商家配送',
						'id': '1',
						'selected': true
					},
					{
						'name': '到店自提',
						'id': '2',
						'selected': false
					}
				],
				/*在线支付，货到支付*/
				onboedortis: [{
						'name': '在线支付',
						'id': '1',
						'select': true
					},
					{
						'name': '货到支付',
						'id': '2',
						'select': false
					}
				],
				selecId: '',
				arr:[
				{
					'name':'双黄连口服连口服连口服连口服液',
					'price':'12',
					'guige':'10ml*10支',
					'chanjia':'哈药集团哈药集团哈药集团哈药集团',
				},
				{
					'name':'双黄连连口服连口服连口服口服液',
					'price':'12',
					'guige':'10ml*10支',
					'chanjia':'哈药集团',
				}],
				addrss:'北京北京北京北京北京'
			}
		},
		mounted() {

		},
		//商家配送，到店自提
		methods: {
			select: function(item) {
				for(let index = 0; index < this.getthinfMethods.length; index++) {
					this.getthinfMethods[index].selected = false;
					this.selecId = item.id;
				}
				item.selected = true;

			},
			//在线支付，货到支付
			sel: function(item) {
				for(var index = 0; index < this.onboedortis.length; index++) {
					this.onboedortis[index].select = false;
				}
				item.select = true;
			},
			//确认下单
			meage(){
				if (this.addrss=='') {
					mui.alert('请设置收货地址')
				} else{
					this.$router.push('/order/myOrder')
				}
				
			}
		}
	}
</script>

<style scoped>
	.selects {
		width: 100%;
		height: .8rem;
		line-height: .8rem;
		font-size: 0.28rem;
		color: #666666;
		letter-spacing: 0;
		background: #EBEBEB;
		padding-left: .3rem;
		text-align: left;
	}
	
	.sjSelect {
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		background: #fff;
		font-size: 0.34rem;
		color: #333333;
		display: flex;
		letter-spacing: 0;
		padding-left: .3rem;
		border-bottom: .02rem solid #E6E6E6;
		text-align: left;
	}
	
	.sjSelecton {
		width: 90%;
		text-align: left;
	}
	
	.sjSelectimg {
		width: 10%;
		line-height: 1rem;
	}
	
	.sjSelectimg img {
		width: .4rem;
		height: .4rem;
		margin-top: .3rem;
	}
	
	.addHistory {
		width: 100%;
		line-height: 1rem;
		background: #fff;
		font-size: 0.34rem;
		color: #333333;
		display: flex;
		letter-spacing: 0;
		padding-left: .3rem;
		border-bottom: .02rem solid #E6E6E6;
		text-align: left;
	}
	
	.addhis {
		width: 50%;
		text-align: left;
	}
	.addhispan{
		width: 38%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: right;
	}
	.addhisimg {
		width: 10%;
		text-align: center;
	}
	
	.addhisimg img {
		width: .16rem;
		height: .28rem;
	}
	
	.seleZhi {
		width: 100%;
		height: .8rem;
		line-height: .8rem;
		font-size: 0.28rem;
		color: #666666;
		letter-spacing: 0;
		background: #EBEBEB;
		padding-left: .3rem;
		text-align: left;
	}
	
	.ddMx {
		width: 100%;
		height: .8rem;
		line-height: .8rem;
		font-size: 0.28rem;
		color: #666666;
		letter-spacing: 0;
		background: #EBEBEB;
		background: #fff;
		padding-left: .3rem;
		margin-top: .2rem;
		text-align: left;
	}
	
	.ddMxlist {
		width: 100%;
		height: 2.06rem;
		background: none;
		display: flex;
		text-align: left;
	}
	
	.ddMxLeft img {
		width: 1.66rem;
		height: 1.66rem;
	}
	
	.ddMxLeft {
		width: 30%;
		height: 100%;
		text-align: center;
		padding-top: .17rem;
	}
	
	.ddMxCenter {
		width: 40%;
		height: 100%;
	}
	
	.ddMxRight {
		width: 30%;
		height: 100%;
		text-align: right;
		padding-top: .1rem;
		padding-right: .2rem;
	}
	
	.ddMxCentername {
		width: 200px;
		font-size: .32rem;
		color: #333333;
		letter-spacing: 0;
		padding: .1rem .1rem;
		margin-top: .1rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		
	}
	
	.ddMxCentergg {
		width: 230px;
		font-size: .24rem;
		color: #666666;
		letter-spacing: 0;
		padding-left: .1rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.ddMxCentercj {
		width: 230px;
		font-size: .24rem;
		color: #666666;
		letter-spacing: 0;
		padding-left: .1rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.ddMxCenterprice {
		width: 100%;
		font-size: .3rem;
		color: #333333;
		letter-spacing: 0.0064px;
	}
	
	.ddMxCenterpricetwo {
		font-size: .24rem;
		color: #999999;
		letter-spacing: 0;
		padding-left: .9rem;
	}
	
	.homeZo {
		width: 100%;
		background: #fff;
		display: flex;
		font-size: .24rem;
		color: #666666;
		letter-spacing: 0.26px;
		padding-left: .3rem;
		padding-top: .1rem;
		padding-bottom: .1rem;
		text-align: left;
	}
	
	.homeprice {
		width: 85%;
	}
	
	.homeprs {
		width: 15%;
		text-align: right;
		padding-right: .3rem;
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
	
	
	.gong {
		font-size: 0.36;
		height: 1rem;
		line-height: 1rem;
		width: 60%;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: left;
		padding-left: .4rem;
	}
	
	.select {
		background: #18BC9A;
		width: 40%;
		text-align: center;
		height: 1rem;
		line-height: 1rem;
		color: #fff;
	}
</style>