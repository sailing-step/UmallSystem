<template>
 <div class="table-bg">
     <el-table border :data="bannerlist">
         <el-table-column prop="title" label="轮播图名称"  align="center"></el-table-column>
         <el-table-column porp="img" label="图片" align="center">
             <template slot-scope="scope">
                 <img v-if="scope.row.img" style="width:80px" :src="scope.row.img | Piximg" alt="">
                 <span v-else>暂无图片</span>
             </template>
         </el-table-column> 
         <el-table-column label="状态" align="center">
            <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.status==1">已启用</el-tag>
                <el-tag type="warning" v-if="scope.row.status==2">禁用</el-tag>
            </template>
        </el-table-column>
         <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <el-button type="primary" size="small" circle icon="el-icon-edit" @click="edit(scope.row)"></el-button>
                <el-button type="danger" size="small" circle icon="el-icon-delete" @click="del(scope.row.id)"></el-button>
            </template>
        </el-table-column>
     </el-table>
 </div>
</template>

<script>
import {delBanner} from '@/request/banner'
import {mapGetters,mapActions} from 'vuex'
export default {
 data(){
 return{
    
 }
 },
 mounted() {
     if(!this.bannerlist.lengh){
            this.get_banner_list();   
     }
 },
 computed: {
     ...mapGetters({
         bannerlist:"banner/bannerlist"
     })
 },
 methods:{
     ...mapActions({
         get_banner_list:"banner/get_banner_list"
     }),
     edit(val){
         this.$emit('edit',val)
     },
     async del(id){
         this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async ()=>{
                let res = await delBanner(id);
                if(res.code==200){
                    this.$message.success(res.msg)
                    this.get_banner_list(); // 重新获取列表！
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