<template>
 <div>
     <el-dialog
     :title="info.isAdd ? '添加轮播':'修改轮播'"
      :visible.sync="info.isShow"
       width="40%"
     @close="cancel"
     >
    <!-- 表单 -->
    <el-form  :model="forminfo" ref="form" :rules="rules"  label-width="140px">
        <el-form-item label="轮播图名称" prop="title"> 
               <el-input v-model="forminfo.title"  placeholder="请输入轮播图名称"></el-input>
        </el-form-item>
        <el-form-item label="轮播图图片">
            <el-upload
            action=""
            :auto-upload = "false"
            list-type="picture-card"
            :limit="1"
            :on-preview="preview"
            :on-change="change"
            :on-remove="remove"
            :file-list="filelist"
            >
              <i slot="default" class="el-icon-plus"></i>
            </el-upload>
            <el-dialog title="查看图片" :visible.sync="dialogVisible" :append-to-body="true">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>
         <el-form-item label="状态">
              <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
         </el-form-item>
          <el-form-item label="">
             <el-button type="primary" @click="submit">提交</el-button>
            <el-button type="warning" @click="reset">重置</el-button>
         </el-form-item>
    </el-form>
     </el-dialog>
 </div>
</template>

<script>
import {addBanner,editBanner} from '@/request/banner'
import { mapGetters,mapActions } from 'vuex'
let defaultItem = {
    title:"", //轮播图名称
    img:"", // 图片(文件)
    status:1, //状态1正常2禁用
}
let resetItem = {...defaultItem}
export default {
    props:{
        info:{
            type:Object,
            default(){
                return {
                    isAdd:true,
                    isShow:false
                }
            }
        }
    },
 data(){
 return{
     forminfo:{...defaultItem},
     filelist:[],
     dialogVisible:false,
     dialogImageUrl:'',
     rules:{
         title:[{required:true,message:"必填项！",trigger:'blur'}]
     }

 }
 },
computed: {
    ...mapGetters({
        bannerlist:"banner/bannerlist"
    })
},
mounted() {
    if(!this.bannerlist.length){
        this.get_banner_list()
    }
},
 methods:{
     ...mapActions({
         get_banner_list:"banner/get_banner_list"
     }),
     preview(file){
         this.dialogVisible = true
         this.dialogImageUrl = file.url
     },
     change(file,filelist){
         this.forminfo.img = file.raw
     },
     remove(file,filelist){
         this.forminfo.img = ''
     },
     setinfo(val){
         console.log(val)
         if(val.img){
             this.filelist=[
                 {name:val.title,url:this.$host + val.img}
             ]
             defaultItem ={...val}
             this.forminfo = {...val}
         }
     },
     async submit(){
        // 表单验证
        this.$refs.form.validate(async valid=>{
            if(valid){
                let res;
               // 提交FormData类型
               let fd = new FormData()
               for(let k in this.forminfo){
                fd.append(k,this.forminfo[k])
            }
            if(this.info.isAdd){
                res = await addBanner(fd);
            }else {
                res = await editBanner(fd)
            }
            if(res.code==200){
                this.$message.success(res.msg)
                this.info.isShow = false
                this.get_banner_list()
                this.cancel()
            }
            
         }
        })
       

     },
     reset(){
         if(this.info.isAdd){
             this.forminfo = {...resetItem}
         }else {
             this.setinfo({...defaultItem})
         }
     },
     cancel(){
         this.forminfo = {...resetItem}
         this.filelist = []
     }
 },
 components:{}
}

</script>
<style scoped>
</style>