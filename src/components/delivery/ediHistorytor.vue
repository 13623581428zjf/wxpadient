<template>
	<div class="mui-content">
		<ul class='editList'>
			<li>
				<input type="text" placeholder="收货人" v-model='name'/>
			</li>
			<li>
				<input type="text" placeholder="手机号" v-model='phoneNum'/>
			</li>
			<li @click='getData()'>
				所在区域
				<div class="area_im pull-right" >
					{{provName}}{{cityName}}{{countyName}}
					<img src="../../assets/img/arrow.png" />
				</div>
			</li>
			<li>
				<input type="text" placeholder="详细地址" v-model='address'/>
			</li>
		</ul>
		<div class='bg-fff clearfix' style="margin-top: 0.4rem;padding: 0.26rem 0;">
			<div class="area_nsmr1 pull-left">&nbsp;&nbsp;&nbsp;设为默认地址</div>
			<div class="mui-switch mui-switch-mini pull-right" :class="{'mui-active':active}" @click='chooseStatus()'>
				<div class="mui-switch-handle"></div>
			</div>
		</div>
		<!--底部-->
			<footer>
				<div @click="deletes()">删除</div>
				<div @click="saveBtn()">保存</div>
			</footer>
	</div>
</template>

<script>
	import '../../assets/js/mui.picker.min.js'
	import { cityData } from '../../assets/js/city.data-3.js'
	export default {
		data() {
			return {
				active: false,
				text1:'',
				text2:'',
				text3:'',
				name:'',
				phoneNum:'',
				provCode:'',
				cityCode:'',
				countyCode:'',
				provName:'',
				cityName:'',
				countyName:'',
				address:'',
				status:'N',
				id:''
			}
		},
		mounted() {
			this.name=this.$route.query.name;
			this.phoneNum=this.$route.query.phoneNum;
			this.provName=this.$route.query.provName;
			this.cityName=this.$route.query.cityName;
			this.countyName=this.$route.query.countyName;
			this.address=this.$route.query.address;
			this.status=this.$route.query.status;
			this.id=this.$route.query.id;
			this.provCode=this.$route.query.provCode;
			this.cityCode=this.$route.query.cityCode;
			this.countyCode=this.$route.query.countyCode;
			if(this.status=='Y'){
				this.active=true
			}else{
				this.active=false
			}
		},
		methods: {
			getData() {
				var picker = new mui.PopPicker({
					layer: 3
				});
				picker.setData(cityData)
				picker.pickers[0].setSelectedIndex(0);
				picker.pickers[1].setSelectedIndex(0);
				picker.pickers[2].setSelectedIndex(0);
				picker.show((SelectedItem)=> {
					this.provName=SelectedItem[0].text;
					this.cityName=SelectedItem[1].text;
					this.countyName=SelectedItem[2].text;
					this.provCode=SelectedItem[0].value
					this.cityCode=SelectedItem[1].value
					this.countyCode=SelectedItem[2].value
				})
			},
			chooseStatus(){
				this.active=!this.active
				if(this.status=='N'){
					this.status='Y'
				}else{
					this.status='N'
				}
			},
			deletes(){
				let _this = this;
				let _id = this.id;
				mui.confirm('你确定要删除么？', '提示', ['否', '是'],function(e) {
					if (e.index == 1) {
						_this.postRequest('/weixin/address/deleAddress',{
					 		id:_id
					 	}).then((data) => {
					 		if(data.code==0){
					 			mui.toast('删除成功！');
					 			_this.$router.push("/delivery/histoys");
					 		}
						})
					} else {
						mui.toast('取消操作');
					}
				})
			},
			saveBtn(){
				var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
				if(!this.name){
					mui.toast('收货人不能为空！');
				}else if(!this.phoneNum){
					mui.toast('手机号不能为空！');
				}else if(!reg.test(this.phoneNum)){
					mui.toast('请填写正确的手机号格式！');
				}else if(!this.provCode||!this.cityCode||!this.countyCode){
					mui.toast('所在地区不能为空！');
				}else if(!this.address){
					mui.toast('详细地址不能为空！');
				}else{
					this.postRequest('/weixin/address/updateAddress',{
				 		name:this.name,
				 		phoneNum:this.phoneNum,
				 		provCode:this.provCode,
				 		cityCode:this.cityCode,
				 		countyCode:this.countyCode,
				 		address:this.address,
				 		status:this.status,
				 		id:this.id
				 	}).then((data) => {
				 		if(data.code==0){
				 			mui.toast('编辑成功！');
				 			this.$router.push("/delivery/histoys");
				 		}
					})
				}
			}
		}
	}
</script>

<style scoped>
	.editList{
		background-color: #fff;
	}
	.editList li{
		padding: 0.25rem 0.3rem;
		border-bottom: 0.01rem solid #E6E6E6;
		box-sizing: border-box;
	}
	.editList li:last-child{
		border-bottom: none;
	}
	.editList li input{
		border: none;
		padding: 0;
		margin: 0;
		height: 0.48rem;
		font-size: 0.34rem;
	}
	.mui-switch{
		margin-right: 0.3rem;
	}
	
	.area_nsmr1 {
		width: 2.5rem;
		font-size: .34rem;
		letter-spacing: 0;
		text-align: left;
		margin-top: 0.12rem;
	}
	.area_im img {
		width: 5%;
		width: 0.125rem;
		height: 0.272rem;
	}
	footer {
		width: 100%;
		height: 1rem;
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
	}
	
	footer div:nth-of-type(1) {
		width: 50%;
		height: 1rem;
		text-align: center;
		line-height: 1rem;
		background: #fff;
		color: #18BC9A;
	}
	
	footer div:nth-of-type(2) {
		width: 50%;
		height: 1rem;
		text-align: center;
		line-height: 1rem;
		background: #18BC9A;
		color: #fff;
	}
</style>