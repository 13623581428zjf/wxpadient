<template>
	<div class="mui-content">
		<div class="doctor-info bg-18BC9A pd-leftright-px15 ">
			<div class="info-top pd-updown-px15 clearfix">
				<img :src="doctor.picture" alt="" class="pull-left  mg-right-px15" v-if="doctor.picture">
				<img src="../../assets/img/docter_head.png" alt="" class="pull-left  mg-right-px15" v-else>
				<div class="info-top-right pull-left">
					<p style="font-size: 18px; margin:8px 0;">{{doctor.name}}</p>
					<p style="font-size: 12px">{{doctor.deparment}} {{doctor.job}}</p>
					<p style="font-size: 12px">{{doctor.hospital}}</p>
				</div>
				<div class='pull-right' style="margin:0.1rem 0.1rem 0 0 ;">
					<span  v-if='status=="Y"' @click='defaultDoctor(doctor)'>设为默认</span>
					<span  v-if='status=="N"' @click='followDoc(doctor)'>关注</span>
				</div>
			</div>
			<div class="info-bot">
				<p :class="{'text-over2':isShow}" @click='chooseShow()'>擅长：{{doctor.strong || '请完善信息'}}</p>
			</div>
		</div>
		<div class="tab-class" v-if='status!="N"'>
			<ul class="clearfix">
				<li>
					<a @click="sides({name:'/register/appointment',query: {id:id}},'',doctor.party_id)">
						<img src="../../assets/img/yygh.png" style="width: .68rem;height: .68rem;" alt="">
						<p>预约挂号</p>
					</a>
				</li>
				<li>
					<a @click="sides({name:'/inquisition/inquiry',query:{partyId:doctor.party_id}},'inquisition',doctor.party_id)">
						<img src="../../assets/img/yywz.png" style="width: .68rem;height: .68rem;" alt="">
						<p>预约问诊</p>
					</a>
				</li>
				<li>
					<a @click="sides({name:'/consultation/consultChat',query:{partyId:doctor.party_id}},'inquisition',doctor.party_id)">
						<img src="../../assets/img/mfzx.png" style="width: .68rem;height: .68rem;" alt="">
						<p>免费咨询</p>
					</a>
				</li>
				<li>
					<a>
						<img src="../../assets/img/yyf.png" style="width: .68rem;height: .68rem;" alt="">
						<p>云药房</p>
					</a>
				</li>
			</ul>

			<p class="not-centent pd-leftright-px15" @click='$router.push({name:"/bulletin/doctorBulletin",params:{partyId:doctor.party_id}})'  v-if='status!="N"'>
				<img src="../../assets/img/xiaolab.png" style="width: .28rem;height:.28rem;vertical-align: middle;" alt="">
				<span class="notice" style="vertical-align: middle;" v-if='notice'> {{notice}}</span>
				<span class="notice" style="vertical-align: middle;" v-else> 暂无公告</span>
			</p>
		</div>
		<div class="doctor-team"  v-if='status!="N"'>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media">
					<div class="mui-media-body">
						<div class="team-title" @click="docterTeam()">
							<p>医生团队</p>
							<p>
								<img src="../../assets/img/next.png" alt="" style="width:.16rem;height:.28rem; vertical-align: middle;">
							</p>
						</div>

					</div>
				</li>
			</ul>
			<div class="info-top pd-px15 bg-fff  clearfix" v-for='(team,index) in teamList' :key='index' v-if='teamList.length>0' @click='$router.push({name:"/team/teamdetails",query:{teamId:team.teamId,partyId:doctor.party_id}})'>
				<img :src="team.img" alt="" class="pull-left  mg-right-px15" v-if='team.img'>
				<img src="../../assets/img/docter_head.png" alt="" class="pull-left  mg-right-px15" v-else>
				<div class="info-top-right pull-left" style="width: 4.96rem">
					<p style="font-size: 18px; color: #333; margin:8px 0;">{{team.teamName}}</p>
					<p style="font-size: 12px; color:#666;" class="text-over2 ">{{team.text}}</p>
				</div>
			</div>
			<div v-if='teamList.length==0' class='noLength'>
				暂未加入医生团队
			</div>
		</div>
		<div class="doctor-team">
			<ul class="mui-table-view" @click='$router.push({name:"/bulletin/healthyNews",query:{partyId:doctor.party_id}})'>
				<li class="mui-table-view-cell mui-media">
					<div class="mui-media-body">
						<div class="team-title">
							<p>健康资讯</p>
							<p>
								<img src="../../assets/img/next.png" alt="" style="width:.16rem;height:.28rem; vertical-align: middle;">
							</p>
						</div>

					</div>
				</li>
			</ul>
			<div class="info-top bg-fff  clearfix" style="padding: 10px 15px;" v-for='(information,index) in informationList' :key='index' v-if='informationList.length>0' @click='$router.push({name:"/bulletin/htalthyDetail",params:{id:information.id}})'>
				<p style="font-size: 16px; color: #333;margin-bottom: 5px;" class="text-over2 ">{{information.title}}</p>
				<p style="font-size: 12px; color:#ccc;">
					<span class="pull-left">{{information.releaseDate|sliceTime}}</span>
					<span class="pull-right">阅读 {{information.num}}</span>
				</p>
			</div>
			<div v-if='informationList.length==0' class='noLength'>
				暂未发布资讯
			</div>
		</div>
		<div class="doctor-team" style="margin-bottom: 0;">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media">
					<div class="mui-media-body">
						<div class="team-title">
							<p>医师讲座</p>
							<p>
								<img src="../../assets/img/next.png" alt="" style="width:.16rem;height:.28rem; vertical-align: middle;">
							</p>
						</div>
					</div>
				</li>
			</ul>
			<div class="info-top bg-fff  clearfix" style="padding: 10px 15px;">
				<p style="font-size: 12px; color:#666; margin-bottom: 13px;" class="text-over2 ">医生叔叔进课堂，健康知识伴成长——家长进课堂系列讲座之读懂血常规—数据背后的科学知识…</p>
				<p style="font-size: 12px; color:#ccc;">
					<span class="pull-left">预告 2018-12-10 10：00</span>
					<span class="pull-right" style="font-size:14px;color:#FA5D40;">¥100.00</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import { getStore, setStore} from "@/utils/storage";
	export default {
		data: function() {
			return {
				doctor: {},
				id: '',
				teamList: [],
				informationList: [],
				notice: '',
				partyId:'',
				status:'',
				complete:'',
				isShow:true
			};
		},
		mounted() {
			this.partyId=this.$route.query.partyId
			if(this.partyId){
				this.getDes()
			}else{
				this.getInfo();
			}
		},
		methods: {
			getInfo() {
				this.postRequest('/weixin/hasConcern').then((data) => {
					if(data.flag) {
						this.getDoctor();
					} else {
						this.$router.push('/docter/changeDoctor')
					}
				})
			},
			chooseShow(){
				this.isShow=!this.isShow
			},
			//选择默认
			defaultDoctor(item) {
				console.log(item)
				this.postRequest('/weixin/updateApprove',{
					partyId: parseInt(item.party_id),
				}).then((data)=>{
					mui.toast('设置成功');
					this.getDes();
				})
			},
			//关注
			followDoc(item) {
				this.postRequest('/weixin/createdConcern',{
					partyId: parseInt(item.party_id),
				}).then((data)=>{
					mui.toast('关注成功');
					this.getDes();
				})
			},
			getDes() {
				this.getRequest('/weixin/findDoctorDes/'+this.partyId).then((data) => {
					this.doctor = data.doctor;
					this.id = this.doctor.party_id
					this.status = data.status
					this.teamList = data.teamList
					this.informationList = data.informationList
					if(data.notice[0]) {
						this.notice = data.notice[0].content
					}
				})
			},
			sureInfo(){
				var _this=this
					var btnArray = ['取消', '确定'];
					mui.confirm('', '请先完善个人信息！', btnArray, function(e) {
						if(e.index==1){
							_this.$router.push({name:'/user/information'})
						}
				})
			},
			isForbidden(path,partyId){
				this.getRequest('/weixin/isDoctorBan/'+partyId).then((data) => {
					if(data.code==500){
						mui.toast(data.msg)
					}else{
						this.$router.push(path)
					}
				})
			},
			//挂号，问诊，咨询入口
			sides(path,type,partyId) {
					this.postRequest('/weixin/completeInfo',{
						type:type
					}).then((data)=>{
						if(data.code==0){
							this.complete=data.complete
							if(this.complete=='Y'){
								//判断医生是否禁用
								this.isForbidden(path,partyId)
							}else{
								this.sureInfo()
							}
						}
					})
			},
			//获取医生信息
			getDoctor() {
				this.postRequest('/weixin/findConcernDoctor').then((data) => {
					this.doctor = data.doctor;
					this.id = this.doctor.party_id
					this.teamList = data.teamList
					this.informationList = data.informationList
					if(data.notice[0]) {
						this.notice = data.notice[0].content
					}
				})
			},
			//医生团队
			docterTeam() {
				this.$router.push({
					name: '/team/doctorteam',
					query: {
						id: this.id
					}
				})
			}
		}
	}
</script>

<style scoped>
	.doctor-info {
		padding-bottom: 0.2rem;
		color: #ffffff;
	}
	
	.info-top img {
		width: 1.56rem;
		height: 1.56rem;
		display: block;
		border-radius: 50%;
	}
	
	.info-top-right p {
		color: #ffffff;
	}
	
	.info-bot p {
		font-size: 12px;
		color: #ffffff;
	}
	
	.tab-class {
		height: 2.7rem;
		background-color: #fff;
		margin-bottom: 10px;
	}
	
	.tab-class ul {
		height: 1.98rem;
		border-bottom: 1px solid #E6E6E6;
		padding: 20px 0;
	}
	
	.tab-class ul li {
		float: left;
		width: 25%;
		height: 100%;
		text-align: center;
	}
	
	.tab-class ul li a {
		width: 100%;
		height: 100%;
		display: block;
	}
	
	.tab-class ul li i {
		font-size: 36px;
	}
	
	.tab-class .not-centent {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: .7rem;
		line-height: .68rem;
	}
	
	.tab-class .notice {
		font-size: 12px;
		color: #666666;
	}
	
	.mui-table-view:before,
	.mui-table-view:after {
		height: 0;
	}
	
	.doctor-team {
		margin-bottom: 10px;
	}
	
	.doctor-team .team-title {
		height: .8rem;
		line-height: .78rem;
	}
	
	.doctor-team .team-title::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #E6E6E6;
	}
	
	.doctor-team .team-title p:first-child {
		float: left;
		color: #666666;
		font-size: .28rem;
	}
	
	.doctor-team .team-title p:last-child {
		float: right;
	}
	
	.mui-table-view-cell {
		padding: 0 15px;
	}
	
	.noLength {
		height: 0.7rem;
		line-height: 0.7rem;
		text-align: center;
		color: #666;
		background: #fff;
		font-size: 0.26rem;
	}
</style>