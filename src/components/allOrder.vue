<template>
  <div class="all">
   <p class="title"><span>2020-02-27 14:33:27&nbsp;&nbsp;&nbsp;</span> <span>订单号:&nbsp;</span><span> 110475285495</span></p>
   <div class="text_wrap">
        <img :src="this.data.foodImg" alt="" class="img">
        <div class="text">
          <p>菜品：<span>{{this.data.foodName}}</span></p>
          <p>上门地址：<span>{{this.data.address}}</span></p>
          <p>上门时间：<span>{{this.data.time}}</span></p>
        </div>
        <div class="price">
            <p>总额: {{this.data.money}}</p>
            <p>{{this.data.payWay}}</p>
        </div>
        <div class="state">
           <p>{{this.data.state===-1?'已取消':(this.data.state===0?'待支付':(this.data.state===1?'待评论':'已完成'))}}</p>
           <p>订单详情</p>
        </div>
        <div class="action">
           <el-button type="danger" class="btn">
               删除
           </el-button>
            <el-button type="warning" class="btn"  v-if="this.data.state!=0">
               再次下单
           </el-button>
            <el-button type="warning" class="btn"  v-else>
               去支付
           </el-button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'allorder',
  props: ['data'],
  data () {
    return {
      foodName: '',
      address: '',
      time: ''
    }
  }
}
</script>

<style scoped>
.all{
    width:97%;
    border: 1px solid #ddd;
    margin-bottom: 5px;
}
.title{
    color:#aaa;
    background: #f4f4f4;
    height: 35px;
    line-height: 35px;
    padding-left: 10px;
}
.text_wrap{
 padding-left: 10px;
 margin: 5px;
 display: flex;
 cursor: pointer;
}
.img{
    width:100px;
    height:80px;
    object-fit: cover;
    vertical-align: middle;
}
.text{
    display: inline-block;
    width:400px;
    height: 80px;
    margin-left: 10px;
    font-size: 13px;
}
.text p{
    margin: 5px 0
}
.price{
    width:130px;
    height: 80px;
    margin:5px 0 5px 10px;
    border-left: 1px solid #ccc;
    position: relative;
    text-align: center;
}
.price p{
    width:120px;
    text-align:center;
    margin: 0 auto;
    margin-top: 10px;
}
.price p:nth-of-type(2){
    width:90px;
    margin:0 auto;
    border-top: 1px solid #ccc;
    padding-top: 5px;
    margin-top: 5px;
}
.state {
    height: 80px;
    margin:5px 0;
    border-left: 1px solid #ccc;
    position: relative;
    text-align: center;
}
.state p{
    width:120px;
    text-align:center;
    margin:0 auto;
    margin-top: 10px;
}
.state p:nth-of-type(2){
    width:90px;
    margin:0 auto;
    border-top: 1px solid #ccc;
    padding-top: 5px;
    margin-top: 5px;
}
.action{
    width:200px;
    height: 80px;
    text-align: center;
    border-left: 1px solid #ccc;
    margin-top: 5px;
}
.btn{
    width:80px;
    padding:5px;
    display: block;
    margin:12px auto;
    font-size: 13px;
}
</style>
