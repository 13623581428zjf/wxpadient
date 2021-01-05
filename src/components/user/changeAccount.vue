<template>
	<div class="mui-content">
		<div class='phoneNum bg-fff'>
			<input type="text" v-model="username" placeholder="手机号" />
		</div>
		<div class='phoneNum phoneCode bg-fff'>
			<input type="text" placeholder="短信验证码" v-model="code" class='pull-left' style="width: auto;width: 60%;"/>
			<button class='pull-right sendCodeBtn' @click="getCode($event)" style="border-radius:0;">{{content}}</button>
		</div>
		<a class='toLogin' @click="toLogin">登录</a>
	</div>
</template>
<script>
	import { setStore ,getStore,removeStore,getSession, setSession} from "@/utils/storage";
	export default {
		data: function() {
			return {
				username: "",
				code: "",
				content: "获取验证码"
			};
		},
		methods: {
			getCode: function(event) {
				var tg = event.currentTarget;
				var reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
				if(!this.username) {
					mui.toast('请输入手机号');
				} else if(!reg.test(this.username)) {
					mui.toast('输入的手机号格式不正确');
				} else {
					this.postRequest("/weixin/registerSendSMS", {
						username: this.username,
						type:'login'
					}).then((data) => {
						if(data.loginBind=="N"){
							mui.toast('该用户没有绑定微信！')
						}else{
							this.totalTime = 120;
							this.content = this.totalTime + 's后重新发送';
							tg.setAttribute('disabled', true);
							let clock = window.setInterval(() => {
								this.totalTime--;
								this.content = this.totalTime + 's后重新发送';
								if(this.totalTime < 0) {
									window.clearInterval(clock);
									this.content = '重新发送验证码';
									tg.setAttribute('disabled', true);
								}
							}, 1000)
							}
						})
					}
			},
			toLogin: function() {
				var reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
				var url = getSession('url');
				if(!this.username) {
					mui.toast('请输入手机号');
				} else if(!reg.test(this.username)) {
					mui.toast('输入的手机号格式不正确');
				} else if(!this.code || this.code.length != '6') {
					mui.toast('请输入6位数验证码');
				} else {
					setStore('phoneNum', this.username);
					this.postRequest('/weixin/login',{
						username: this.username,
						verifyCode: this.code
					}).then((data) =>{
						console.log(data)
						if(data.code == "0"){
							//应该先清空所有缓存，然后重新缓存
							removeStore('complete');
							var token = data.token;
							var partyId = data.partyId;
							setStore('token', token);
							setStore('partyId', partyId);
							setStore('bind', 'Y');
//							setStore('patientName', data.patientInfo.patientName);
//							setStore('patientSex', data.patientInfo.patientSex);
//							setStore('patientAge', data.patientInfo.patientAge);
//							setStore('partyId', data.patientInfo.partyId);
							if(url != null) {
								console.log(url)
							} else {
								 this.$router.replace("/user/setting");
							}
						}else{
							mui.toast(data.msg);
						}
					})
				}
			}
		},
		created() {}
	};
</script>

<style scoped>
	.phoneNum {
		width: 100%;
		box-sizing: border-box;
	}
	
	.phoneNum input {
		width: 100%;
		height: 0.98rem !important;
		line-height: 0.5rem;
		padding: 0.2rem;
		border: none;
		padding: 0 0.3rem;
		outline: none;
		font-size: 0.34rem;
		border-bottom: 0.01rem solid #E6E6E6 !important;
		margin-bottom: 0;
	}
	
	input::-webkit-input-placeholder {
		color: #ccc;
		font-size: 0.34rem;
	}
	
	.phoneCode {
		height: 1rem;
		line-height: 1rem;
		border-bottom: 0.01rem solid #E6E6E6;
		border-top: 0.01rem solid #E6E6E6;
	}
	
	.phoneCode input {
		height: 0.97rem !important;
		border: none;
		margin-bottom: 0 !important;
	}
	
	.sendCodeBtn {
		height: 0.8rem;
		line-height: 0.8rem;
		margin-right: 0.3rem;
		border-left: 0.01rem solid #E6E6E6;
		padding-left: 13px;
		color: #18BC9A;
		font-size: 0.28rem;
		margin-top: 0.1rem;
		border-right: none;
		border-top: none;
		border-bottom: none;
	}
	
	.toLogin {
		display: block;
		margin: 0.69rem auto;
		width: 6.9rem;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		background: #18BC9A;
		border-radius: 0.12rem;
		font-size: 0.34rem;
		color: #FFF !important;
	}
	
	.toLogin:active {
		background: #19947b;
	}
	
	input[type='text'] {
		border: none !important;
	}
	
	button:enabled:active {
		background-color: #fff;
		color: #18BC9A;
	}
</style>