<template>
  <div class="card">
    <div class="top">
      <img src="../assets/1.jpg" alt class="bg" />
      <div class="info">
        <img src="../assets/male.gif" alt class="icon" />
        <div class="avatar" ><img src="../assets/ml.jpg" alt /></div>
        <div class="rate">
          <el-rate
            v-model="rates"
            disabled
            text-color="#ff9900"
          ></el-rate>
        </div>
      </div>
    </div>
    <div class="content">
       <span>MaLong</span>
       <span>4级</span>
       <span>做出最特别的食物</span>
       <span>烹饪:</span>
       <span>美国,澳大利亚，英国，中国</span>
       <div class="price">40$/人</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chiefCard',
  data () {
    return {
      rates: 2.4,
      show: true
    }
  }
}
</script>

<style scoped>
.card {
  width: 250px;
  height: 400px;
  background-color: #fff;
  border-radius: 5px;
  margin:0 20px;
  margin-top: 10px;
  box-shadow:0 0 8px rgba(0, 0, 0,0.5);
}
.top {
  width: 100%;
  height: 130px;
}
.bg {
  display: inline-block;
  height: auto;
  max-width: 100%;
  vertical-align: middle;
}
.info {
  /* background-color: purple; */
  height: 30px;
  width: 100%;
  position: relative;
}
.rate {
  width: 40%;
  float: right;
  height: 20px;
}
.icon {
  width: 25px;
  height: 20px;
  float: left;
  margin-left: 40px;
  margin-top:5px;
}
.avatar {
 position: absolute;
 width:100%;
 height:30px;
 /* background-color: #fff; */
 top:-50px;
}
.avatar img{
    width: 80px;
    height:80px;
    border-radius: 50%;
}
.el-rate__item {
  width: 12px;
  height: 10px;
  transform: scale(0.8);
  margin-top:2.5px
}
.content{
  width:100%;
  display: flex;
  flex-direction: column
}
.content span{
      /* display: inline-block; */
      margin-top: 13px;
      color: red;
}
.content .price{
  width: 50%;
  background-color: orange;
  margin:0 auto;
  margin-top: 25px;
}
</style>
