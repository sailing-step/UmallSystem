<template>
 <div>
     <v-list @edit="edit"></v-list>
     <v-info :info="info" ref="dialog"></v-info>
 </div>
</template>

<script>
import VList from './vlist'
import VInfo from './vinfo'
export default {
 data(){
 return{
    info:{
        isShow:false
    }
 }
 },
 created(){},
 methods:{
     edit(val){
         this.info.isShow = true
         this.$refs.dialog.setinfo(val)
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