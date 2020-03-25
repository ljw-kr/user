<template>
  <div class="chief_menu">
    <div class="mask">
        <img src="../assets/collect.png" alt="" v-if="!userCollectd" @click="collect">
        <img src="../assets/collected.png" alt="" v-else @click="collect">
       <div>
         <el-button type="warning" @click="addCar">加入购物车</el-button>
         <el-button type="warning" @click="addOrder">点我下单</el-button>
       </div>
    </div>
    <img :src="this.chiefMenus.image" alt="" class="img">
    <p class="name">{{this.chiefMenus.name}}</p>
    <p class="intro">{{this.chiefMenus.note}}</p>
    <div class="type">
        <p>菜系风格：{{this.chiefMenus.types.style}}</p>
        <p>文化类型: {{this.chiefMenus.types.type}}</p>
    </div>
    <p class="price">{{this.chiefMenus.price}}</p>
  </div>
</template>

<script>
export default {
  name: 'chiefMenu',
  props: ['chiefMenus'],
  data () {
    return {
      name: '',
      isHidden: true,
      userCollectd: false
    }
  },
  methods: {
    collect (index) {
      this.userCollectd = !this.userCollectd
      console.log(this.userCollectd)
    },
    addCar () {
      console.log('加入过问u从')
    },
    addOrder () {
      console.log('加入过问u从')
    }
  }
}
</script>

<style scoped>
.chief_menu{
    width: 200px;
    height: 300px;
    box-shadow:0 0 5px rgba(0, 0, 0,0.5);
    text-align: center;
    font-size: 12px;
    color: rgba(0,0,0,.8);
    margin: 10px 0 50px 0;
}
.chief_menu:hover .mask{
  display: block;
  cursor: auto;
}
.img{
    width:auto;
    height:auto;
    max-width: 200px;
    max-height: 150px;
    object-fit: cover;
}
.name{
  font-size: 16px;
  opacity: 0.7;
  font-weight: bold;
  margin: 5px auto;
}
.intro{
    width: 100%;
    height: auto;
    word-break: break-all;
    margin: 0 auto;
}
.type{
  width: 100%;
  height:auto;
  margin: 15px auto;
  margin-bottom: 25px;
}
.mask{
   width: 200px;
   height: 300px;
   background: rgba(0,0,0,0.5);
   position: absolute;
   z-index:3;
   display: none;
}
.mask img{
  width:30px;
  height: 30px;
  position: absolute;
  top:10px;
  left:15px;
  z-index:1000
}
.mask img:hover{
  transform: scale(1.1);
}
.mask div{
  margin-top: 90px;
}
.mask button{
  width:100px;
  margin: 10px auto;
}
</style>
