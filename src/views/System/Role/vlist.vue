<template>
<div class="table-bg">
 <el-table
      :data="rolelist"
      style="width: 100%"
      border
      >
      <el-table-column
        prop="id"
        label="ID"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="rolename"
        label="角色名称"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        align="center">
        <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.status==1">已启用</el-tag>
                <el-tag type="warning" v-if="scope.row.status==2">禁用</el-tag>
            </template>
      </el-table-column>
       <el-table-column
        label="操作" align="center">
         <template slot-scope="scope">
                <el-button type="primary" size="small" circle icon="el-icon-edit" @click="edit(scope.row)"></el-button>
                <el-button type="danger" size="small" circle icon="el-icon-delete" @click="del(scope.row.id)"></el-button>
            </template>
      </el-table-column>
    </el-table>
</div>
</template>

<script>
import {delRole} from '@/request/role'
import { mapGetters,mapActions} from "vuex"
export default {
 data(){
 return{
     tableData:[]
 }
 },
 computed: {
   ...mapGetters({
     rolelist:"role/rolelist"
   })
 },
 mounted() {
   this.get_role_list()
 },
 methods:{
   ...mapActions({
     get_role_list:"role/get_role_list"
   }),
   edit(val){
     this.$emit("edit",val)
   },
   async del(id){
     this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async ()=>{
                let res = await delRole(id);
                if(res.code==200){
                    this.$message.success(res.msg)
                    this.get_role_list(); // 重新获取列表！
                }else{
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