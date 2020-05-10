<template>
  <div class="chief_menu">
    <div class="mask">
        <img src="../assets/collect.png" alt="" v-if="!this.userCollectd" @click="collect(0)">
        <img src="../assets/collected.png" alt="" v-else @click="collect(1)">
       <div>
         <el-button type="warning" @click="addCar" v-if="!isaddCar">加入购物车</el-button>
         <el-button type="warning" @click="addOrder">点我下单</el-button>
       </div>
    </div>
    <img :src="this.chiefMenus.dishIcon" alt="" class="img">
    <p class="name">{{this.chiefMenus.dishName}}</p>
    <p class="intro">{{this.chiefMenus.dishDescription}}</p>
    <div class="type">
        <p>菜系风格：{{this.chiefMenus.categoryStyle}}</p>
        <p>文化类型: {{this.chiefMenus.categoryType}}</p>
    </div>
    <p class="price">1-10人 | {{this.chiefMenus.dishPrice}}元</p>
  </div>
</template>

<script>
import { collectDish, unCollectDish, getCollectDish, addCardish, getCardish } from '@/api/user'
export default {
  name: 'chiefMenu',
  props: ['chiefMenus'],
  data () {
    return {
      name: '',
      isHidden: true,
      userCollectd: false,
      customerId: '',
      isaddCar: false
    }
  },
  created () {
    this.customerId = window.localStorage.getItem('accountId')
    console.log(this.chiefMenus)
    getCollectDish(this.customerId).then(res => {
      console.log(res)
      if (res.code === 0) {
        res.data.forEach(item => {
          if (item.dishId === this.chiefMenus.dishId) {
            this.userCollectd = true
            console.log(item.dishName + '被收藏了')
          }
        })
      }
    })
    let data = {}
    data.customerId = this.customerId
    data.chefId = this.chiefMenus.chefId
    getCardish(data).then(res => {
      if (res.code === 0) {
        res.data.forEach(item => {
          if (this.chiefMenus.dishId === item.dishId) {
            this.isaddCar = true
          }
        })
      }
      data = null
    })
  },
  methods: {
    // 收藏菜品
    collect (index) {
      let data = {}
      if (index === 0) {
        data.customerId = this.customerId
        data.dishId = this.chiefMenus.dishId
        data.chefId = this.chiefMenus.chefId
        collectDish(data).then(res => {
          this.$message({
            message: res.msg,
            type: 'success',
            center: true,
            duration: 1000
          })
          this.userCollectd = !this.userCollectd
          data = null
        })
      } else {
        data.customerId = this.customerId
        data.dishId = this.chiefMenus.dishId
        unCollectDish(data).then(res => {
          this.$message({
            message: res.msg,
            type: 'success',
            center: true,
            duration: 1000
          })
          this.userCollectd = !this.userCollectd
          data = null
        })
      }
    },
    // 将菜品加入购物车
    addCar () {
      let data = {}
      data.customerId = this.customerId
      data.chefId = this.chiefMenus.chefId
      data.dishId = this.chiefMenus.dishId
      data.dishQuantity = 1
      addCardish(data).then(res => {
        if (res.code === 34) {
          this.$message({
            message: '加入购物车成功',
            type: 'success',
            center: true,
            duration: 1000
          })
          this.isaddCar = true
          this.$emit('change')
          data = null
        }
      })
    },
    addOrder () {
      console.log('下单')
      this.$router.replace({path: '/payOrder'})
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
    width:100%;
    height:120px;
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
    height: 47px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    margin: 0 auto;
    padding-top:5px;
}
.type{
  width: 100%;
  height:auto;
  margin: 10px auto;
  margin-bottom: 20px;
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
