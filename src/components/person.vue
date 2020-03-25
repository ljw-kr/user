<template>
  <div class="user">
    <commonTop></commonTop>
    <div class="center">
      <div class="user_left">
        <div class="user_card">
          <img src="../assets/ml.jpg" alt="马龙" class="img">
          <p>henry666</p>
          <p>{{this.city}} | {{this.job}}</p>
          <el-button type="warning" class="btn">搜索美味</el-button>
        </div>
        <div class="user_menu">
          <ul>
            <li @click="toActive(1)">我的消息</li>
            <li @click="toActive(2)">我的收藏</li>
            <li @click="toActive(3)">我的订单</li>
            <li @click="toActive(4)">资料与账号</li>
            <li @click="toActive(5)">联系客服</li>
          </ul>
        </div>
      </div>
      <div class="user_right">
         <div class="user_message" v-if="active===1">
            <p class="message_title">全部消息</p>
            <div class="user_content">
              <ul>
                <li v-for="(item, index) in contents" :key="index">
                  <div class="avatar">
                    <img :src="item.avatar" alt="">
                  </div>
                  <div class="content">
                     <span>{{item.name}}</span>
                     &nbsp;&nbsp;与你的私信&nbsp;&nbsp;
                     <span>{{item.time}}</span>
                     <p>{{item.last_message}}</p>
                  </div>
                  <span class="el-icon-circle-close close"></span>
                </li>
              </ul>
            </div>
         </div>
         <div class="user_favorite" v-else-if="active===2">
            <el-tabs v-model="favorActive">
              <el-tab-pane label="美味佳肴" name="first">
                <el-row :gutter="20">
                  <el-col :span="5" v-for="(item, index) in 2" :key="index">
                    <el-card :body-style="{ padding: '0px' }">
                      <img src="../assets/ml.jpg" class="image">
                      <div class="title">
                        <p>西兰花炒牛肉</p>
                        <span>家常菜-味香</span>
                        <div class="descript clearfix">
                          <img src="../assets/cart-plus.png" alt="" v-if="!cart" @click="addCart(0)">
                          <img src="../assets/cart-minus.png" alt="" v-else @click="addCart(1)">
                          <img src="../assets/collected.png" alt=""  @click="cancelColleted" title="取消收藏">
                        </div>
                      </div>
                      <div class="userIntro">
                        <img src="../assets/ml.jpg" alt="">
                        <span>Eliana_6542</span>
                        <span>广东梅州</span>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="厨师达人" name="second">厨师达人</el-tab-pane>
            </el-tabs>
         </div>
         <div class="user_order" v-else-if="active===3">
           <el-tabs v-model="orderActive">
            <el-tab-pane label="全部订单" name="first">
              <div class="all_order">
                <div v-for="(item, index) in allData" :key="index">
                 <allOrder :data="item"></allOrder>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="已完成" name="second">
                <allOrder :data="overOrder"></allOrder>
            </el-tab-pane>
            <el-tab-pane label="待支付" name="third">
                <allOrder :data="payOrder"></allOrder>
            </el-tab-pane>
            <el-tab-pane label="待评价" name="four">
                <allOrder :data="commentOrder"></allOrder>
            </el-tab-pane>
          </el-tabs>
         </div>
         <div class="user_setting" v-else-if="active===4">
           <el-tabs v-model="settingActive">
            <el-tab-pane label="个人资料" name="first">
              <div class="person_data">
                <div class="user_avatar">
                  <div class="opacity_avatar hide">修改头像</div>
                  <img src="../assets/ml.jpg" alt="">
                  <p>henry666</p>
                </div>
              <p style="margin:20px 0 0 20px">基本信息</p>
              <div class="table_wrap">
                <table class="user_table">
                   <tbody>
                     <tr>
                       <td>邮箱</td>
                       <td>
                         <div>
                           <span>*********</span>
                           <span style="margin:-5px 0 0 20px;color:#aaa;display:inline-block">仅自己可见</span>
                         </div>
                        </td>
                     </tr>
                     <tr>
                       <td>手机号</td>
                       <td>
                         <div>
                           <span>147****4811</span>
                           <span style="margin:-5px 0 0 20px;color:#aaa;display:inline-block">仅自己可见</span>
                           <el-button size="mini" type="warning" style="marginLeft:20px">修改</el-button>
                         </div>
                       </td>
                     </tr>
                     <tr>
                      <td>性别</td>
                      <td>
                        <el-radio-group v-model="gender">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="0">女</el-radio>
                        </el-radio-group>
                      </td>
                     </tr>
                     <tr>
                       <td>工作类型</td>
                       <td>
                         <el-dropdown size="mini" split-button type="primary" trigger="click">
                          学生
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>白领</el-dropdown-item>
                            <el-dropdown-item>码农</el-dropdown-item>
                            <el-dropdown-item>个体户</el-dropdown-item>
                            <el-dropdown-item>退休干部</el-dropdown-item>
                            <el-dropdown-item>金主爸爸</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                       </td>
                     </tr>
                     <tr>
                       <td>当前所在城市</td>
                       <td>
                         <el-dropdown size="mini" split-button type="primary" trigger="click">
                          广州
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>梅州</el-dropdown-item>
                            <el-dropdown-item>洛杉矶</el-dropdown-item>
                            <el-dropdown-item>休斯顿</el-dropdown-item>
                            <el-dropdown-item>纽约</el-dropdown-item>
                            <el-dropdown-item>佛罗伦萨</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown></td>
                     </tr>
                     <tr>
                       <td>具体通讯地址</td>
                       <td>
                         <el-input v-model="street" style="width:540px"></el-input>
                       </td>
                     </tr>
                   </tbody>
                   <el-button type="warning" class="btn_save" size="small">保存</el-button>
                </table>
              </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="账号安全" name="second">
              <div class="table_wrap">
                <p>
                  <span>用户名</span>
                  <span style="marginLeft:14px">henry666</span>
                  <el-button type="warning" size="small">修改</el-button>
                </p>
                <p>
                  <span>手机号码</span>
                  <span>147****4811</span>
                  <el-button type="warning" size="small">更换</el-button>
                </p>
                <p>
                  <span>登录密码</span>
                  <span>密码要求至少包含字母，符号或数字中的两项且长度超过8位，建议您经常修改密码，以保证帐号更加安全。</span>
                  <el-button type="warning" size="small">修改</el-button>
                  </p>
              </div>
            </el-tab-pane>
           </el-tabs>
         </div>
         <div class="user_service" v-else>
           <p>任何疑问可联系客服小姐姐</p>
           <p>联系电话：020-9548623</p>
         </div>
      </div>
    </div>
   <commonBottom></commonBottom>
  </div>
</template>

<script>
import commonTop from '@/components/commonTop'
import commonBottom from '@/components/commonBottom'
import allOrder from '@/components/allOrder'
export default {
  name: 'person',
  components: {commonTop, commonBottom, allOrder},
  data () {
    return {
      city: '外太空',
      job: '神秘外星人',
      contents: [
        {
          avatar: require('../assets/ml.jpg'),
          name: 'lightClothing',
          time: '2019/10/24 16:26',
          last_message: '待会再跟你说'
        },
        {
          avatar: require('../assets/ml.jpg'),
          name: 'makalong',
          time: '2020/03/13 12:14',
          last_message: '想跟你再去打一次球'
        }

      ],
      active: 4,
      settingActive: 'first',
      orderActive: 'first',
      favorActive: 'first',
      gender: 1,
      street: '',
      allData: [
        {
          foodImg: require('../assets/ml.jpg'),
          state: -1,
          money: 460.00,
          payWay: '在线支付',
          foodName: '西兰花炒牛肉',
          address: '广州市大学城广东外语外贸大学南苑12栋',
          time: '2020-03-27 11:00:00'
        },
        {
          foodImg: require('../assets/2.jpg'),
          state: 0,
          money: 130.00,
          payWay: '在线支付',
          foodName: '西兰花炒牛肉',
          address: '广州市大学城广东外语外贸大学南苑12栋',
          time: '2020-03-27 11:00:00'
        },
        {
          foodImg: require('../assets/1.jpg'),
          state: 1,
          money: 190.00,
          payWay: '在线支付',
          foodName: '西兰花炒牛肉',
          address: '广州市大学城广东外语外贸大学南苑12栋',
          time: '2020-03-27 11:00:00'
        },
        {
          foodImg: require('../assets/ml.jpg'),
          state: 2,
          money: 410.00,
          payWay: '在线支付',
          foodName: '西兰花炒牛肉',
          address: '广州市大学城广东外语外贸大学南苑12栋',
          time: '2020-03-27 11:00:00'
        }
      ],
      overOrder: {
        foodImg: require('../assets/ml.jpg'),
        state: 2,
        money: 410.00,
        payWay: '在线支付',
        foodName: '西兰花炒牛肉',
        address: '广州市大学城广东外语外贸大学南苑12栋',
        time: '2020-03-27 11:00:00'
      },
      payOrder: {
        foodImg: require('../assets/1.jpg'),
        state: 0,
        money: 410.00,
        payWay: '在线支付',
        foodName: '西兰花炒牛肉',
        address: '广州市大学城广东外语外贸大学南苑12栋',
        time: '2020-03-27 11:00:00'
      },
      commentOrder: {
        foodImg: require('../assets/2.jpg'),
        state: 1,
        money: 220.00,
        payWay: '在线支付',
        foodName: '瘦肉炖粉条',
        address: '广州市大学城广东外语外贸大学南苑12栋',
        time: '2020-03-27 11:00:00'
      },
      cancelOrder: {
        foodImg: require('../assets/3.jpg'),
        state: -1,
        money: 220.00,
        payWay: '在线支付',
        foodName: '瘦肉炖粉条',
        address: '广州市大学城广东外语外贸大学南苑12栋',
        time: '2020-03-27 11:00:00'
      },
      cart: false
    }
  },
  watch: {
    $route: function handle (newval, oldval) { // 监听路由变化
      this.active = parseInt(this.$route.query.active)
    }
  },
  mounted () {
    this.active = parseInt(this.$route.query.active)
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event)
    },
    toActive (index) {
      this.$router.push({path: '/userCenter', query: {active: index}}).catch(data => {})
    },
    cancelColleted () {
      this.$message({
        message: '已取消收藏',
        type: 'success',
        center: true,
        duration: 1000
      })
    },
    addCart (index) {
      if (index === 0) {
        this.$message({
          message: '添加成功',
          type: 'success',
          center: true,
          duration: 1000
        })
      }
      this.cart = !this.cart
    }
  }
}
</script>

<style scoped>
.user{
  /* overflow-x: hidden; */
  height: auto;
  background: #f4f4f4;
  font-size: 14px;
}
.center{
  width: 1200px;
  height: 700px;
  margin-left:150px;
  margin-top: 15px;
  text-align: left;
  overflow-x: hidden;
}
.user_left{
  width: 200px;
  padding: 0 5px;
  float: left;
}
.user_card{
  width: 200px;
  height: 250px;
  background: #fff;
  overflow:hidden;
  border-radius: 7px;
  text-align: center;
}
.user_card .img{
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-top: 20px;
}
.user_card p{
  margin: 5px 0;
}
.user_card p:nth-of-type(1){
  font-size: 18px;
  margin-top: 10px;
}
.user_card p:nth-of-type(2){
  font-size: 12px;
  color:#ccc;
}
.btn{
  font-weight: normal;
  margin-top: 20px;
  text-align:center;
  font-size: 13px;
  border:none;
  padding:8px 30px;
  letter-spacing: 1px;
}
.user_menu{
  width: 200px;
  background: #fff;
  margin-top: 10px;
  border-radius: 7px;
  letter-spacing: 1px;
}
.user_menu ul{
  width: 100%;
  display: flex;
  flex-direction: column;;
}
.user_menu ul li{
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 14px;
  margin: 0 auto;
  border-bottom: 1px solid #eee;
}
.user_menu ul li:hover{
  cursor: pointer;
  background: #ffe300;
}
.user_right{
  width:1000px;
  height:auto;
  margin-left: 225px;
  border-radius: 5px;
  background: #fff;
  padding: 10px 0 0 20px;
  position: relative;
}
.user_right::-webkit-scrollbar{
  width:0
}
.user_message{
  width: 100%;
  height: 600px;
}
.user_message .message_title{
  width:100%;
  height: 80px;
  line-height: 80px;
  font-size: 18px;
  padding-left: 25px;
}
.user_content{
    border-top: 1px solid #ccc;
    position: relative;
}
.user_content .avatar{
  float:left;
}
.user_content .avatar img{
  border-radius: 50%;
  width: 50px;
  height:50px;
  vertical-align: middle;
}
.user_content .content{
  margin-left: 80px;
  height: 50px;
}
.user_content ul li{
  height: 70px;
  letter-spacing: 0.5px;
  border-bottom: 0.5px solid #ccc;
  padding-left: 25px;
    padding-top: 20px;
}
.user_content ul li:last-of-type{
  border-bottom: none;
}
.user_content ul li:hover{
  background: rgba(0,0,0,0.1);
  cursor: pointer;
}
.user_content ul li p{
  margin-top: 6px;
}
.close{
  float: right;
  margin-top: -35px;
  margin-right: 40px;
}
.user_avatar{
  width:100%;
  height: 150px;
  /* border: 1px solid red; */
  text-align: center;
  position: relative;
}
.user_avatar img{
  width: 120px;
  height: 120px;
  border-radius: 50%;
  cursor: pointer;
  margin: 15px 0 5px 0;
}
.opacity_avatar{
  background:rgba(0,0,0,0.5);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  line-height: 120px;
  text-align: center;
  color: #fff;
  position: absolute;
  left: 50%;
  margin-left: -60px;
  top: 50%;
  margin-top: -60px;
  cursor:pointer;
}
.el-tabs__nav{
  margin-left: 20px;
}
.table_wrap{
  margin-left:40px;
  position: relative;
  padding-bottom: 50px;
}
.user_table td{
  padding-top: 20px;
}
.btn_save{
  position: absolute;
  right: 120px;
  bottom: 10px;
  width: auto;
}
.table_wrap p:nth-of-type(1){
  margin-top: 15px;
}
.table_wrap p{
  height: 60px;
}
.table_wrap p span:nth-of-type(2){
   display: inline-block;
   width: 420px;
   padding-left: 25px;
   vertical-align: text-top;
}
.table_wrap button{
  display: inline-block;
  margin-left: 95px;
}
.user_service{
  width: 100%;
  height:600px
}
.user_service p{
  margin-top: 30px;
  text-align: center;
  font-size:18px;
}
.user_favorite{
  width: 100%;
  height:600px
}
.user_favorite .image {
  width:100%;
  height: auto;
  max-height: 150px;
  object-fit: cover;
}
.user_favorite .descript img{
 width: 20px;
 height: 20px;
 margin-right: 10px;
 float: right;
}
.user_favorite .descript img:active{
  transform: scale(1.1);
}
.user_favorite .el-card{
  background: #f4f4f4;
}
.user_favorite .title{
  margin-left: 10px;
  font-size: 13px;
  color:#333;
  border-bottom: 1px solid #eee;
}
.user_favorite .title span{
  font-size: 12px;
  color:#bbb
}
.userIntro{
  width: 100%;
  margin: 15px 0;
  margin-left: 10px;
}
.userIntro img{
  width: 35px;
  height:35px;
  object-fit: cover;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 5px;
}
.userIntro span{
  width:60px;
  white-space: nowrap;
  display: inline-block;
  font-size: 12px;
  text-overflow:ellipsis;
}
.userIntro span:nth-of-type(2){
  font-size: 10px;
  color:#bbb;
  width:50px;
  text-align: center;
  margin-left: 15px;
}
.user_order{
  width: 100%;
  height:600px
}
.user_order .order_title{
  width:100%;
  height: 80px;
  line-height: 80px;
  font-size: 18px;
  padding-left: 25px;
}
.order_content{
    border-top: 1px solid #ccc;
    position: relative;
}
 .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
</style>
