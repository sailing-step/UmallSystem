<template>
 <div class="table-bg">
     <el-table border style="width:100%" :data="userlist">
         <el-table-column label="用户ID" prop="uid" width="320" align="center">
         </el-table-column>
         <el-table-column label="用户名" prop="username" width="180" align="center">
         </el-table-column>
          <el-table-column label="角色名称" prop="rolename" width="180" align="center">
         </el-table-column>
          <el-table-column label="状态"  width="180" align="center">
              <template slot-scope="scope">
                 <el-tag type="success" v-if="scope.row.status==1">已启用</el-tag>
                 <el-tag type="warning" v-if="scope.row.status==2">禁用</el-tag>
              </template>
         </el-table-column>
          <el-table-column label="操作"  width="180" align="center">
              <template slot-scope="scope">
                  <el-button type="primary" size="small" circle icon="el-icon-edit" @click="edit(scope.row)"></el-button>
                  <el-button type="danger" size="small" circle icon="el-icon-delete"  @click="del(scope.row.uid)"></el-button>      
              </template>
         </el-table-column>
     </el-table>
     <el-pagination
      background
      @size-change="set_size"
      @current-change="set_page"
      :current-page="page"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
 </div>
</template>

<script>
import {mapGetters, mapActions,mapMutations} from "vuex"
import {delUser} from '@/request/user'
export default {
 data(){
 return{}
 },
 computed: {
     ...mapGetters({
         userlist:"user/userlist",
         page:"user/page",
         size:"user/size",
         total:"user/total"
     })
 },
mounted() {
    if(!this.userlist.length){
            this.get_user_list();
        }
},
 methods:{
     ...mapMutations({
            SET_PAGE:"user/SET_PAGE"
        }),
     ...mapActions({
         get_user_list:"user/get_user_list",
         set_page:"user/set_page",
         set_size:"user/set_size",
     }),
     edit(val){
         this.$emit("edit",val)
     },
     async del(uid){
         this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async ()=>{
             let res = await delUser(uid)
             if(res.code==200){
                 this.$message.success(res.msg)
                //  如果本页只有一条数据 且不是第1页
                if(this.userlist.length ==1 && this.page!= 1){
                    this.SET_PAGE(this.page - 1)
                }
                this.get_user_list()
             }else {
                 this.$message.error(res.msg)
             }
                }).catch(()=>{})
     }
 },
 components:{}
}

</script>
<style scoped>
</style>