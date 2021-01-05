<template>
	<div>
		<ul class='info bg-fff'>
			<li>
				<span>姓名：</span>
				<input type="text" class='intoInfo pull-right' placeholder="请输入真实姓名，提交后不可修改" id='name' v-model='dataInfo.patientName' />
			</li>
			<li id='showUserPicker'  @click='changeSex()'>
				<span>性别：</span>
				<span class='pull-right chooseSex'>
					<span>{{dataInfo.patientSex}}</span>&nbsp;
					<img src="../../assets/img/arrow.png" alt="" class='arrowImg' />
				</span>
			</li>
			<li class='btn'  @click='changeAge()' >
				<span>年龄：</span>
				<span class='pull-right chooseSex'>
					<span>{{dataInfo.patientAge}}</span>&nbsp;
				<!--<input type="hidden" name="" id='result1' value="" />-->
				<img src="../../assets/img/arrow.png" alt="" class='arrowImg' />
				</span>
			</li>
			<li>
				<span>身份证号：</span>
				<input type="text" class='intoInfo pull-right' id='cardId' v-model='dataInfo.cardId' placeholder="请输入，提交后不可更改" style="width: 70% !important;" />
			</li>
		</ul>
		<div class="footer" v-if='complete!="Y"'>
			<button type="button" class=" saveBtn mui-btn-success" id='saveMsg' @click="sendInfo()">提交</button>
		</div>
	</div>
</template>
<script>
	import '../../assets/js/mui.poppicker.js'
	import '../../assets/js/mui.picker.min.js'
	import { getStore, setStore} from "@/utils/storage";
	export default {
		data: function() {
			return {
				dataInfo:{
					username: "",
					code: "",
					content: "获取验证码",
					name: '',
					cardId: '',
					age:'',
					patientSex:'',
					patientAge:'',
					patientAge1:'',
					path:''
				},
				complete:'',
				dtPicker:'',
				picker:'',
				ageStatus:false,
				sexStatus:false
			}
		},
		mounted() {
			this.isComplete()
			this.getMsg();
		},
		beforeDestroy() {
			if(this.sexStatus){
    			this.picker.hide()
			}
			if(this.ageStatus){
    			this.dtPicker.hide()
			}
		},
		beforeRouteEnter(to, from, next) {
			setStore('path',from.path)
			next()
		 },
		methods: {
			getMsg(){
				this.postRequest('/weixin/patientInfo').then((data) => {
					this.dataInfo.patientName = data.map.findByPartyId.patientName
					this.dataInfo.patientSex = data.map.findByPartyId.patientSex
					if(data.map.findByPartyId.patientAge){
						this.dataInfo.patientAge = this.jsGetAge(data.map.findByPartyId.patientAge)+'岁'
					}
					if(data.map.findByPartyId.cardId){
						this.dataInfo.cardId = data.map.findByPartyId.cardId
					}
				})
			},
			changeSex(){
				this.sexStatus=true
				//选择性别
				 this.picker = new mui.PopPicker();
				this.picker.setData(
				 	[{
				 		value:'男',text:'男'
				 	},{
				 		value:'女',text:'女'
				 	},
				 	]);
				 this.picker.show((selectItems)=>{
				 	this.sexStatus=false
				 	this.dataInfo.patientSex = selectItems[0].text;
				 })
			},
			changeAge(){
					this.ageStatus=true
					this.dtPicker = new mui.DtPicker({
				   	 	type: "date",
			            "beginYear":1900,
			            "endYear":new Date().getFullYear()
				   	});
				    this.dtPicker.show((selectItems)=>{ 
				    	this.ageStatus=false
				    	this.dataInfo.data=selectItems.y.text+'-'+selectItems.m.text+'-'+selectItems.h.text
				        this.dataInfo.patientAge = this.jsGetAge(this.dataInfo.data)+'岁';
				        this.dataInfo.patientAge1 = this.jsGetAge(this.dataInfo.data);
				    })
			},
			sendInfo() {
				var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
				if(!this.dataInfo.patientName){
					mui.toast('姓名不能为空！');
				}else if(!this.dataInfo.patientSex){
					mui.toast('性别不能为空！');
				}else if(!this.dataInfo.patientAge){
					mui.toast('年龄不能为空！');
				}else if(!this.dataInfo.cardId){
					mui.toast('身份证不能为空！');
				}else if(!reg.test(this.dataInfo.cardId)){
					mui.toast('请输入正确身份证号！');
				}else {
					var btnArray = ['取消', '确定'];
					var _this=this;
					mui.confirm('', '提交后不可修改，是否确定提交？', btnArray, function(e) {
						if(e.index == 1) {
							_this.postRequest('/weixin/patientUpdate', {
								name: _this.dataInfo.patientName,
								sex: _this.dataInfo.patientSex,
								age: _this.dataInfo.data,
								cardId: _this.dataInfo.cardId
							}).then((data) => {
								if(data.code==0){
									mui.toast('修改成功！');
									setStore('patientName',_this.dataInfo.patientName);
							 		setStore('patientAge',_this.dataInfo.patientAge1);
							 		setStore('patientSex',_this.dataInfo.patientSex);
							 		setStore('complete','Y');
									_this.$router.push({path:getStore('path')});
								}
							})
						}
					})
				}
			},
			isComplete(){
				this.postRequest('/weixin/completeInfo',{
					type:''
				}).then((data)=>{
					if(data.code==0){
						this.complete=data.complete
					}
				})
			},
			jsGetAge(strBirthday) {
				var returnAge;
				var strBirthdayArr = strBirthday.split("-");
				var birthYear = strBirthdayArr[0];
				var birthMonth = strBirthdayArr[1];
				var birthDay = strBirthdayArr[2];
				var d = new Date();
				var nowYear = d.getFullYear();
				var nowMonth = d.getMonth() + 1;
				var nowDay = d.getDate();
				if(nowYear == birthYear) {
					returnAge = 0; //同年 则为0岁
				} else {
					var ageDiff = nowYear - birthYear; //年之差
					if(ageDiff > 0) {
						if(nowMonth == birthMonth) {
							var dayDiff = nowDay - birthDay; //日之差
							if(dayDiff < 0) {
								returnAge = ageDiff - 1;
							} else {
								returnAge = ageDiff;
							}
						} else {
							var monthDiff = nowMonth - birthMonth; //月之差
							if(monthDiff < 0) {
								returnAge = ageDiff - 1;
							} else {
								returnAge = ageDiff;
							}
						}
					} else {
						returnAge = 0; //返回-1 表示出生日期输入错误 晚于今天
					}
				}
				return returnAge; //返回周岁年龄
			}
		}
	}
</script>

<style scoped>
	
	.saveBtn {
		width: 100%;
		height: 48px;
		line-height: 48px;
	}
	
	/*完善信息*/
	
	.info li {
		display: inline-block;
		width: 100%;
		height: 0.98rem;
		line-height: 0.98rem;
		padding: 0 0.3rem;
		border-bottom: 0.01rem solid #E6E6E6;
		box-sizing: border-box;
		text-align: left
	}
	
	.intoInfo {
		display: inline-block;
		border: none !important;
		width: 83% !important;
		height: 0.42rem !important;
		line-height: 0.42rem !important;
		margin-bottom: 0 !important;
		font-size: 0.3rem;
		margin-top: 0.28rem;
		color: #666;
		text-align: right;
	}
	
	input::-webkit-input-placeholder {
		color: #e3e3e3;
	}
	
	.chooseSex {
		font-size: 0.3rem;
		color: #333;
	}
	
	.sendMsg {
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		background-color: #18BC9A;
		color: #fff;
		font-size: 0.34rem;
		text-align: center;
		position: absolute;
		bottom: 0;
	}
	
	.mui-btn-blue {
		color: #fff;
		background-color: #18BC9A;
		border: 0.01rem solid #18BC9A;
	}
	
	.arrowImg {
		width: 0.16rem;
		height: 0.28rem;
		position: relative;
		top: 0.04rem;
	}
	
	.arrowImg1 {
		top: 0.34rem !important;
	}
</style>