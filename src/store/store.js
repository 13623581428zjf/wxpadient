import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
 Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        isShow:false
    }
})

export default store
