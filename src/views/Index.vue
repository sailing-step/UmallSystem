<template>
 <div>
     <h1 class="title">后台首页</h1>
     <v-chart class="box" :options="data1"></v-chart>
      <v-chart class="box" :options="data2"></v-chart>
</div>
</template>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/bar";
import "echarts/lib/component/polar";

let data1 = {
     tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  series: [
    {
      name: "访问来源",
      type: "pie",
      label: {
        formatter: "{b}:{c}({d}%)",
      },
      emphasis: {
        label: {
          show: true,
          // fontSize: '20',
          // fontWeight: 'bold'
        },
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      data: [],
    },
  ],
}
let data2 = {
     xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        // data: [120, 200, 150, 80, 70, 110, 130],
        data:[],
        type: 'bar'
    }]
}
export default {
 data(){
 return{
     data1:data1,
     data2:{}
 }
 },
 created(){
     setTimeout(() => {
        this.data1.series[0].data = [
          { value: 335, name: '直接访问',itemStyle:{color:'#f05b72'} },
          { value: 310, name: '邮件营销', itemStyle: { color: 'orange' } },
          { value: 234, name: '联盟广告', itemStyle: { color: 'pink' } },
          { value: 135, name: '视频广告', itemStyle: { color: '#426ab3' } },
          { value: 1548, name: '搜索引擎', itemStyle: { color: '#7fb80e' } }
        ]
        data2.series[0].data = [120, 200, 150, 80, 70, 110, 130]
        this.data2 = data2
     }, 3000);
 },
 methods:{},
 components:{
      "v-chart": ECharts,
 }
}

</script>
<style scoped>
.title {
  color:#333;
  margin-bottom: 30px;
}
.box {
  width: 500px;
  height: 250px;
  display: inline-block;
  background-color: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
}
</style>