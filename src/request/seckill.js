import $axios from "@/common/http"

// 获取秒杀列表
export async function getSeckill(){
    let res = await $axios.get("/secklist")
    if(res.code==200&&res.list){
        return res.list
    }else {
        return []
    }
}

// 添加秒杀信息
export function addSeckill(data){
    return $axios.post("/seckadd",data)
}

// 修改秒杀信息
export function editSeckill(data){
    return $axios.post("/seckedit",data)
}

// 删除秒杀信息
export function delSeckill(id){
    return $axios.post("/seckdelete",{id})
}