import $axios from "@/common/http"

// 获取会员列表
export async function getMember(){
    let res = await $axios.get("/memberlist")
    if(res.code==200 && res.list){
        return res.list
    }else {
        return []
    }
}

// 会员修改
export function editMember(data){
    return $axios.post("/memberedit",data)
}
