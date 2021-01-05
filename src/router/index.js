import Vue from 'vue'
import Router from 'vue-router'
import { getStore, setStore} from "@/utils/storage";
import axios from 'axios'
Vue.use(Router)

var  router = new Router({
//	  mode: 'history',
  routes: [
     {
      path: '/',
      name: '/user/changeAccount',
      meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/user/changeAccount')
    },
     {
      path: '/user/bindPhone',
      name: '/user/bindPhone',
      meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/user/bindPhone')
    },
    {
      path: '/user/information',
      name: '/user/information',
      meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/user/information')
    },
     {
      path: '/user/setting',
      name: '/user/setting',
      meta: {
        requireAuth: false  // 登录权限
      },
       component: () => import(/* webpackChunkName: "navigator" */'@/components/user/setting')
    },
    {
      path: '/user/personal',
      name: '/user/personal',
      meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/user/personal')
    },
    {
      path: '/docter/changeDoctor',
      name: '/docter/changeDoctor',
      meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/docter/changeDoctor')
    },
    {
      path: '/docter/checkRecords',
      name: '/docter/checkRecords',
      meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/docter/checkRecords')
    },
    {
      path: '/docter/doctorMain',
      name: '/docter/doctorMain',
      meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/docter/doctorMain')
    },
    {
      path: '/docter/healthly',
      name: '/docter/healthly',
      meta: {
        requireAuth: false  // 登录权限
      },
       component: () => import(/* webpackChunkName: "navigator" */'@/components/docter/healthly')
    },
    {
      path: '/docter/myDoctor',
      name: '/docter/myDoctor',
      meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/docter/myDoctor')
    },
    {
      path: '/docter/notice',
      name: '/docter/notice',
      meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/docter/notice')
    },
    {
      path: '/docter/selectCase',
      name: '/docter/selectCase',
      meta: {
        requireAuth: false  // 登录权限
      },
       component: () => import(/* webpackChunkName: "navigator" */'@/components/docter/selectCase')
    },
    {
      path: '/case/dossier',
      name: '/case/dossier',
       meta: {
        requireAuth: false  // 登录权限
      },
       component: () => import(/* webpackChunkName: "navigator" */'@/components/case/dossier')
    },
     {
      path: '/case/addDossier',
      name: '/case/addDossier',
       meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/case/addDossier')
    },
     {
      path: '/case/editDoddier',
      name: '/case/editDoddier',
       meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/case/editDoddier')
    },
    {
      path: '/bulletin/doctorBulletin',
      name: '/bulletin/doctorBulletin',
       meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/bulletin/doctorBulletin')
    },
    {
      path: '/bulletin/healthyNews',
      name: '/bulletin/healthyNews',
       meta: {
        requireAuth: false  // 登录权限
      },
       component: () => import(/* webpackChunkName: "navigator" */'@/components/bulletin/healthyNews')
    },
    {
      path: '/bulletin/htalthyDetail/:id',
      name: '/bulletin/htalthyDetail',
       meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/bulletin/htalthyDetail')
    },
     {
      path: '/consultation/consultation',
      name: '/consultation/consultation',
       meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/consultation/consultation')
    },
    {
      path: '/consultation/consultChat',
      name: '/consultation/consultChat',
      meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/consultation/consultChat')
    },
    {
      path: '/consultation/selfConsultation',
      name: '/consultation/selfConsultation',
       meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/consultation/selfConsultation')
    },
    {
      path:'/groupConsultation/myInquiryList',
      name: '/groupConsultation/myInquiryList',
       meta: {
        requireAuth: false  // 登录权限 
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/groupConsultation/myInquiryList')
    },
    {
      path: '/inquisition/aboutDetail',
      name: '/inquisition/aboutDetail',
       meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/inquisition/aboutDetail')
    },
    {
      path: '/inquisition/inquiry',
      name: '/inquisition/inquiry',
       meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/inquisition/inquiry')
    },
    {
      path:'/inquisition/myInquition',
      name: '/inquisition/myInquition',
       meta: {
        requireAuth: false  // 登录权限
      },
       component: () => import(/* webpackChunkName: "navigator" */'@/components/inquisition/myInquition')
    },
    {
      path:'/inquisition/selfInqui',
      name: '/inquisition/selfInqui',
       meta: {
        requireAuth: false  // 登录权限
      },
       component: () => import(/* webpackChunkName: "navigator" */'@/components/inquisition/selfInqui')
    },
     {
      path: '/order/evaluatOrder',
      name: '/order/evaluatOrder',
       meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/order/evaluatOrder')
    },
     {
      path: '/order/logistics',
      name: '/order/logistics',
       meta: {
        requireAuth: false  // 登录权限
      },
       component: () => import(/* webpackChunkName: "navigator" */'@/components/order/logistics')
    },
    {
      path: '/order/myOrder',
      name: '/order/myOrder',
       meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/order/myOrder')
    },
    {
      path: '/order/orderDeatils',
      name: '/order/orderDeatils',
       meta: {
        requireAuth: false  // 登录权限
      },
       component: () => import(/* webpackChunkName: "navigator" */'@/components/order/orderDeatils')
    },
    {
      path: '/order/sureOrder',
      name: '/order/sureOrder',
       meta: {
        requireAuth: false  // 登录权限
      },
       component: () => import(/* webpackChunkName: "navigator" */'@/components/order/sureOrder')
    },
     {
      path: '/prescription/myPrescription',
      name: '/prescription/myPrescription',
       meta: {
        requireAuth: false  // 登录权限
      },
       component: () => import(/* webpackChunkName: "navigator" */'@/components/prescription/myPrescription')
    },
    {
      path: '/prescription/prescriptionDetail1',
      name: '/prescription/prescriptionDetail1',
       meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/prescription/prescriptionDetail1')
    },
     {
      path: '/prescription/prescriptionDetail2',
      name: '/prescription/prescriptionDetail2',
       meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/prescription/prescriptionDetail2')
    },
     {
      path: '/register/appointment',
      name: '/register/appointment',
       meta: {
        requireAuth: false  // 登录权限
      },
       component: () => import(/* webpackChunkName: "navigator" */'@/components/register/appointment')
    },
    {
      path: '/register/firmorder',
      name: '/register/firmorder',
       meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/register/firmorder')
    },
    {
      path: '/logi/infprmation',
      name: '/logi/infprmation',
       meta: {
        requireAuth: false  // 登录权限
      },
       component: () => import(/* webpackChunkName: "navigator" */'@/components/logi/infprmation')
    },
    {
      path: '/drugroom/pharmacy',
      name: '/drugroom/pharmacy',
       meta: {
        requireAuth: false  // 登录权限
      },
       component: () => import(/* webpackChunkName: "navigator" */'@/components/drugroom/pharmacy')
    },
    {
      path: '/shop/shopOption',
      name: '/shop/shopOption',
       meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/shop/shopOption')
    },
    {
      path: '/order/firmOorder',
      name: '/order/firmOorder',
       meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/order/firmOorder')
    },
    {
      path: '/delivery/histoys',
      name: '/delivery/histoys',
       meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/delivery/histoys')
    },
    {
      path: '/delivery/addhistoryed',
      name: '/delivery/addhistoryed',
       meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/delivery/addhistoryed')
    },
    {
      path: '/delivery/ediHistorytor',
      name: '/delivery/ediHistorytor',
       meta: {
        requireAuth: false  // 登录权限
      },
       component: () => import(/* webpackChunkName: "navigator" */'@/components/delivery/ediHistorytor')
    },
    {
      path: '/team/doctorteam',
      name: '/team/doctorteam',
       meta: {
        requireAuth: false  // 登录权限
      },
       component: () => import(/* webpackChunkName: "navigator" */'@/components/team/doctorteam')
    },
    {
      path: '/team/teamdetails',
      name: '/team/teamdetails',
       meta: {
        requireAuth: false  // 登录权限
      },
       component: () => import(/* webpackChunkName: "navigator" */'@/components/team/teamdetails')
    },
    {
      path: '/team/doctorlecture',
      name: '/team/doctorlecture',
       meta: {
        requireAuth: false  // 登录权限
      },
       component: () => import(/* webpackChunkName: "navigator" */'@/components/team/doctorlecture')
    },
    {
      path: '/team/doctorlecture_2',
      name: '/team/doctorlecture_2',
       meta: {
        requireAuth: false  // 登录权限
      },
       component: () => import(/* webpackChunkName: "navigator" */'@/components/team/doctorlecture_2')
    },
    {
      path: '/successive/continuation',
      name: '/successive/continuation',
       meta: {
        requireAuth: false  // 登录权限
      },
       component: () => import(/* webpackChunkName: "navigator" */'@/components/successive/continuation')
    },
    {
      path: '/successive/continuationtwo',
      name: '/successive/continuationtwo',
       meta: {
        requireAuth: false  // 登录权限
      },
       component: () => import(/* webpackChunkName: "navigator" */'@/components/successive/continuationtwo')
    },
    {
      path: '/successive/continuationOption',
      name: '/successive/continuationOption',
       meta: {
        requireAuth: false  // 登录权限
      },
       component: () => import(/* webpackChunkName: "navigator" */'@/components/successive/continuationOption')
    },
    {
      path: '/successive/prescription',
      name: '/successive/prescription',
       meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/successive/prescription')
    },
    {
      path: '/drugroom/scrollPharmacy',
      name: '/drugroom/scrollPharmacy',
       meta: {
        requireAuth: false  // 登录权限
      },
       component: () => import(/* webpackChunkName: "navigator" */'@/components/drugroom/scrollPharmacy')
    },
    {
      path: '/free/free',
      name: '/free/free',
       meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/free/free')
    },
    {
      path: '/myPatient/myPatient',
      name: '/myPatient/myPatient',
      meta: {
        requireAuth: false  // 登录权限
      },
      component: () => import(/* webpackChunkName: "navigator" */'@/components/myPatient/myPatient')
    },
  ]
})


// 静默登录
//router.beforeEach((to, from, next) => {
//	if(to.meta.requireAuth){
//		//获得code
//			var key=window.location.href.split('?')[1]
//			if(key){
//					var keyArr=key.split('&&');
//					for (var i=0;i<keyArr.length;i++) {
//						if(keyArr[i].split('=')[0]=='code'){
//							var access_code=keyArr[i].split('=')[1]
//						}
//				}
//			}
//	    var openId = getStore('openId'); 
//	    var token = getStore('token');
//	    var bind = getStore('bind');
//	    if(!token){
//	        if(!access_code){
//	          	mui.toast('微信服务异常！')
//	        }else {
//	        	let base = process.env.API_ROOT;
//	        	 axios.get(`${base}/weixin/base/wxAuthorize?code=`+access_code).then((data) => {
//									if(data.code==0){
//										if(data.userMap){
//									 		setStore('token',data.userMap.token);
//									 		setStore('partyId',data.userMap.partyId);
//									 		setStore('bind',data.userMap.bind);
//									 		if(data.userMap.bind=='N'){
//									 				next({ name: '/user/bindPhone'})
//									 		}else{
//									 				next();
//									 		}
//										}
//									}else{
//										mui.toast(data.msg)
//									}
//			         })
//			      }
//      }else{
//      	//判断用户是否绑定手机号
//      	if(bind=='N'){
//			 				next({ name: '/user/bindPhone'})
//			 		}else{
//			 				next();
//			 		}
//
//	   	}
//	}else{
//		next();
//	}
//});

export default router;