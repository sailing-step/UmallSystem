<template>
  <el-dialog
      title="会员修改"
      :visible.sync="info.isShow"
      center
      @close="cancel"
      width="40%"
    >
      <el-form :model="forminfo" :rules="rules" ref="form" label-width="140px">
        <el-form-item
          label="手机号:"
          prop="phone"
        >
          <el-input v-model="forminfo.phone"></el-input>
        </el-form-item>
        <el-form-item
          label="昵称:"
          prop="nickname"
        >
          <el-input v-model="forminfo.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="forminfo.password"></el-input>
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
</template>

<script>
import { editMember} from "@/request/member"
import {mapGetters,mapActions} from "vuex"
let defaultItem = {
    uid:"",// 会员编号，必填项
    nickname:"",// 昵称
    phone:"",// 手机号
    password:"",// 密码
    status:1,//状态1正常2禁用
}
let resetItem = {...defaultItem}
export default {
    props:{
      info:{
        type:Object,
        default(){
          return {
            isShow:false
          }
        }
      }
    },
 data(){
 return{
     forminfo:{...defaultItem},
     rules: {
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" }
          // { min: 2, max: 6, message: "长度在 2 到 16 个字符", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }]
      }
     
 }
 },
 mounted() {
     console.log(this.isShow)
 },
 methods:{
   ...mapActions({
      get_member_list:"member/get_member_list"
   }),
   setinfo(val){
     console.log(val)
     defaultItem = {...val}
     this.forminfo = {...val}
   },
  async submit(){
      let res = await editMember(this.forminfo)
      if(res.code==200){
                this.$message.success(res.msg)
                this.info.isShow = false
                this.get_member_list()
            } 
   },
   reset(){
     this.forminfo = {...defaultItem}
   },
     cancel(){
       
     }
 },
 components:{}
}

</script>
<style scoped>

</style>