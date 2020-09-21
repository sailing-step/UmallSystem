<template>
 <el-dialog :title="info.isAdd ? '添加秒杀':'修改秒杀'" @close="cancel" :visible.sync="info.isShow" width="40%">
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="100px">

                <el-form-item label="活动名称" prop="title">
                    <el-input v-model="forminfo.title" placeholder="请输入秒杀名称"></el-input>
                </el-form-item>
               <el-form-item label="活动时间">
                   <!-- timestamp JS时间戳  仅 value-format 可用；组件绑定值为number类型	1483326245000  -->
                   <el-date-picker
                     v-model="dateValue"
                     type="datetimerange"
                     align="right"
                     unlink-panels
                     range-separator="至"
                     start-placeholder="开始日期"
                     end-placeholder="结束日期"
                     :picker-options="pickerOptions"
                     value-format="timestamp"  
                     @change="getTime"
                   ></el-date-picker>
                </el-form-item>
                <el-form-item label="一级分类" prop="first_cateid">
                    <el-select v-model="forminfo.first_cateid" @change="firstChange" placeholder="请选择">
                        <el-option v-for="item in catelist" :key="item.id" :label="item.catename" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类"  prop="second_cateid">
                    <el-select v-model="forminfo.second_cateid"  placeholder="请选择" @change="getGood">
                        <el-option v-for="item in secondlist" :key="item.id" :label="item.catename" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择商品" prop="goodsid">
                   <el-select v-model="forminfo.goodsid"  placeholder="请选择">
                        <el-option v-for="item in goodsArr" :key="item.id" :label="item.goodsname" :value="item.id"></el-option>
                    </el-select>
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
import {getGoods} from "@/request/goods"
import {editSeckill,addSeckill} from '@/request/seckill'
import {mapActions, mapGetters} from "vuex"
let defaultItem = {
    title:"",// 限时秒杀名称
    begintime:"",// 开始时间
    endtime:"", //结束时间
    first_cateid:"", //商品一级分类编号
    second_cateid:"",// 商品二级分类编号
    goodsid:"", // 商品编号
    status:1 //状态1正常2禁用
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
     secondlist:[], // 二级分类
     goodsArr:[], // 商品
     rules:{
          first_cateid:[{required:true,message:"必填项！",trigger:'blur'}],
          second_cateid:[{required:true,message:"必填项！",trigger:'blur'}],
          title:[{required:true,message:"必填项！",trigger:'blur'}],
     },
     dateValue:[],
     pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
 }
 },
 computed: {
     ...mapGetters({
         catelist:"category/catelist",
         seckilllist:"seckill/seckilllist"
     })
 },
 mounted() {
     if(!this.catelist.length){
         this.get_category_list()
     }
     if(!this.seckilllist.length){
         this.get_seckill_list()
     }
 },
 methods:{
     ...mapActions({
         get_category_list:"category/get_category_list",
         get_goods_list:"goods/get_goods_list",
         get_seckill_list:"seckill/get_seckill_list"
     }),
     firstChange(id){
         this.secondlist = []
         this.forminfo.second_cateid = ''
         this.catelist.forEach(val => {
             if(val.id == id){
                 this.secondlist = val.children
             }
         });

     },
     getTime(e){
         console.log(e) // [1600444800000, 1600531200000, __ob__: Observer]
         this.forminfo.begintime = e[0]
         this.forminfo.endtime = e[1]
     },
    async getGood(){ // 获取商品
        console.log(this.forminfo.first_cateid, this.forminfo.second_cateid);
        let res = await  getGoods({fid: this.forminfo.first_cateid,sid: this.forminfo.second_cateid})
        // console.log(res)
        this.goodsArr = res
     },
     setinfo(val){
         console.log(val)
         this.firstChange(val.first_cateid)
       val.begintime = new Date(val.begintime).getTime()
       val.endtime = new Date(val.endtime).getTime()
        this.dateValue = [val.begintime, val.endtime];
        this.getGood()
         defaultItem = {...val}
         this.forminfo = {...val}
     },
   async submit(){
        // 表单验证
        this.$refs.form.validate(async valid=>{
            if(valid){
                let res;
            if(this.info.isAdd){
                res = await addSeckill(this.forminfo);
            }else {
                console.log(this.forminfo)
                res = await editSeckill(this.forminfo)
            }
            if(res.code==200){
                this.$message.success(res.msg)
                this.info.isShow = false
                this.get_seckill_list()
                this.cancel()
            } 
         }
        })
     },
     reset(){
         if(this.info.isAdd){ // 添加时候的重置！
                this.forminfo = {...resetItem}
            }else{ // 修改时候的重置！
                this.setinfo({...defaultItem})
            }
     },
     cancel(){
          this.dateValue = []
          this.forminfo = {...resetItem }
         
     }
 },
 components:{}
}

</script>
<style scoped>

</style>