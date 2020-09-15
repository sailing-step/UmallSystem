import { getCategory } from "@/request/category"
export default {
    namespaced:true,
    state: {
       catelist:[]  // 商品分类列表
    },
    getters: {
        catelist:state=>state.catelist
    },
    mutations: {
        SET_LIST(state,data){
          state.catelist = data
        }
    },
    actions: {
      async  get_category_list({commit}){
        let res = await getCategory()
        console.log(res)
        commit("SET_LIST",res)
        }
    }
};