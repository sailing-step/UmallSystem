import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

// 引入模块
import menu from './modules/menu'
import role from './modules/role'
import user from './modules/user'
import category from './modules/category'
import specs from './modules/specs'
import goods from "./modules/goods"
import banner from "./modules/banner"
import member from "./modules/member"
import seckill from "./modules/seckill"

let store = new Vuex.Store({
    state:{
        iscollapse:false  // 是否折叠，默认不折叠！
    },
    getters:{},
    mutations:{
        TOGGLE(state){
            state.iscollapse = !state.iscollapse
        }
    },
    actions:{},
    modules:{
        menu,role,user,category,specs,goods,banner,member,seckill
    }
})



export default store