import {getSeckill} from "@/request/seckill"
import {toTime} from "@/utils/time"
export default {
    namespaced:true,
    state: {
       seckilllist:[] // 秒杀列表
    },
    getters: {
        seckilllist:state=>state.seckilllist
    },
    mutations: {
       SET_LIST(state,data){
        state.seckilllist = data
       }
    },
    actions: {
       async get_seckill_list({commit}){
            let res = await getSeckill()
            // console.log(res)
            res.map(val=>{
               val.begintime = toTime(val.begintime)
               val.endtime = toTime(val.endtime)
            })
            commit("SET_LIST",res)
       }
    }
};