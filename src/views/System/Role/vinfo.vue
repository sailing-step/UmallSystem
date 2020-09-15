<template>
 <el-dialog
  :title="info.isAdd ? '添加角色':'修改角色'"
  :visible.sync="info.isShow"
  width="40%"
  @close="cancel"
 >
<!-- 表单 -->
<el-form :model="forminfo" ref="form" label-width="140px" :rules="rules">
    <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="forminfo.rolename"></el-input>
    </el-form-item>
    <el-form-item label="角色权限">
       <el-tree
         default-expand-all
         node-key="id"
         :data="menulist"
         show-checkbox
         ref="tree"
         :props="{children:'children',label:'title'}"
         :checkStrictly="checkStrictly"
       >
    </el-tree>
    </el-form-item>
    <el-form-item label="状态">
     <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="submit" >提交</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
    </el-form-item>
</el-form>
</el-dialog>
</template>

<script>
import {addRole,editRole} from '@/request/role'
import { mapGetters,mapActions } from "vuex"
let defaultItem = {
    rolename:"",
    menus:"",
    status:1  //状态 1正常 2禁用
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
     rules:{
         rolename:[{required:true,message:"必填！",trigger:'blur'}],
     },
     checkStrictly:false
 }
 },
mounted() {
   if(!this.menulist.length){
            this.get_menu_list();
        }
},
computed: {
   ...mapGetters({
            menulist:"menu/menulist"
        })
},
 methods:{
    ...mapActions({
        get_menu_list:"menu/get_menu_list",
        get_role_list:"role/get_role_list"
    }),
    setinfo(val){
        // 将权限节点，回显到树中去
        // 注意 split方法用 , 有错误，当是空字符串时，它也会返回一个空数组 [""]
        let idarr = val.menus.split(',')
        console.log(idarr)
        if(idarr[0]){
            this.checkStrictly = true
             // 等到节点渲染完成再做某个事情！ this.$nextTick(()=>{  等到vue把节点渲染完成再做某些事情！ })
            this.$nextTick(()=>{
                this.$refs.tree.setCheckedKeys(idarr)
                 this.checkStrictly = false;  // 又要父子互相关联！
            })
        }
        defaultItem = {...val}
        this.forminfo = {...val}
    },
    async submit(){
        // 获取树形控件选中的节点！
        let idarr = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
        if(idarr.length){
            this.forminfo.menus = idarr;
        }else {
            this.$message.warning('请选择权限')
            return
        }
        // 表单验证
         this.$refs.form.validate(async valid=>{
             if(valid){ // 如果验证通过
                let res;
                if(this.info.isAdd){
                    res = await addRole(this.forminfo)
                }else {
                    res = await editRole(this.forminfo)
                }
                if(res.code==200){
                    this.$message.success(res.msg)
                    this.info.isShow = false
                    this.get_role_list()
                    this.cancel()
                }else {
                     this.$message.error(res.msg)
                }
             }
         })
    },
    reset(){
         if(this.info.isAdd){ // 添加时候的重置！
                this.forminfo = {...resetItem}
                this.$refs.tree.setCheckedKeys([])
            }else{ // 修改时候的重置！
                this.setinfo({...defaultItem})
            }
    },
    cancel(){
        this.forminfo = {...resetItem}
        this.$refs.tree.setCheckedKeys([])
    }
 },
 components:{}
}

</script>
<style scoped>
</style>