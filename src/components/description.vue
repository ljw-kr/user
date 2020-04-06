<template>
  <div class="description">
    <commonTop></commonTop>
    <div class="des_main">
      <div class="top">
        <div class="back">
          <div class="arrow" @click="backHome">
            <i class="el-icon-arrow-left"></i>
            <span>返回</span>
          </div>
          <div class="car" @click="drawer=true">
            <img src="../assets/car.png" alt />
            <span class="count">{{this.carCount}}</span>
          </div>
          <img
            src="../assets/collect.png"
            alt
            v-if="!this.chefCollected"
            @click="chefCollect(0)"
            class="collectImg"
          />
          <img src="../assets/collected.png" alt v-else @click="chefCollect(1)" class="collectImg" />
          <el-drawer :visible.sync="drawer" :with-header="false" size="350px">
            <div v-if="this.cart.length!==0">
              <p style="margin:22.25px;fontSize:18px">购物车</p>
              <p class="edition">
                <i class="el-icon-delete"></i>
                <span @click="deleteAll">清空购物车</span>
              </p>
              <div class="mainContent" v-if="this.cart.length!==0">
                <div class="big" v-for="(item, index) in cart" :key="index">
                  <img :src="item.dishIcon" alt />
                  <div class="small">
                    <div class="text">
                      <span>{{item.dishName}}</span>
                      <span>{{item.categoryType}}-{{item.categoryStyle}}</span>
                    </div>
                    <p>
                      <span>￥{{item.dishPrice}}</span>
                      <span @click="modifyCount(-1, index, item)">-</span>
                      <span>{{item.dishQuantity}}</span>
                      <span @click="modifyCount(1, index, item)">+</span>
                    </p>
                  </div>
                  <span @click="deleteOneDish(index, item)" class="delete">删除</span>
                </div>
                <div class="bottomText">
                  <div>
                    <span>{{this.totalCount}}件商品</span>
                    <span>共计：{{this.totalMoney}}元</span>
                  </div>
                  <el-button type="warning" size="small" @click="toPay">立即结算</el-button>
                </div>
              </div>
            </div>
            <div v-else style="paddingTop:200px">
              <p>空空如也 ~</p>
            </div>
          </el-drawer>
        </div>
        <div class="person">
          <div class="intros">
            <img :src="this.chefInfo.chefIcon" alt class="left" />
            <div class="right">
              <p>{{this.chefInfo.chefName}}</p>
              <p>{{this.chefInfo.chefSlogan?this.chefInfo.chefSlogan:'一个热爱美食的普通人'}}</p>
              <el-button type="warning" @click="boxVisible=true">发私信</el-button>
              <el-dialog
                title="写私信"
                :visible.sync="boxVisible"
                width="40%"
                :close-on-click-modal="false"
              >
                <div class="box">
                  <el-input placeholder="henry666" :readonly="true"></el-input>
                  <div style="margin: 20px 0;"></div>
                  <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入内容"
                    v-model="msgContent"
                    maxlength="300"
                    show-word-limit
                  ></el-input>
                  <div style="marginTop: 40px">
                    <el-button type="warning" class="btn" @click="sendMessage">确认</el-button>
                    <el-button type="primary" class="btn" @click="boxVisible=false">取消</el-button>
                  </div>
                </div>
              </el-dialog>
            </div>
          </div>
          <div
            class="desci"
          >虽然我是一名业余的厨师，但是十分热爱厨师这门手艺，我希望用我的双手做出好吃的食物，为更多人服务。火候不到不出品，味道不正不出品，份量不够不出品，装盘不美不出品！</div>
        </div>
      </div>
      <div class="center">
        <p class="title">菜单</p>
        <ul class="scroll_ul">
          <span class="li_left" @click="toLeft">
            <i class="el-icon-arrow-left"></i>
          </span>
          <span class="li_right" @click="toRight">
            <i class="el-icon-arrow-right"></i>
          </span>
          <div style="width:100%;overflow:hidden" class="container">
            <li v-for="(item, index) in menus" :key="index">
              <chiefMenu :chiefMenus="item" @change="changeCount"></chiefMenu>
            </li>
          </div>
        </ul>
      </div>
      <div class="comment">
        <p>{{this.chefInfo.chefName}}的评论区</p>
        <hr />
        <div class="content" v-if="this.chefComments.length!==0">
          <div class="personal" v-for="(item, index) in chefComments" :key="index">
            <img :src="item.icon" alt class="cImg" />
            <div class="comment_man">
              <span class="time">{{item.createTime}}</span>
              <span>{{item.name}}</span>
              <span>
                <el-rate v-model="item.evaluateScore" disabled show-score text-color="#ff9900"></el-rate>
              </span>
              <p>{{item.evaluateContent}}</p>
              <span class="name">已消费：{{item.dishName}}</span>
            </div>
          </div>
        </div>
        <div
          style="width:100%;height:300px;lineHeight:300px;fontSize:22px;textAlign:center"
          v-else
        >暂时没有评论哦~</div>
      </div>
    </div>
    <commonBottom></commonBottom>
  </div>
</template>

<script>
import commonTop from '@/components/commonTop'
import chiefMenu from '@/components/chiefMenu'
import commonBottom from '@/components/commonBottom'
import {
  getAllDish,
  getChiefInfo,
  collectChief,
  unCollectChief,
  getCollectChef,
  getCardish,
  modifyCardish,
  deleteCardish,
  getCategoryType,
  getChefComments
} from '@/api/user'
import {formatDate2} from '@/utils/format'
export default {
  name: 'desciption',
  components: { commonTop, chiefMenu, commonBottom },
  data () {
    return {
      boxVisible: false,
      chefRate: 4.5,
      chefComments: [
        {
          name: '爱学习的居然',
          icon: require('../assets/2.jpg'),
          evaluateScore: 4.5,
          evaluateContent: '好像跟这位厨师学做菜啊！ 业余里面也有大师！',
          dishName: '玫瑰山药',
          createTime: formatDate2(new Date(1585751827 * 1000))
        },
        {
          name: '双门洞扫地僧',
          icon: require('../assets/ml.jpg'),
          evaluateScore: 5,
          evaluateContent: '味道棒极了,从来没吃过这么好吃的私房菜，真的太棒了，离下一次下单不会太远的！！！味道棒极了,从来没吃过这么好吃的私房菜，真的太棒了，离下一次下单不会太远的！！',
          dishName: '新奥尔良鸡腿',
          createTime: formatDate2(new Date(1585753253 * 1000))
        },
        {
          name: '不想长大的狗焕',
          icon: require('../assets/1.jpg'),
          evaluateScore: 4.2,
          evaluateContent: '最开始没抱多少期待，虽然那几年前就开始有这种服务了。抱着猎奇的心态下了一次单，这次的厨师大叔厨艺不错，值得点赞！',
          dishName: '香肠披萨',
          createTime: formatDate2(new Date(1585755637 * 1000))
        }
      ],
      msgContent: '',
      chefInfo: {},
      menus: [],
      chefCollected: false,
      chefId: '',
      customerId: '',
      drawer: false,
      totalCount: 0,
      totalMoney: 0,
      num: 1,
      cart: [],
      carCount: 0
    }
  },
  created () {
    this.customerId = window.localStorage.getItem('accountId')
    this.chefId = this.$route.query.chefId
    getAllDish(this.chefId).then(res => {
      if (res.code === 0) {
        res.data.forEach(item => {
          getCategoryType(item.categoryType).then(res => {
            item.categoryType = res.data.categoryName
          })
          getCategoryType(item.categoryStyle).then(res => {
            item.categoryStyle = res.data.categoryName
          })
          this.menus.push(item)
        })
      } else {
        this.$message({
          message: res.msg,
          type: 'warning',
          center: true,
          duration: 1000
        })
      }
    })
    getChiefInfo(this.chefId).then(res => {
      if (res.code === 0) {
        this.chefInfo = res.data
      } else {
        this.$message({
          message: res.msg,
          type: 'warning',
          center: true,
          duration: 1000
        })
      }
    })
    getCollectChef(this.customerId).then(res => {
      if (res.code === 0) {
        res.data.forEach(item => {
          if (item.chefId === this.chefId) {
            this.chefCollected = true
            console.log(item.chefName + '被收藏了')
          }
        })
      }
    })
    let data = {}
    data.customerId = this.customerId
    data.chefId = this.chefId
    getCardish(data).then(res => {
      if (res.code === 0) {
        res.data.forEach(item => {
          this.carCount += item.dishQuantity
          this.totalCount += item.dishQuantity
          this.totalMoney += item.dishPrice * item.dishQuantity
          getCategoryType(item.categoryStyle).then(res => {
            if (res.code === 0) {
              item.categoryStyle = res.data.categoryName
            }
          })
          getCategoryType(item.categoryType).then(res => {
            if (res.code === 0) {
              item.categoryType = res.data.categoryName
            }
          })
        })
        this.cart = res.data
      }
      data = null
    })
  },
  mounted () {
    getChefComments(this.chefId).then(res => {
      if (res.code === 0) {
        this.chefComments = res.data
      }
    })
  },
  methods: {
    // 回到首页
    backHome () {
      this.$router.push({ path: '/' })
    },
    // 发送消息
    sendMessage () {
      setTimeout(() => {
        this.$message({
          message: '消息发送成功',
          type: 'success',
          center: true,
          duration: 1000
        })
        this.boxVisible = !this.boxVisible
      }, 500)
    },
    // 收藏厨师
    chefCollect (index) {
      console.log(index)
      let data = {}
      if (index === 0) {
        data.customerid = this.customerId
        data.chefid = this.chefId
        collectChief(data).then(res => {
          console.log(res.data)
          this.$message({
            message: res.msg,
            type: 'success',
            center: true,
            duration: 1000
          })
          this.chefCollected = !this.chefCollected
        })
      } else {
        data.customerId = this.customerId
        data.chefId = this.chefId
        unCollectChief(data).then(res => {
          this.$message({
            message: res.msg,
            type: 'success',
            center: true,
            duration: 1000
          })
          this.chefCollected = !this.chefCollected
        })
      }
    },
    // 菜品添加进购物车成功, 新加入之后要重新请求接口返回最新的购物车数据
    changeCount () {
      let data = {}
      this.carCount = this.totalCount = this.totalMoney = 0
      data.customerId = this.customerId
      data.chefId = this.chefId
      getCardish(data).then(res => {
        if (res.code === 0) {
          this.cart = res.data
          this.cart.forEach(item => {
            this.carCount += item.dishQuantity
            this.totalCount += item.dishQuantity
            this.totalMoney += item.dishPrice * item.dishQuantity
          })
          console.log(this.cart)
        }
        data = null
      })
      // this.carCount++
    },
    // 已添加购物车菜品数量修改
    modifyCount (count, index, item) {
      let data = {}
      data.carId = item.carId
      switch (count) {
        case 1:
          data.dishQuantity = item.dishQuantity + 1
          console.log(item)
          if (data.dishQuantity <= item.dishStock) {
            modifyCardish(data).then(res => {
              console.log(res)
              if (res.code === 0) {
                this.cart[index].dishQuantity = res.data.DishQuantity
                console.log(this.cart[index])
                this.carCount++
                this.totalMoney += item.dishPrice
                this.totalCount++
                data = null
              }
            })
          } else {
            this.$message({
              message: '库存就这么多了哦',
              type: 'warning',
              center: true,
              duration: 1000
            })
          }
          break
        default:
          data.dishQuantity = item.dishQuantity - 1
          if (data.dishQuantity > 0) {
            modifyCardish(data).then(res => {
              if (res.code === 0) {
                this.cart[index].dishQuantity = res.data.DishQuantity
                this.carCount--
                this.totalMoney -= item.dishPrice
                this.totalCount--
                data = null
              }
            })
          } else {
          }
      }
    },
    // 删除购物车中的菜品
    deleteOneDish (index, item) {
      deleteCardish(item.carId).then(res => {
        if (res.code === 24) {
          this.$message({
            message: '已从购物车删除',
            type: 'success',
            center: true,
            duration: 1000
          })
          this.cart.splice(index, 1)
          this.totalMoney -= item.dishPrice * item.dishQuantity
          this.totalCount -= item.dishQuantity
          this.carCount -= item.dishQuantity
        }
      })
      console.log(index, item)
    },
    // 清空购物车
    deleteAll () {
      this.cart.forEach(item => {
        deleteCardish(item.carId).then(res => {
          if (res.code === 24) {
            this.carCount = 0
            this.cart = []
          } else {
            this.$message({
              message: res.msg,
              type: 'warning',
              center: true,
              duration: 1000
            })
          }
        })
      })
    },
    // 立即结算
    toPay () {
      this.$router.replace({
        name: 'payOrder',
        params: {
          data: this.cart,
          chef: this.chefInfo,
          customerId: this.customerId
        }
      })
      this.drawer = false
    },
    // 向左滚动
    toLeft () {
      let $d = document.getElementsByClassName('container')[0]
      let left = parseInt($d.style.left) || 0
      $d.style.left = left - 200 + 'px'
      this.menus.push(this.menus[0])
      this.menus.splice(0, 1)
      left = parseInt($d.style.left) || 0
      $d.style.left = left + 200 + 'px'
    },
    // 向右滚动
    toRight () {
      console.log('666')
      let $d = document.getElementsByClassName('container')[0]
      let left = parseInt($d.style.left) || 0
      $d.style.left = left + 200 + 'px'
      let dd = this.menus.length - 1
      this.menus.unshift(this.menus[dd])
      this.menus.pop()
      left = parseInt($d.style.left) || 0
      $d.style.left = left - 200 + 'px'
    }
  }
}
</script>

<style scoped>
.description {
  width: 100%;
  /* height: 800px; */
  margin: 0 auto;
  background: #f6f6f6;
}
.des_main {
  width: 1200px;
  /* height: 800px; */
  margin: 0 auto;
}
.top {
  width: 100%;
  height: 200px;
  border: 1px solid #e1e1e1;
  background: #fff;
}
.person {
  width: 100%;
  height: 150px;
  margin: 0 auto;
  margin-top: 20px;
  background: #fff;
  display: flex;
  justify-content: space-between;
}
.intros {
  width: 350px;
  height: 100%;
  display: flex;
  margin-left: 5%;
}
.desci {
  width: 300px;
  height: 100%;
  text-indent: 30px;
  text-align: left;
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  word-break: break-all;
  margin-right: 6%;
  padding-top: 10px;
}
.left {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  vertical-align: middle;
  margin-left: 0;
}
.right {
  width: 200px;
  height: 100%;
  padding-top: 5%;
}
.right p {
  font-size: bold;
  font-size: 20px;
  position: relative;
}
.right p img {
  width: 30px;
  height: 30px;
  object-fit: cover;
  position: absolute;
  top: 50%;
  margin-top: -15px;
  right: 0;
}
.right p:nth-of-type(2) {
  /* display: inline-block; */
  margin: 10px 0;
  font-size: 12px;
}
.center {
  width: 100%;
  margin: 0 auto;
  border-top: 1px solid #ccc;
  padding-top: 15px;
  background: #fff;
  clear: both;
  overflow: hidden;
}
.title {
  text-align: center;
  font-size: 18px;
  color: #000;
  opacity: 0.8;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 10px;
}
/* .swiper-slide {
  text-align: center;
  font-size: 18px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.swiper-container {
  width: 1075px !important;
  --swiper-navigation-color: black;
  text-align: center;
}
.swiper-pagination {
  top: 340px;
}
.swiper-button-prev {
  left: 0;
}
.swiper-button-next {
  right: 0;
} */
.btn {
  width: 100px;
}
.back {
  height: 40px;
  line-height: 40px;
  /* background: green; */
  color: gray;
  position: relative;
}
.back:hover {
  cursor: pointer;
}
.car {
  width: 35px;
  display: inline-block;
  position: absolute;
  cursor: pointer;
  left: 14%;
  top: 5px;
}
.arrow {
  width: 80px;
  position: absolute;
  left: 4%;
}
.collectImg {
  position: absolute;
  width: 30px;
  height: 30px;
  object-fit: cover;
  left: 18%;
  top: 4px;
}
.car img {
  width: 30px;
  height: 30px;
}
.car span {
  display: inline-block;
  width: 18px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  border-radius: 50%;
  background: red;
  color: #fff;
  font-size: 10px;
  position: absolute;
  right: -5px;
  /* top: 11px; */
}
.edition {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: rgb(66, 66, 66);
  text-align: left;
  padding-left: 10px;
  font-size: 12px;
}
.edition span {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
}
.mainContent {
  width: 100%;
  text-align: left;
  /* padding-left: 10px; */
  margin-top: 15px;
  color: #282828;
}
.mainContent .big {
  background: #f4f4f4;
  border: 1px dashed #ddd;
  width: 320px;
  margin: 0 auto;
  margin-bottom: 8px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
}
.big:hover .delete {
  display: inline-block;
}
.big img {
  width: 100px !important;
  height: 80px !important;
  object-fit: cover !important;
}
.small {
  width: 180px;
  word-break: break-all;
  display: inline-block;
  margin-left: 10px;
  height: 80px;
  font-size: 13px;
}
.small span {
  display: inline-block;
  /* width: 100%; */
  height: auto;
  margin-bottom: 5px;
}
/* .small span:nth-of-type(1){
  width:180px
} */
.small .text {
  width: 100%;
  height: 40px;
}
.small .text span {
  height: 15px;
}
.small p span {
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
  background: #ddd;
  border-radius: 2px;
}
.small p span:nth-of-type(1) {
  width: 50px;
  background: none;
  text-align: left;
}
.small p span:nth-of-type(3) {
  /* margin:0 5px; */
  border-radius: 2px;
  background: #fff;
}
.mainContent img {
  width: auto;
  height: auto;
  object-fit: cover;
  max-width: 120px;
  max-height: 80px;
  vertical-align: middle;
}
.add {
  position: absolute;
  right: 40px;
  bottom: 0;
  color: #ffc526;
  cursor: pointer;
  display: none;
  font-size: 12px;
}
.add:hover {
  transform: scale(1.1);
}
.delete {
  position: absolute;
  right: 10px;
  bottom: -2px;
  color: red;
  cursor: pointer;
  display: none;
  font-size: 11.5px;
}
.delete:hover {
  transform: scale(1.1);
}
.bottomText {
  width: 320px;
  margin: 0 auto;
  display: flex;
  margin-top: 15px;
  color: #fff;
  font-size: 12px;
  position: relative;
}
.bottomText div {
  width: 120px;
}
.bottomText div span {
  display: block;
}
.bottomText button {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 80px;
  padding: 0;
  height: 28px;
  float: right;
}
.comment {
  padding: 30px 80px 15px 80px;
  margin-top: 5px;
  background: #fff;
  text-align: left;
  color: #444;
}
.comment p {
  font-size: 25px;
  font-weight: 600;
  text-align: center;
  padding-bottom: 30px;
}
.cImg {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
.personal {
  display: flex;
  margin: 20px 0;
  position: relative;
}
.time {
  position: absolute;
  right: 10px;
}
.comment_man {
  display: flex;
  flex-direction: column;
  padding: 2px 0 0 10px;
  font-size: 14px;
}
.personal p:nth-of-type(1) {
  font-size: 13px;
  text-align: left;
  padding: 5px 0 5px 5px;
  padding-right: 200px;
}
.personal .name{
  font-size: 10px;
  background: #bbb;
  display: inline-block;
  color:#fff;
  text-align: left;
  width:120px;
  height:15px;
  line-height: 15px;
  padding: 1px 0 1px 5px;
  border-radius: 5px;
}
/* 图片轮播样式 */
.scroll_ul li {
  float: left;
  margin: 0 5px;
}
.scroll_ul {
  width: 1050px;
  height: 360px;
  /* overflow: hidden; */
  margin: 0 auto;
  position: relative;
  clear: both;
}
.li_left {
  position: absolute;
  display: block;
  width: 50px;
  height: 50px;
  line-height: 50px;
  left: -45px;
  top: 50%;
  cursor: pointer;
  margin-top: -35px;
  z-index: 1000;
}
.li_left .el-icon-arrow-left {
  font-size: 50px;
}
.li_right {
  position: absolute;
  display: block;
  width: 50px;
  height: 50px;
  line-height: 50px;
  right: -45px;
  top: 50%;
  cursor: pointer;
  margin-top: -35px;
  z-index: 1000;
}
.li_right .el-icon-arrow-right {
  font-size: 50px;
}
.container {
  width: 1000px;
  overflow: hidden !important;
  position: absolute;
  left: 0;
}
</style>
