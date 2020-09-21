import {getMember} from "@/request/member"
import {toTime} from "@/utils/time"
export default {
    namespaced:true, 
    state: {
       memberlist:[] // 会员列表
    },
    getters: {
       memberlist:state=>state.memberlist
    },
    mutations: {
      SET_LIST(state,data){
        state.memberlist = data
      }
    },
    actions: {
       async get_member_list({commit}){
            let res = await getMember()
            res.map(val=>{
               val.addtime = toTime(val.addtime)
            })
            // console.log(res)
            commit("SET_LIST",res)
       }
    }
};