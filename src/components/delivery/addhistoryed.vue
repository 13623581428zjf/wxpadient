<template>
	<div class="mui-content">
		<!--添加收货地址-->
		<div class="addcls">
			<input class='shr' type="text" placeholder="收货人" v-model='name' />
			<input class='phone' type="number" placeholder="手机号" v-model='phoneNum' />
		</div>
		<!--所在地区-->
		<div class="area" style="position: relative;" @click='getData()'>
			<div class="area_nsmr" style="width: 3rem;">&nbsp;&nbsp;&nbsp;所在地区</div>
			<div class="area_im">
				{{text1}}{{text2}}{{text3}}
			</div>
			<img src="../../assets/img/arrow.png" />
		</div>
		<!--详细地址-->
		<div class="areax">
			<input class='address' type="text" placeholder="详细地址" v-model='address' />
		</div>
		<!--设为默认地址-->
		<div class='bg-fff areaDefault'>
			<div class="area_nsmr1 pull-left">&nbsp;&nbsp;&nbsp;设为默认地址</div>
			<div class="mui-switch mui-switch-mini pull-right" :class="{'mui-active':active}" @click='chooseStatus()'>
				<div class="mui-switch-handle"></div>
			</div>
		</div>
		<div class="footer" @click="save()" v-if='isShow'>
			<button type="button" class="saveBtn mui-btn-success">保存</button>
		</div>
	</div>
</template>

<script>
	import '../../assets/js/mui.picker.min.js'
	import { cityData } from '../../assets/js/city.data-3.js'
	export default {
		data() {
			return {
				active: false,
				text1: '',
				text2: '',
				text3: '',
				name: '',
				phoneNum: '',
				provCode: '',
				cityCode: '',
				countyCode: '',
				address: '',
				status: 'N',
				clientHeight: document.documentElement.clientHeight,
				isShow: true
			}
		},
		mounted() {
			//解决键盘弹起底部btn被顶起
			window.onresize = () => {
				if(this.clientHeight > document.documentElement.clientHeight) {
					this.isShow = false
				} else {
					this.isShow = true
				}
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
				picker.show((SelectedItem) => {
					this.text1 = SelectedItem[0].text;
					this.text2 = SelectedItem[1].text;
					this.text3 = SelectedItem[2].text;
					this.provCode = SelectedItem[0].value
					this.cityCode = SelectedItem[1].value
					this.countyCode = SelectedItem[2].value
				})
			},
			chooseStatus() {
				this.active = !this.active
				if(this.status == 'N') {
					this.status = 'Y'
				} else {
					this.status = 'N'
				}
			},
			save() {
				var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
				if(!this.name) {
					mui.toast('收货人不能为空！');
				} else if(!this.phoneNum) {
					mui.toast('手机号不能为空！');
				} else if(!reg.test(this.phoneNum)) {
					mui.toast('请填写正确的手机号格式！');
				} else if(!this.provCode || !this.cityCode || !this.countyCode) {
					mui.toast('所在地区不能为空！');
				} else if(!this.address) {
					mui.toast('详细地址不能为空！');
				} else {
					this.postRequest('/weixin/address/createAddress', {
						name: this.name,
						phoneNum: this.phoneNum,
						provCode: this.provCode,
						cityCode: this.cityCode,
						countyCode: this.countyCode,
						address: this.address,
						status: this.status,
					}).then((data) => {
						if(data.code == 0) {
							mui.toast('保存成功！');
							this.$router.replace("/delivery/histoys");
						}
					})
				}
			}
		}
	}
</script>

<style scoped>
	.shr {
		border-bottom: .01rem solid #E6E6E6;
		height: 1rem;
		border-top: none;
		border-left: none;
		border-right: none
	}
	
	.phone {
		margin-top: -.5rem;
		height: 1rem;
		border: none;
	}
	
	.address {
		border-bottom: .01rem solid #E6E6E6;
		height: 1rem;
		border-top: none;
		border-left: none;
		border-right: none
	}
	
	.area {
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		border-bottom: .01rem solid #E6E6E6;
		border-top: .01rem solid #E6E6E6;
		margin-top: -.31rem;
		display: flex;
		color: #333333;
		background: #fff;
	}
	
	.area_nsmr {
		width: 95%;
		font-size: .34rem;
		letter-spacing: 0;
		text-align: left;
		
	}
	
	.area_nsmr1 {
		width: 2.5rem;
		font-size: .34rem;
		letter-spacing: 0;
		text-align: left;
		margin-top: 15px;
	}
	
	.area_im {
		position: absolute;
		left: 2.9rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width:50%;
	}
	
	.area img {
		width: .3rem;
		height: .4rem;
		position: absolute;
		right: .1rem;
		top: .3rem;
		
	}
	
	.areaDefault {
		width: 100%;
		height: 1rem;
		background-color: #fff;
	}
	
	.mui-switch {
		margin-top: 10px;
		margin-right: 0.3rem;
	}
	
	.saveBtn {
		width: 100%;
		height: 48px;
		line-height: 48px;
	}
</style>