<template>
	<div class="mui-content">
		<div class="history">
			<ul class="hi_1">
				<li><img src="../../assets/img/history.png" /></li>
			</ul>
			<ul class="hi_2">
				<li>章叁&nbsp;&nbsp;16248751586</li>
				<li>北京北京市朝阳区平房镇定福家园南里三号院一号楼(物业)</li>
			</ul>
		</div>
		<div class="express">
			<ul class="ex_1">
				<li><img src="../../assets/img/di.png" /></li>
			</ul>
			<ul class="ex_2">
				<li style="font-size:.3rem;color: #000000;">申通快递</li>
				<li>运单号:1458758241522</li>
			</ul>
		</div>
		<div class="expresslist">
			<ul v-for="(item,index) in inforArr" :key='index'>
				<li>
					<p id="asideBo" ref="test" v-if="item.kong!=2"></p>
					<p v-if="item.type==1" class="asidImg"><img src="../../assets/img/yan.png" /></p>
					<p v-else style="width: .2rem;height: .2rem;background: gainsboro;border-radius:.1rem;position: absolute;left: 8.2%;top: 20%;"></p>
					<p>{{item.inforName}}</p>
					<p style="padding-top:.4rem ;">{{item.date}}&nbsp;&nbsp;{{item.time}}</p>
					<hr style="margin-top: 3.5%;" v-if="item.kong!=2"/>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				inforArr: [],
			};
		},
		created() {
			//获取物流信息
			this.getInformation();
			this.inforAse();
		},
		mounted() {},
		methods: {
			//获取物流信息
			getInformation() {
				this.getRequest('/weixin/infor/information').then((data) => {
					this.inforArr = data.list;
					this.inforAse();
				})
			},
			inforAse() {
				for(var i = 0; i < this.inforArr.length; i++) {
					//向数组推入type值,如果type值为1的话显示蓝色圆点，否则的话显示灰色蓝点.
					this.$set(this.inforArr[i], 'type', 0);
					this.$set(this.inforArr[0], 'type', 1);
					//判断是否是最后一个数组
					if(i == this.inforArr.length - 1) {
						//console.log(this.inforArr[i]);
						this.$set(this.inforArr[i], 'kong', 2);
					}
				}
			}
		}
	};
</script>

<style scoped>
	#asideBo {
		height: 1.7rem;
		border-left: 1px solid gainsboro;
		position: absolute;
		margin-left: -.8rem;
		top: .5rem;
	}
	
	.history {
		width: 100%;
		height: 1.76rem;
		display: flex;
		font-size: 0.26rem;
		background: #fff;
	}
	
	.hi_1 {
		width: 15%;
		height: 100%;
		text-align: center;
	}
	
	.hi_2 {
		width: 85%;
		height: 100%;
		line-height: 100%;
		padding-top: 0.24rem;
		padding-right: 0.1rem;
	}
	
	.hi_2 li {
		width: 100%;
		line-height: 0.44rem;
		font-size: 0.26rem;
		color: #333333;
		letter-spacing: 0.03rem;
	}
	
	.history ul li img {
		width: 0.38rem;
		height: 0.438rem;
		margin: 0.7rem 0;
	}
	
	.express {
		width: 100%;
		height: 1.7rem;
		display: flex;
		background: #fff;
		margin-top: 0.2rem;
		border-bottom: 0.02rem solid #e7e7e7;
	}
	
	.ex_1 {
		width: 20%;
		height: 100%;
		text-align: center;
	}
	
	.express ul img {
		width: 0.92rem;
		height: 0.92rem;
		margin-top: 0.36rem;
	}
	
	.ex_2 {
		width: 80%;
		padding-top: 0.4rem;
	}
	
	.ex_2 li {
		font-size: 0.24rem;
		color: #666666;
		letter-spacing: 0.03rem;
		height: 0.5rem;
	}
	
	.expresslist {
		width: 100%;
		height: auto;
		background: #fff;
		position: relative;
	}
	
	.expresslist ul {
		height: 1.8rem;
		padding-top: .3rem;
		position: relative;
	}
	
	.expresslist ul li {
		padding-left: 1.5rem;
	}
	
	.expresslistone {
		width: 75%;
		position: relative;
		line-height: 0.5rem;
		border-left: 0.04rem solid #e6e6e6;
		margin-left: 10%;
		line-height: 0.6rem;
		padding-top: 0.14rem;
	}
	
	.asidImg img {
		width: 0.35rem;
		height: 0.35rem;
		position: absolute;
		left: 7%;
	}
</style>