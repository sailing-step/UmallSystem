<template>
 <div class="table-bg">
      <el-table :data="seckilllist" border>

        <el-table-column prop="title" label="活动名称"  align="center"></el-table-column> 
        <el-table-column prop="begintime" label="开始时间"  align="center"></el-table-column> 
         <el-table-column prop="endtime" label="结束时间"  align="center"></el-table-column> 
         <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
                  <el-tag type="danger" v-if="scope.row.status==2">禁用</el-tag>
              </template>
          </el-table-column>
           <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="edit(scope.row)" circle icon="el-icon-edit"></el-button>
                    <el-button type="danger" size="small"  @click="del(scope.row.id)"  circle icon="el-icon-delete"></el-button>
                </template>
          </el-table-column>
     </el-table>
 </div>
</template>

<script>
import {delSeckill} from "@/request/seckill"
import {mapActions,mapGetters} from "vuex"
export default {
 data(){
 return{}
 },
 computed: {
     ...mapGetters({
         seckilllist:"seckill/seckilllist"
     })
 },
 mounted() {
     if(!this.seckilllist.length){
         this.get_seckill_list()
     }
 },
 methods:{
     ...mapActions({
         get_seckill_list:"seckill/get_seckill_list"
     }),
     edit(val){
         this.$emit("edit",{...val})
     },
    async del(id){
        console.log(id)
         this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async ()=>{
                let res = await delSeckill(id);
                if(res.code==200){
                    this.$message.success(res.msg)
                    this.get_seckill_list(); // 重新获取列表！
                }else{
                    this.$message.error(res.msg)
                }
            }).catch(()=>{})
     },

 },
 components:{}
}

</script>
<style scoped>
</style>