<template>
	   <div class="mui-content">
			<!--添加收获地址-->
			<div  class='addressList'>
				<ul v-if='isShow=="Y"' >
					<li v-for='(data,index) in dataList' :key='index'   @click="$router.push({ name: '/delivery/ediHistorytor',query:{name:data.name,phoneNum:data.phoneNum,provName:data.provName,cityName:data.cityName,countyName:data.countyName,provCode:data.provCode,cityCode:data.cityCode,countyCode:data.countyCode,address:data.address,status:data.status,id:data.id}})">
						<div class="addHis">
							<div class="addHisLes">
								<div class="addHistopname font-w">{{data.name}}</div>
								<div class="addHistopphone font-w">{{data.phoneNum}}</div>
								<div class="addHistopmo" v-if='data.status=="Y"'>默认</div>
							</div>
							<div class="addHisRigh">
								<div class="addHisbott">
									{{data.provName}} {{data.cityName}} {{data.countyName}} {{data.address}}
								</div>
								<div class="addHisimg">
									<img src="../../assets/img/edit.png" />
								</div>
							</div>
						</div>
					</li>
				</ul>
				<div  v-else class='default'>
					<img src="../../assets/img/default.png" alt="" class='defaultImg'/>
					<p class='defalutText'>暂无相关数据</p>
				</div>
			</div>
			<div class="footer"  @click="$router.push({ name: '/delivery/addhistoryed'})">
				<button type="button" class="saveBtn mui-btn-success">添加新地址</button>
			</div>
		</div>
</template>

<script>
	export default {
		data() {
			return {
				 dataList:[],
				 isShow:'Y'
			}
		},
		mounted() {
			 this.getDataList()
		},
		methods: {
			 getDataList(){
			 	this.postRequest('/weixin/address/findAddressList').then((data) => {
					if(data.code==0){
						this.dataList=data.dataList
						if(data.dataList.length!=0){
							this.isShow='Y'
						}else{
							this.isShow='N'
						}
					}
				})
			 }
		}
	}
</script>

<style scoped>
	.addHis {
		width: 100%;
				background: #fff;
				padding-top: .2rem;
				border-bottom: .02rem solid #D8D8D8;
			}
		.addressList li:last-child .addHis{
			border-bottom: none;
		}
			.addHisLes {
				display: flex;
				width: 100%;
				height: auto;
				padding-left: .28rem;
			}
			
			.addHisRigh img {
				width: 0.5rem;
				height: 0.5rem;
				margin-top: .1rem;
			}
			
			.addHistopname {
				padding-right: 0.35rem;
				text-align: left;
			}
			
			.addHistopphone {
				width: 28%;
			}
			
			.addHistopmo {
				width: .8rem;
				height: .3rem;
				line-height: .32rem;
				font-size: .2rem;
				color: #FFFFFF;
				background: #18BC9A;
				border-radius: .32rem;
				letter-spacing: 0;
				text-align: center;
				font-weight: 100;
				margin: .03rem .1rem .03rem .3rem;
			}
			.addHisRigh{
				display: flex;
				width: 100%;
			}
			.addHisimg img{
				width: 0.28rem;
				height: 0.26rem;
			}
			.addHisRigh img {
				margin-right: .3rem;
			}
			
			.addHisbott {
				width: 90%;
				font-size: .24rem;
				color: #666666;
				letter-spacing: 0;
				margin: .2rem .28rem;
			}
			.saveBtn {
				width: 100%;
				height: 48px;
				line-height: 48px;
			}
			.font-w{
				font-weight: 600;
			}
			.default{
				overflow: hidden
			}
</style>