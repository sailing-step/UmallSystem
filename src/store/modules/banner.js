import {getBanner} from '@/request/banner'
export default {
    namespaced:true,
    state: {
       bannerlist:[] // 轮播图列表
    },
    getters: {
        bannerlist:state=>state.bannerlist
    },
    mutations: {
       SET_LIST(state,data){
            state.bannerlist = data
       }
    },
    actions: {
        async get_banner_list({commit}){
            let res = await getBanner()
            console.log(res)
            commit("SET_LIST",res)
        }
    }
};