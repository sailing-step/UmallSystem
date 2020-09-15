import {getRole} from '@/request/role'
export default {
    namespaced:true,
    state: {
       rolelist:[] // 角色列表
    },
    getters: {
       rolelist: state=>state.rolelist
    },
    mutations: {
        SET_LIST(state,data){
            state.rolelist = data
        }
    },
    actions: {
        // 请求角色列表
       async get_role_list({commit}){
        let res = await getRole()
        // console.log(res)
        commit('SET_LIST',res)
       }
    }
};