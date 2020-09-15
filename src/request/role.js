import $axios from '@/common/http'

/*======= 角色管理 =======*/

// 获取角色列表
export async function getRole(){
   let res = await $axios.get('/rolelist')
   console.log(res)
   if(res.code == 200 && res.list){
       return res.list
   } else {
       return []
   }
}

// 角色添加
export function addRole(data){
    return $axios.post('/roleadd',data)
}

// 角色修改
export function editRole(data){
    return $axios.post('/roleedit',data)
}

// 角色删除
export function delRole(id){
    return $axios.post('/roledelete',{id})
}