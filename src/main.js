// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import store from '@/store/store'
import Vuex from 'vuex'
 Vue.use(Vuex)
Vue.use(VueAwesomeSwiper, /* { default global options } */)
import App from './App'
import router from './router'
import filters from '@/utils/filter'
//import 'lib-flexible';
import '@/assets/js/flexible.js';
import '@/assets/fonts/iconfont.css'
import '@/assets/css/main.css'
import '@/assets/css/mui.picker.min.css';
import '@/assets/css/mui.poppicker.css';
import { getRequest, postRequest, putRequest, deleteRequest, uploadFileRequest} from '@/utils/httpRequest';
import { getappId} from '@/utils/getAppId';
Vue.config.productionTip = false
if (process.env.NODE_ENV !== 'production') {
  require('@/mock')
}
//http 请求
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.uploadFileRequest = uploadFileRequest;
Vue.prototype.getappId = getappId;
//过滤器
for(let key  in filters){
   Vue.filter(key,filters[key]);
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
