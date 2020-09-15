<template>
 <div>
     <el-button type="primary" @click="add">添加规格</el-button>
     <v-list @edit="edit"></v-list>
     <v-info :info=info ref="dialog"></v-info>
 </div>
</template>

<script>
import VList from './vlist'
import VInfo from './vinfo'
export default {
 data(){
 return{
     info:{
         isAdd:true,
         isShow:false
     }
 }
 },
 created(){},
 methods:{
     add(){
         this.info.isAdd = true
         this.info.isShow = true
     },
     edit(val){
         console.log(val)
         this.info.isShow = true
         this.info.isAdd = false
         this.$refs.dialog.setinfo({...val})
     }
 },
 components:{
     VList,
     VInfo
 }
}

</script>
<style scoped>
</style>