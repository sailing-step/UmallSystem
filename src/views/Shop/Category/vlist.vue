<template>
  <div class="table-bg">
     <el-table border :data="catelist" row-key="id" :tree-props="{children: 'children'}">
         <el-table-column prop="id" label="ID" align="center"></el-table-column>
          <el-table-column prop="catename" label="分类名称" align="center"></el-table-column>
         <el-table-column porp="img" label="分类图片" align="center">
             <template slot-scope="scope">
                 <img v-if="scope.row.img" style="width:80px" :src="scope.row.img | Piximg" alt="">
                 <span v-else>暂无图片</span>
             </template>
         </el-table-column>
         <el-table-column label="状态">
            <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.status==1">已启用</el-tag>
                <el-tag type="warning" v-if="scope.row.status==2">禁用</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="primary" size="small" circle icon="el-icon-edit" @click="edit(scope.row)"></el-button>
                <el-button type="danger" size="small" circle icon="el-icon-delete" @click="del(scope.row.id)"></el-button>
            </template>
        </el-table-column>
     </el-table>
 </div> 

</template>

<script>
import {delCategory} from "@/request/category"
import {mapGetters, mapActions} from "vuex"
export default {
 data(){
 return{}
 },
 mounted() {
      if(!this.catelist.length){
            this.get_category_list();
        }
 },
computed: {
    ...mapGetters({
        catelist:"category/catelist"
    })
},
 methods:{
     ...mapActions({
         get_category_list:"category/get_category_list"
     }),
     edit(val){
         this.$emit('edit',{...val})
     },
     async del(id){
         this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async ()=>{
                let res = await delCategory(id);
                if(res.code==200){
                    this.$message.success(res.msg)
                    this.get_category_list(); // 重新获取列表！
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