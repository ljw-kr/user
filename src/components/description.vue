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
              <el-button type="warning" @click="openSocket">发私信</el-button>
              <el-dialog
                :title="this.chefInfo.chefName"
                :visible.sync="boxVisible"
                width="700px"
                top="3vh"
                :close-on-click-modal="false"
              >
                <div class="box">
                  <!-- <el-input :placeholder="this.chefInfo.chefName" :readonly="true"></el-input> -->
                  <div id="messageBox">
                    <p style="fontSize:14px;textAlign:center">{{this.messageTime}}</p>
                  </div>
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="msgContent"
                    maxlength="300"
                    show-word-limit
                  ></el-input>
                  <div style="marginTop: 40px">
                    <el-button type="warning" class="btn" @click="sendMessage">发送</el-button>
                    <el-button type="primary" class="btn" @click="boxVisible=false">取消</el-button>
                  </div>
                </div>
              </el-dialog>
            </div>
          </div>
          <div
            class="desci"
          >{{this.chefInfo.chefIntroduce}}</div>
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
        <p style="position:absolute; bottom:5px;left:585px">{{this.nowCount}} / {{this.allCount}}</p>
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
              <div >
                <img :src="icon" @click="magnify(icon)" v-for="(icon, index) in item.evaluateImage" :key="index" class="comment_image">
              </div>
              <span class="name">已消费：{{item.dishName}}</span>
            </div>
          </div>
            <div class="late_img">
              <i class="el-icon-circle-close close" @click="setImg"></i>
             <img :src="this.laterImg" alt="">
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
  getChefComments,
  getUserInfo,
  getOrderDetail
} from '@/api/user'
import {formatDate2} from '@/utils/format'
export default {
  name: 'desciption',
  components: { commonTop, chiefMenu, commonBottom },
  data () {
    return {
      customer: '', // 私信中己方名字
      msgIcon: '', // 私信中己方头像
      msgIcon2: '', // 私信中厨师头像
      boxVisible: false,
      chefRate: 4.5,
      chefComments: [],
      nowCount: 0,
      allCount: 0,
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
      carCount: 0,
      laterImg: '',
      socket: null,
      messageTime: formatDate2(new Date())
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
        this.nowCount = 1
        this.allCount = this.menus.length
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
        this.msgIcon2 = res.data.chefIcon
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
    getChefComments(this.chefId).then(res => {
      if (res.code === 0) {
        res.data.forEach(item => {
          getUserInfo(item.customerId).then(res => {
            item.icon = res.data.customerIcon
            item.name = res.data.customerName
          })
          let info = {}
          info.customerId = item.customerId
          info.orderId = item.orderId
          item.dishName = ''
          getOrderDetail(info).then(result => {
            result.data.orderDetailList.forEach(ele => {
              item.dishName += ele.dishName
            })
            info = null
          })
          item.createTime = formatDate2(new Date(item.createTime * 1000))
          this.chefComments.push(item)
        })
        console.log(this.chefComments)
      }
    })
  },
  mounted () {
    getUserInfo(this.customerId).then(res => {
      if (res.code === 0) {
        this.customer = res.data.customerName
        this.msgIcon = res.data.customerIcon
      }
    })
  },
  methods: {
    // 回到首页
    backHome () {
      this.$router.push({ path: '/' })
    },
    // 打开socket
    openSocket () {
      this.boxVisible = true
      if (typeof (WebSocket) === 'undefined') {
        console.log('您的浏览器不支持WebSocket')
      } else {
        console.log('您的浏览器支持WebSocket')
        const that = this
        // 实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
        var socketUrl = 'ws://193.112.183.246:8888/fwdj/imserver/' + this.customerId
        // socketUrl = socketUrl.replace('https', 'ws').replace('http', 'ws')
        console.log(socketUrl)
        if (this.socket != null) {
          this.socket.close()
          this.socket = null
        }
        this.socket = new WebSocket(socketUrl)
        // 打开事件
        this.socket.onopen = function () {
          console.log('websocket已打开')
        }
        // 接收消息
        this.socket.onmessage = function (msg) {
          console.log(msg.data)
          if (msg.data === '连接成功') {
            that.insertMessage2('你好呀，' + that.customer)
          } else {
            let content = JSON.parse(msg.data)
            that.insertMessage2(content.msgContent)
          }
        }
      }
    },
    // 发送消息
    sendMessage () {
      if (typeof (WebSocket) === 'undefined') {
        console.log('您的浏览器不支持WebSocket')
      } else {
        console.log('您的浏览器支持WebSocket')
        if (this.msgContent === '') {
          this.$message({
            message: '不能发送空白消息',
            type: 'warning',
            center: true,
            duration: 1000
          })
        } else {
          let data = {}
          data.toUserId = this.chefId
          data.msgContent = this.msgContent
          // data.fromUserId = this.customerId
          data = JSON.stringify(data)
          console.log('已发送：' + data)
          this.socket.send(data)
          this.insertMessage1(this.msgContent)
          this.msgContent = ''
          this.$message({
            message: '消息发送成功',
            type: 'success',
            center: true,
            duration: 1000
          })
        }
      }
    },
    // 消息插入
    insertMessage1 (value) {
      let box = document.getElementById('messageBox')
      let div = document.createElement('div')
      let user = document.createElement('p')
      let img = document.createElement('img')
      div.style.clear = 'both'
      div.style.float = 'right'
      div.style.margin = '4px 0'
      user.innerText = value
      user.style.backgroundColor = '#eee'
      user.style.display = 'inline-block'
      user.style.maxWidth = '150px'
      user.style.padding = '8px 13px'
      user.style.borderRadius = '8px 6px 6px 2px'
      user.style.margin = '3px 5px'
      user.style.fontSize = '12px'
      user.style.fontFamily = 'Microsoft YaHei'
      user.style.letterSpacing = '1px'
      div.appendChild(user)
      img.src = this.msgIcon
      img.style.width = '35px'
      img.style.height = '35px'
      img.style.borderRadius = '50%'
      img.style.objectFit = 'cover'
      img.style.verticalAlign = 'top'
      div.appendChild(img)
      box.appendChild(div)
    },
    // 对方回复消息插入
    insertMessage2 (value) {
      let box = document.getElementById('messageBox')
      let div = document.createElement('div')
      let user = document.createElement('p')
      let img = document.createElement('img')
      img.src = this.msgIcon2
      img.style.width = '35px'
      img.style.height = '35px'
      img.style.borderRadius = '50%'
      img.style.objectFit = 'cover'
      img.style.verticalAlign = 'top'
      div.appendChild(img)
      div.style.clear = 'both'
      div.style.float = 'left'
      div.style.margin = '4px 0'
      user.innerText = value
      user.style.backgroundColor = '#eee'
      user.style.display = 'inline-block'
      user.style.maxWidth = '150px'
      user.style.padding = '8px 13px'
      user.style.borderRadius = '8px 6px 6px 2px'
      user.style.margin = '3px 5px'
      user.style.fontSize = '12px'
      user.style.fontFamily = 'Microsoft YaHei'
      user.style.letterSpacing = '1px'
      div.appendChild(user)
      box.appendChild(div)
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
      this.$router.push({
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
      if (this.allCount) {
        let $d = document.getElementsByClassName('container')[0]
        let left = parseInt($d.style.left) || 0
        $d.style.left = left - 200 + 'px'
        this.menus.push(this.menus[0])
        this.nowCount === 1 ? this.nowCount = this.allCount : this.nowCount--
        this.menus.splice(0, 1)
        left = parseInt($d.style.left) || 0
        $d.style.left = left + 200 + 'px'
      }
    },
    // 向右滚动
    toRight () {
      if (this.allCount) {
        let $d = document.getElementsByClassName('container')[0]
        let left = parseInt($d.style.left) || 0
        $d.style.left = left + 200 + 'px'
        this.nowCount === this.allCount ? this.nowCount = 1 : this.nowCount++
        let dd = this.menus.length - 1
        this.menus.unshift(this.menus[dd])
        this.menus.pop()
        left = parseInt($d.style.left) || 0
        $d.style.left = left - 200 + 'px'
      }
    },
    // 图片放大
    magnify (url) {
      this.laterImg = url
      document.getElementsByClassName('late_img')[0].style.display = 'block'
    },
    setImg () {
      this.laterImg = ''
      document.getElementsByClassName('late_img')[0].style.display = 'none'
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
  height: 125px;
  text-indent: 30px;
  text-align: left;
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  word-break: break-all;
  margin-right: 6%;
  overflow: hidden;
  text-overflow: ellipsis !important;
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
  position: relative;
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
  /* display: flex; */
  /* flex-direction: column; */
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 2px 0 5px 10px;
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
  /* display: inline-block; */
  color:#fff;
  text-align: left;
  width:auto;
  height:15px;
  line-height: 15px;
  padding: 3px 10px 3px 5px;
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
.comment_image{
  width: 40px;
  height: 40px;
  border-radius: 5px;
  margin-right: 8px;
  margin-bottom: 5px;
  object-fit: cover;
}
.content{
  position: relative;
}
.late_img {
  position: absolute;
  width:100%;
  height: 100%;
  top:-150px;
  left:250px;
  z-index:1000;
  display: none;
}
.late_img img {
  width:600px;
  height: 400px;
  object-fit: cover;
}
.late_img .close{
  position: absolute;
  top:-16px;
  left: 583px;
  font-size: 30px;
  cursor:pointer;
  z-index:2002
}
#messageBox{
  margin: 20px auto;
  margin-top: 5px;
  height:300px;
  overflow-y:scroll;
  text-align: left;
}
#messageBox::-webkit-scrollbar{
  width:3px
}
#messageBox{
  /*隐藏滚动条，当IE下溢出，仍然可以滚动*/
      -ms-overflow-style:none;
      /*火狐下隐藏滚动条*/
      /* overflow:-moz-scrollbars-none !important;  这个在火狐下无效 */
      scrollbar-width: none;
}
</style>
