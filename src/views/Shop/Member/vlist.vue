<template>
<div class="table-bg">
 <el-table
      :data="memberlist"
      style="width: 100%"
      border
      >
      <el-table-column
        prop="uid"
        label="用户UID"
        width="320"
        align="center">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        align="center">
      </el-table-column>
        <el-table-column
        prop="addtime"
        label="注册日期"
        width="180"
        align="center">
      </el-table-column>
       <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
                  <el-tag type="danger" v-if="scope.row.status==2">禁用</el-tag>
              </template>
          </el-table-column>
       <el-table-column
        label="操作" align="center">
         <template slot-scope="scope">
                <el-button type="primary" size="small" circle icon="el-icon-edit" @click="edit(scope.row)"></el-button>
            </template>
      </el-table-column>
    </el-table>
</div>
</template>

<script>
import { mapGetters,mapActions} from "vuex"
export default {
 data(){
 return{
 }
 },
 computed: {
   ...mapGetters({
     memberlist:"member/memberlist"
   })
 },
 mounted() {
   if(!this.memberlist.length){
      this.get_member_list()
   }
  
 },
 methods:{
   ...mapActions({
     get_member_list:"member/get_member_list"
   }),
   edit(val){
     this.$emit("edit",val)
   },
 },
 components:{}
}

</script>
<style scoped>
</style>