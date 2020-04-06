<template>
  <div class="user">
    <commonTop></commonTop>
    <div class="center">
      <div class="user_left">
        <div class="user_card">
          <img :src="this.avatarImg" alt class="img" />
          <p>{{this.userName}}</p>
          <p>{{this.city}} | {{this.customerJob}}</p>
          <el-button type="warning" class="btn" @click="toSearch">搜索美味</el-button>
        </div>
        <!-- 左边菜单栏 -->
        <div class="user_menu">
          <ul>
            <li @click="toActive(1)">我的消息</li>
            <li @click="toActive(2)">我的收藏</li>
            <li @click="toActive(3)">我的订单</li>
            <li @click="toActive(4)">资料与账号</li>
            <li @click="toActive(5)">联系客服</li>
          </ul>
        </div>
        <div class="advertisement">广告位</div>
      </div>
      <div class="user_right">
        <!-- 我的消息 -->
        <div class="user_message" v-if="active===1">
          <p class="message_title">全部消息</p>
          <div class="user_content">
            <ul>
              <li v-for="(item, index) in contents" :key="index">
                <div class="avatar">
                  <img :src="item.avatar" alt />
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
        <!-- 我的收藏 -->
        <div class="user_favorite" v-else-if="active===2">
          <el-tabs v-model="favorActive">
            <el-tab-pane label="美味佳肴" name="first">
              <div v-if="this.foodCollections.length!==0">
                <el-row :gutter="20">
                  <el-col :span="5" v-for="(item, index) in foodCollections" :key="index">
                    <el-card :body-style="{ padding: '0px' }">
                      <img :src="item.dishIcon" class="image"  @click="toDes(item.chefId)"/>
                      <div class="title">
                        <p>{{item.dishName}}</p>
                        <span>{{item.categoryType}}-{{item.categoryStyle}}</span>
                        <div class="descript clearfix">
                          <img
                            src="../assets/cart-plus.png"
                            alt
                            v-if="!item.cart"
                            @click="addCart(index)"
                          />
                          <img src="../assets/cart-minus.png" alt v-else @click="addCart(index)" />
                          <img
                            src="../assets/collected.png"
                            alt
                            @click="cancelColleted(item.dishId, index)"
                          />
                        </div>
                      </div>
                      <div class="userIntro">
                        <img :src="item.chefIcon" alt />
                        <span :title="item.chefName">{{item.chefName}}</span>
                        <span :title="item.nativePlace">{{item.nativePlace}}</span>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
              <div style="textAlign:center" v-else>暂时没有收藏的菜品哦</div>
            </el-tab-pane>
            <el-tab-pane label="厨师达人" name="second">
              <div v-if="this.chefCollections.length!==0">
                <el-row :gutter="20">
                  <el-col :span="5" v-for="(item, index) in chefCollections" :key="index">
                    <!-- <chiefCard :chefInfo="item"></chiefCard> -->
                    <div class="top">
                      <img
                        :src="item.chefBackground?item.chefBackground:this.background"
                        alt
                        class="bg"
                        @click="toDes(item.chefId)"
                      />
                      <div class="info">
                        <div class="avatar" @click="toDes(item.chefId)">
                          <img :src="item.chefIcon" alt />
                        </div>
                        <div class="rate">
                          <img
                            src="../assets/collected.png"
                            alt
                            @click="cancelChef(item.chefId, index)"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="content1"  @click="toDes(item.chefId)">
                      <span>{{item.chefName}}</span>
                      <span>厨师等级：{{item.chefLevel}}级</span>
                      <span>{{item.chefSlogan?item.chefSlogan:'做出最美味的食物'}}</span>
                      <!-- <span>烹饪:</span>
                      <span>{{item.chefSpeciality}}</span> -->
                      <!-- <div class="price">{{item.chefCost?item.chefCost:'120'}}$/人</div> -->
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div style="textAlign:center" v-else>暂时没有收藏的厨师哦</div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <!-- 我的订单 -->
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
        <!-- 个人设置 -->
        <div class="user_setting" v-else-if="active===4" ref="img">
          <el-tabs v-model="settingActive">
            <el-tab-pane label="个人资料" name="first">
              <div class="person_data">
                <div class="user_avatar">
                  <div class="img">
                    <img :src="this.avatarImg" alt />
                    <p class="opacity_avatar" @click="avatarVisible=true">修改头像</p>
                  </div>
                  <p class="user_name">
                    {{this.userName}}
                    <span
                      class="changeName"
                      @click="settingActive='second'"
                    >&nbsp;&nbsp;&nbsp;修改</span>
                  </p>
                </div>
                <el-dialog
                  title="上传头像"
                  :visible.sync="avatarVisible"
                  width="480px"
                  :close-on-click-modal="false"
                >
                  <div class="img_file">
                    <div class="imgContainer">
                      <img :src="this.avatarImg" alt ref="image" />
                    </div>
                    <div class="before"></div>
                  </div>
                  <div class="avatar_text">
                    <span @click="reUpload" style="cursor:pointer">重新上传</span>
                    <span @click="rotate">旋转</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    @change="handleFile"
                    style="display:none"
                    ref="file"
                  />
                  <div class="confirmBtn">
                    <el-button type="warning" @click="changeIcon">确定</el-button>
                    <el-button type="primary" @click="avatarVisible=false">取消</el-button>
                  </div>
                </el-dialog>
                <p style="margin:30px 0 0 20px">基本信息</p>
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
                            <span>{{this.phone}}</span>
                            <span style="margin:-5px 0 0 20px;color:#aaa;display:inline-block">仅自己可见</span>
                            <el-button
                              size="mini"
                              type="warning"
                              style="marginLeft:20px"
                              @click="settingActive='second'"
                            >修改</el-button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>性别</td>
                        <td>
                          <el-radio-group v-model="gender">
                            <el-radio :label="'男'">男</el-radio>
                            <el-radio :label="'女'">女</el-radio>
                          </el-radio-group>
                        </td>
                      </tr>
                      <tr>
                        <td>工作类型</td>
                        <td>
                          <el-cascader
                            v-model="customerJob"
                            :options="jobOptions"
                            @change="jobChange"
                            :placeholder="customerJob"
                          ></el-cascader>
                        </td>
                      </tr>
                      <tr>
                        <td>当前所在城市</td>
                        <td>
                          <el-cascader
                            size="middle"
                            :options="cityOptions"
                            v-model="selectedOption"
                            :placeholder="address"
                            @change="cityChange"
                          ></el-cascader>
                        </td>
                      </tr>
                      <tr>
                        <td>具体通讯地址</td>
                        <td>
                          <el-input v-model="street" style="width:540px" :placeholder="street"></el-input>
                        </td>
                      </tr>
                    </tbody>
                    <el-button type="warning" class="btn_save" size="small" @click="saveUserInfo">保存</el-button>
                  </table>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="账号安全" name="second">
              <div class="table_wrap">
                <p>
                  <span>用户名</span>
                  <span style="marginLeft:14px">{{this.userName}}</span>
                  <el-button type="warning" size="small" @click="changeName">修改</el-button>
                </p>
                <p>
                  <span>手机号码</span>
                  <span>{{this.phone}}</span>
                  <el-button type="warning" size="small" @click="changePhone">更换</el-button>
                </p>
                <p>
                  <span>登录密码</span>
                  <span>密码要求至少包含字母，符号或数字中的两项且长度超过8位，建议您经常修改密码，以保证帐号更加安全。</span>
                  <el-button type="warning" size="small" @click="changePassword">修改</el-button>
                </p>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <!-- 联系客服 -->
        <div class="user_service" v-else>
          <p>任何疑问可联系客服小姐姐</p>
          <p>联系电话：020-9548623</p>
        </div>
        <!-- 个人账号安全修改 -->
        <el-dialog
          title="账号安全"
          :visible.sync="nameVisible"
          width="700px"
          center
          custom-class="el-dialog--center"
          :close-on-click-modal="false"
          :show-close="false"
        >
          <span
            style="display:block;margin:20px auto;textAlign:center;marginTop:0"
          >{{this.content.title}}</span>
          <div>
            <el-input
              :placeholder="this.content.placeholder1"
              v-if="content.index!=1"
              v-model="oldval"
              class="elinput"
            ></el-input>
            <el-input
              :placeholder="this.content.placeholder2"
              v-model="newval"
              class="elinput"
              maxlength="10"
              show-word-limit
              v-if="content.index===1"
            ></el-input>
            <el-input
              :placeholder="this.content.placeholder2"
              v-model="newval"
              class="elinput"
              v-else
            ></el-input>
          </div>
          <div class="confirmBtn">
            <el-button type="warning" @click="changeConfirm(content.index)">确定</el-button>
            <el-button type="primary" @click="nameVisible=false">取消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <commonBottom></commonBottom>
  </div>
</template>

<script>
import {
  exJobs,
  modifyInfo,
  getUserInfo,
  modifyUserName,
  modifyUserPhone,
  modifyUserPassword,
  modifyUserIcon,
  getCollectDish,
  getCategoryType,
  getChiefInfo,
  unCollectDish,
  getCollectChef,
  unCollectChief
} from '@/api/user'
import commonTop from '@/components/commonTop'
import commonBottom from '@/components/commonBottom'
import allOrder from '@/components/allOrder'
import chiefCard from '@/components/chiefCard'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { CodeToText, regionData } from 'element-china-area-data' // 引入
// provinceAndCityData ： 省市二级数据，得到数组
// regionData: 省市区三级数据，得到对象
// CodeToText： 方法， CodeToText['130060'] 得到地区名
// TextToCode：方法, TextToCode['北京'] 得到地域码
export default {
  name: 'person',
  components: { commonTop, commonBottom, allOrder, chiefCard },
  data () {
    return {
      selectedOption: [],
      cityOptions: regionData,
      address: '',
      street: '',
      province: '',
      city: '',
      county: '',
      customerJob: '',
      gender: '男',
      userName: '',
      phone: '147****4811',
      jobOptions: [],
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
      allData: [
        {
          orderTime: '2020-04-04 21:06:09',
          orderId: '158623144865',
          foodImg: require('../assets/rose.jpg'),
          state: -1,
          money: 132.00,
          payWay: '在线支付',
          foodName: '玫瑰山药',
          address: ' 河北省秦皇岛市驻马店河口村小石街道777号',
          time: '2020-04-15 11:30:00'
        },
        {
          orderTime: '2020-04-02 18:23:15',
          orderId: '158736549821',
          foodImg: require('../assets/2.jpg'),
          state: 0,
          money: 98.00,
          payWay: '在线支付',
          foodName: '香肠披萨',
          address: ' 山西省阳泉市郊区驻马店河口村小石街道777号',
          time: '2020-04-12 19:00:00'
        },
        {
          orderTime: '2020-03-26 14:45:30',
          orderId: '158521456486',
          foodImg: require('../assets/1.jpg'),
          state: 1,
          money: 72.00,
          payWay: '在线支付',
          foodName: '卤肉饭',
          address: '广州市大学城广东外语外贸大学南苑12栋',
          time: '2020-03-27 12:00:00'
        }
        // {
        //   foodImg: require('../assets/ml.jpg'),
        //   state: 2,
        //   money: 410.0,
        //   payWay: '在线支付',
        //   foodName: '西兰花炒牛肉',
        //   address: '广州市大学城广东外语外贸大学南苑12栋',
        //   time: '2020-03-27 11:00:00'
        // }
      ],
      // 已完成
      overOrder: {
        foodImg: require('../assets/ml.jpg'),
        state: 2,
        money: 410.0,
        payWay: '在线支付',
        foodName: '西兰花炒牛肉',
        address: '广州市大学城广东外语外贸大学南苑12栋',
        time: '2020-03-27 11:00:00'
      },
      // 待支付
      payOrder: {
        foodImg: require('../assets/1.jpg'),
        state: 0,
        money: 410.0,
        payWay: '在线支付',
        foodName: '西兰花炒牛肉',
        address: '广州市大学城广东外语外贸大学南苑12栋',
        time: '2020-03-27 11:00:00'
      },
      // 待评论
      commentOrder: {
        foodImg: require('../assets/2.jpg'),
        state: 1,
        money: 220.0,
        payWay: '在线支付',
        foodName: '瘦肉炖粉条',
        address: '广州市大学城广东外语外贸大学南苑12栋',
        time: '2020-03-27 11:00:00'
      },
      // 已取消
      cancelOrder: {
        foodImg: require('../assets/3.jpg'),
        state: -1,
        money: 220.0,
        payWay: '在线支付',
        foodName: '瘦肉炖粉条',
        address: '广州市大学城广东外语外贸大学南苑12栋',
        time: '2020-03-27 11:00:00'
      },
      nameVisible: false,
      title: '',
      content: '',
      oldval: '',
      newval: '',
      avatarVisible: false,
      avatarImg: '',
      afterImg: '',
      myCropper: null,
      customerId: '',
      modifyMsg: '修改成功',
      chefCollections: [],
      foodCollections: [],
      sloganName: '做出最美味的食物',
      background: require('../assets/1.jpg')
    }
  },
  watch: {
    $route: function handle (newval, oldval) {
      // 监听路由变化
      this.active = parseInt(this.$route.query.active)
    },
    avatarVisible: function handle (newval, oldval) {
      if (newval === true) {
        setTimeout(() => {
          this.cropperInit() // 初始化
        }, 100)
      } else {
        this.myCropper.destroy() // 销毁实例
      }
    }
  },
  created () {
    let id = window.localStorage.getItem('accountId')
    this.customerId = id
    // 获取用户信息
    getUserInfo(id)
      .then(res => {
        if (res.code === 0) {
          this.city = res.data.customerCity || '广州'
          this.province = res.data.customerProvince || '广东省'
          this.address =
            res.data.customerProvince +
              res.data.customerCity +
              res.data.customerCounty || '广东省梅州市蕉岭县'
          this.customerJob = res.data.customerJob || '小吃货'
          this.gender = res.data.customerGender || '男'
          this.street = res.data.customerDetailadd || '广福镇大坝村新南街666号'
          this.userName = res.data.customerName || '小厨君'
          this.avatarImg =
            res.data.customerIcon || require('../assets/boy.png')
          if (
            res.data.customerPhone !== '' &&
            res.data.customerPhone !== null
          ) {
            this.phone = res.data.customerPhone
          }
        } else {
          this.$message({
            message: res.msg,
            type: 'warning',
            center: true,
            duration: 1500
          })
        }
      })
      .catch(res => {
        console.log(res)
      })
    getCollectDish(this.customerId).then(res => {
      if (res.code === 0) {
        res.data.forEach(item => {
          getCategoryType(item.categoryStyle).then(res => {
            item.categoryStyle = res.data.categoryName
          })
          getCategoryType(item.categoryType).then(res => {
            item.categoryType = res.data.categoryName
          })
          getChiefInfo(item.chefId).then(res => {
            item.chefName = res.data.chefName
            item.chefIcon = res.data.chefIcon
            item.nativePlace = res.data.chefProvince + res.data.chefCity
          })
          this.foodCollections.push(item)
        })
      } else {
      }
    })
    getCollectChef(this.customerId).then(res => {
      if (res.code === 0) {
        this.chefCollections = res.data
      }
    })
  },
  mounted () {
    this.active = parseInt(this.$route.query.active)
    this.jobOptions = exJobs()
  },
  methods: {
    // 地址
    cityChange (values) {
      // 带全部选项的得到的值是一个对象
      this.address = '' // 每次选择城市前需要清理掉之前的选择
      this.province = CodeToText[values[0]]
      this.city = CodeToText[values[1]]
      this.county = CodeToText[values[2]]
      for (let key in values) {
        this.address += CodeToText[values[key]]
      }
    },
    // 职业
    jobChange (value) {
      this.customerJob = value[1]
    },
    // 保存用户基本信息
    saveUserInfo () {
      let data = {}
      data.customerId = window.localStorage.getItem('accountId') || ''
      data.customerGender = this.gender || ''
      data.customerProvince = this.province || ''
      data.customerCity = this.city || ''
      data.customerCounty = this.county || ''
      data.customerDetailadd = this.street || ''
      data.customerJob = this.customerJob || ''
      modifyInfo(data).then(res => {
        if (res.code === 0) {
          console.log(res)
          this.$message({
            message: '保存成功！',
            type: 'success',
            center: true,
            duration: 1000
          })
          data = null
        } else {
          this.$message({
            message: res.msg,
            type: 'warning',
            center: true,
            duration: 1000
          })
        }
      })
    },
    // 前往搜索厨师，菜品界面
    toSearch () {
      this.$router.push({ path: '/results' }).catch(data => {})
    },
    // 跳转至个人中心选项
    toActive (index) {
      this.active = index
    },
    // 取消菜品收藏
    cancelColleted (dishId, index) {
      let data = {}
      data.customerId = this.customerId
      data.dishId = dishId
      unCollectDish(data).then(res => {
        if (res.code === 24) {
          this.$message({
            message: res.msg,
            type: 'warning',
            center: true,
            duration: 1000
          })
          this.foodCollections.splice(index, 1)
          data = null
        }
      })
    },
    // 取消厨师收藏
    cancelChef (chefId, index) {
      let data = {}
      data.customerId = this.customerId
      data.chefId = chefId
      unCollectChief(data).then(res => {
        if (res.code === 24) {
          this.$message({
            message: res.msg,
            type: 'warning',
            center: true,
            duration: 1000
          })
          this.chefCollections.splice(index, 1)
          data = null
        }
      })
    },
    // 前往厨师界面
    toDes (id) {
      this.$router.push({ path: '/des', query: {chefId: id} }).catch(data => {})
    },
    // 加入购物车
    addCart (index) {
      if (!this.foodCollections[index].cart) {
        this.foodCollections[index].cart = true
        this.$message({
          message: '添加成功',
          type: 'success',
          center: true,
          duration: 1000
        })
      } else {
        this.foodCollections[index].cart = false
        // this.$message({
        //   message: '添加成功',
        //   type: 'success',
        //   center: true,
        //   duration: 1000
        // })
      }
    },
    // 修改用户头像
    changeIcon () {
      let data = {}
      data.customerId = this.customerId
      data.customerIcon = this.afterImg
      modifyUserIcon(data).then(res => {
        if (res.code === 18) {
          this.avatarImg = res.data.customerIcon
          this.avatarVisible = false
          this.$message({
            message: this.modifyMsg,
            type: 'success',
            center: true,
            duration: 1000
          })
          data = null
        } else {
          this.$message({
            message: res.msg,
            type: 'warning',
            center: true,
            duration: 1000
          })
        }
      })
    },
    // 修改用户名
    changeName () {
      this.nameVisible = !this.nameVisible
      this.content = {
        title: '修改用户名',
        placeholder2: '请输入用户名~~',
        index: 1
      }
    },
    // 修改手机号码
    changePhone () {
      this.nameVisible = !this.nameVisible
      this.content = {
        title: '修改手机号',
        placeholder1: '请输入原手机号~~',
        placeholder2: '请输入新的手机号~~',
        index: 2
      }
    },
    // 修改密码
    changePassword () {
      this.nameVisible = !this.nameVisible
      this.content = {
        title: '修改密码',
        placeholder1: '请输入旧密码~~',
        placeholder2: '请输入新密码~~',
        index: 3
      }
    },
    // 确认修改用户名或手机号码，登录密码之一
    changeConfirm (index) {
      let data = {}
      if (index === 1 && this.newval === '') {
        this.$message({
          message: '新用户名不能为空！',
          type: 'warning',
          center: true,
          duration: 1000
        })
        data = null
      } else {
        switch (index) {
          case 1:
            data.customerName = this.newval
            data.customerId = this.customerId
            modifyUserName(data).then(res => {
              if (res.code === 18) {
                this.userName = res.data.customerName
                this.$message({
                  message: this.modifyMsg,
                  type: 'success',
                  center: true,
                  duration: 1000
                })
                this.nameVisible = !this.nameVisible
                this.oldval = this.newval = ''
              } else {
                this.$message({
                  message: res.msg,
                  type: 'warning',
                  center: true,
                  duration: 1000
                })
              }
            })
            break
          case 2:
            if (this.oldval === '') {
              this.$message({
                message: '原手机号不能为空！',
                type: 'warning',
                center: true,
                duration: 1000
              })
            } else if (this.newval === '') {
              this.$message({
                message: '新手机号不能为空！',
                type: 'warning',
                center: true,
                duration: 1000
              })
            } else {
              data.customerId = this.customerId
              data.customerPhone = this.newval
              if (this.newval !== this.oldval) {
                modifyUserPhone(data)
                  .then(res => {
                    if (res.code === 18) {
                      this.phone = res.data.customerPhone
                      this.$message({
                        message: this.modifyMsg,
                        type: 'success',
                        center: true,
                        duration: 1000
                      })
                      this.nameVisible = !this.nameVisible
                      this.oldval = this.newval = ''
                    } else {
                      this.$message({
                        message: res.msg,
                        type: 'warning',
                        center: true,
                        duration: 1000
                      })
                    }
                  })
                  .catch(res => {
                    console.log(res)
                  })
              } else {
                this.$message({
                  message: '新旧手机号相同！',
                  type: 'warning',
                  center: true,
                  duration: 1000
                })
              }
            }
            break
          default:
            if (this.oldval === '') {
              this.$message({
                message: '旧密码不能为空！',
                type: 'warning',
                center: true,
                duration: 1000
              })
            } else if (this.newval === '') {
              this.$message({
                message: '新密码不能为空！',
                type: 'warning',
                center: true,
                duration: 1000
              })
            } else {
              data.customerId = this.customerId
              data.customerPassword = this.newval
              data.orginPassword = this.oldval
              modifyUserPassword(data).then(res => {
                console.log(res)
                if (res.code === 18) {
                  this.$message({
                    message: this.modifyMsg,
                    type: 'success',
                    center: true,
                    duration: 1000
                  })
                  this.nameVisible = !this.nameVisible
                  this.oldval = this.newval = ''
                } else {
                  this.$message({
                    message: res.msg,
                    type: 'warning',
                    center: true,
                    duration: 1000
                  })
                }
              })
            }
        }
      }
    },
    // cropper 初始化
    cropperInit () {
      this.myCropper = new Cropper(this.$refs.image, {
        // new Cropper 的参数是 被裁剪对象和配置参数，返沪一个cropper对象，拥有属性和方法
        viewMode: 1,
        dragMode: 'move', // 图片是否可拖动
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before', // 是否可预览，内容为预览承载容器的类名
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: true, // 是否通过鼠标滚轮控制缩放
        rotatable: true // 是否可旋转
      })
    },
    // 旋转图片
    rotate () {
      this.myCropper.rotate(90)
    },
    // 本地上传图片按钮调用
    reUpload () {
      this.$refs.file.click()
    },
    // 处理本地图片上传
    handleFile (e) {
      let $target = e.target || e.srcElement // ie下支持e.srcElement，ff支持e.target。
      let file = $target.files[0] // 有时候手机会上传多张图片，pc端只能选一张
      let reader = new FileReader()
      reader.onload = data => {
        let res = data.target || data.srcElement
        this.myCropper.replace(res.result, false) // 默认false, 适应高度，不失真 ,替换裁剪框的图片路径为本地上传的图片路径
      }
      reader.readAsDataURL(file)
    },
    getXhr (type, url, file) {
      const that = this
      /* eslint-disable */
      var reader = new FileReader();
      // var fileType = file.type
      var fileName = file.name;
      let fd = new FormData();
      reader.onload = data => {
        let res = data.target || data.srcElement;
        console.log(res);
        fd.append("file", file, fileName);
        var xhr = "";
        if (typeof XMLHttpRequest !== "undefined") {
          xhr = new XMLHttpRequest();
        } else if (typeof ActiveXObject !== "undefined") {
          if (typeof arguments.callee.activeXString !== "string") {
            let versions = [
              "MSXML2.XMLHttp.6.0",
              "MSXML2.XMLHttp.3.0",
              "MSXML2.XMLHttp"
            ]; // ie browser different vesions
            let i, len;
            for (i = 0, len = versions.length; i < len; i++) {
              try {
                new ActiveXObject(versions[i]);
                arguments.callee.activeXString = versions[i];
                break;
              } catch (ex) {
                // jump
              }
            }
          }
          xhr = new ActiveXObject(arguments.callee.activeXString);
        } else {
          throw new Error("No XHR object available.");
        }
        xhr.open(type, url, true);
        xhr.upload.addEventListener(
          "progress",
          res => {
            if (res.lengthComputable) {
              // 上传进度
              var percent = ((res.loaded / res.total) * 100).toFixed(2);
              console.log(percent);
            }
          },
          false
        );
        xhr.addEventListener("readystatechange", function() {
          var result = xhr;
          if (result.status !== 200) {
            // error
            console.log("上传失败");
            return false;
          } else if (result.readyState === 4) {
            // finished
            that.result = JSON.parse(result.responseText);
            console.log(that.result);
            that.afterImg = that.result.data.url;
            // that.avatarImg = that.result.data.url;
            console.log(that.afterImg);
            // console.log(that.avatarImg);
          }
        });
        xhr.send(fd); // 开始上传
        this.myCropper.replace(res.result, false); // 默认false, 适应高度，不失真 ,替换裁剪框的图片路径为本地上传的图片路径
      };
      reader.readAsDataURL(file);
    },
    // 处理本地图片上传
    handleFile(e) {
      let $target = e.target || e.srcElement; // ie下支持e.srcElement，ff支持e.target。
      let file = $target.files[0]; // 有时候手机会上传多张图片，pc端只能选一张
      let url = "http://193.112.183.246:8888/fwdj/utils/icon";
      this.getXhr("post", url, file);
    }
  }
};
</script>

<style scoped>
.user {
  height: auto;
  background: #f4f4f4;
  font-size: 14px;
}
.center {
  width: 1200px;
  height: 700px;
  margin-left: 150px;
  margin-top: 15px;
  text-align: left;
  /* overflow-x: hidden; */
}
.user_left {
  width: 200px;
  padding: 0 5px;
  float: left;
}
.user_left .advertisement {
  width: 200px;
  border-radius: 7px;
  margin-top: 5px;
  height: 100px;
  line-height: 100px;
  background: #fff;
  text-align: center;
}
.user_card {
  width: 200px;
  height: 250px;
  background: #fff;
  overflow: hidden;
  border-radius: 7px;
  text-align: center;
}
.user_card .img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-top: 20px;
}
.user_card p {
  margin: 5px 0;
}
.user_card p:nth-of-type(1) {
  font-size: 18px;
  margin-top: 10px;
}
.user_card p:nth-of-type(2) {
  font-size: 12px;
  color: #ccc;
}
.btn {
  font-weight: normal;
  margin-top: 20px;
  text-align: center;
  font-size: 13px;
  border: none;
  padding: 8px 30px;
  letter-spacing: 1px;
}
.user_menu {
  width: 200px;
  background: #fff;
  margin-top: 10px;
  border-radius: 7px;
  letter-spacing: 1px;
}
.user_menu ul {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.user_menu ul li {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 14px;
  margin: 0 auto;
  border-bottom: 1px solid #eee;
}
.user_menu ul li:hover {
  cursor: pointer;
  background: #ffe300;
}
.user_right {
  width: 1000px;
  height: auto;
  margin-left: 225px;
  border-radius: 5px;
  background: #fff;
  padding: 10px 0 0 20px;
  position: relative;
}
.user_right::-webkit-scrollbar {
  width: 0;
}
.user_message {
  width: 100%;
  height: 600px;
}
.user_message .message_title {
  width: 100%;
  height: 80px;
  line-height: 80px;
  font-size: 18px;
  padding-left: 25px;
}
.user_content {
  border-top: 1px solid #ccc;
  position: relative;
}
.user_content .avatar {
  float: left;
}
.user_content .avatar img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
.user_content .content {
  margin-left: 80px;
  height: 50px;
}
.user_content ul li {
  height: 70px;
  letter-spacing: 0.5px;
  border-bottom: 0.5px solid #ccc;
  padding-left: 25px;
  padding-top: 20px;
}
.user_content ul li:last-of-type {
  border-bottom: none;
}
.user_content ul li:hover {
  background: rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.user_content ul li p {
  margin-top: 6px;
}
.close {
  float: right;
  margin-top: -35px;
  margin-right: 40px;
}
.user_avatar {
  width: 100%;
  height: 150px;
  /* border: 1px solid red; */
  text-align: center;
  position: relative;
}
.user_avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  cursor: pointer;
  margin: 15px 0 5px 0;
}
.user_avatar .img {
  width: 120px;
  margin: 10px auto;
}
.user_avatar .img:hover .opacity_avatar {
  display: inline-block;
}
.opacity_avatar {
  display: none;
  background: rgba(0, 0, 0, 0.6);
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
  cursor: pointer;
}
.el-tabs__nav {
  margin-left: 20px;
}
.table_wrap {
  margin-left: 40px;
  position: relative;
  padding-bottom: 50px;
  margin-top: 10px;
  position: relative;
}
.table_wrap .el .user_table td {
  padding-top: 20px;
}
.btn_save {
  position: absolute;
  right: 120px;
  bottom: 10px;
  width: auto;
}
.table_wrap p:nth-of-type(1) {
  margin-top: 15px;
}
.table_wrap p {
  height: 60px;
}
.table_wrap p span:nth-of-type(2) {
  display: inline-block;
  width: 420px;
  padding-left: 25px;
  vertical-align: text-top;
}
.table_wrap button {
  display: inline-block;
  margin-left: 95px;
}
.user_service {
  width: 100%;
  height: 600px;
}
.user_service p {
  margin-top: 30px;
  text-align: center;
  font-size: 18px;
}
.user_favorite {
  width: 100%;
  height: 600px;
}
.user_favorite .image {
  width: 100%;
  height: 120px;
  max-height: 150px;
  object-fit: cover;
}
.user_favorite .descript img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  float: right;
}
.user_favorite .descript img:active {
  transform: scale(1.1);
}
.user_favorite .el-card {
  background: #f4f4f4;
}
.user_favorite .title {
  margin-left: 10px;
  font-size: 13px;
  color: #333;
  border-bottom: 1px solid #eee;
}
.user_favorite .title span {
  font-size: 12px;
  color: #bbb;
}
.userIntro {
  width: 100%;
  margin: 15px 0;
  margin-left: 10px;
}
.userIntro img {
  width: 35px;
  height: 35px;
  object-fit: cover;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 5px;
}
.userIntro span {
  width: 60px;
  white-space: nowrap;
  display: inline-block;
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
}
.userIntro span:nth-of-type(2) {
  font-size: 10px;
  color: #bbb;
  width: 60px;
  text-align: center;
  margin-left: 5px;
}
.user_order {
  width: 100%;
  height: 600px;
}
.user_order .order_title {
  width: 100%;
  height: 80px;
  line-height: 80px;
  font-size: 18px;
  padding-left: 25px;
}
.order_content {
  border-top: 1px solid #ccc;
  position: relative;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.changeName {
  display: none;
  position: absolute;
  color: #ffe300;
  cursor: pointer;
}
.changeName:active {
  transform: scale(1.1);
}
.user_name {
  width: 120px;
  text-align: center;
  margin: 0 auto;
}
.user_name:hover .changeName {
  display: inline-block;
}
.confirmBtn {
  text-align: center;
  margin-top: 20px;
}
.confirmBtn button {
  margin: 0 20px;
  width: 140px;
}
.elinput {
  width: 50% !important;
  margin: 15px auto;
  display: block;
}
.img_file {
  width: 400px;
  margin-left: 10px;
  display: inline-block;
  display: flex;
}
.imgContainer {
  background: url("../assets/bg.png") repeat;
}
.imgContainer img {
  width: 250px;
  height: 250px;
  object-fit: cover;
}
.before {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
  margin-left: 50px;
}
.afterCropper {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-left: 20px;
}
.avatar_text {
  display: inline-block;
  margin-left: 10px;
  margin-top: 15px;
}
.avatar_text span {
  display: inline-block;
  width: 60px;
  padding: 3px 2px;
  background: #f00;
  color: #fff;
  border-radius: 4px;
  text-align: center;
  font-size: 10px;
  margin-left: 10px;
  cursor: pointer;
}
.top {
  width: 100%;
  height: 130px;
  text-align: center;
  background: #f4f4f4;
}
.bg {
  display: inline-block;
  height: auto;
  max-width: 100%;
  vertical-align: middle;
}
.info {
  height: 30px;
  width: 100%;
  position: relative;
}
.info .rate {
  width: 50px;
  float: right;
  height: 20px;
}
.info .rate img{
  width:30px;
  height: 30px;
  object-fit: cover;
}
.info .icon {
  width: 25px;
  height: 20px;
  float: left;
  margin-left: 40px;
  margin-top: 5px;
}
.info .avatar {
  position: absolute;
  width: 100%;
  height: 30px;
  /* background-color: #fff; */
  top: -50px;
}
.info .avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.info .content {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  background: #f4f4f4;
  padding-bottom: 15px;
}
 .info.content span {
  /* display: inline-block; */
   margin-top: 10px;
  color: red;
}
.content1{
  display: flex;
  flex-direction: column;
  text-align: center;
  background: #f4f4f4;
padding-bottom: 15px;
}
.content1 span{
  display: inline-block;
  margin-top: 10px;
}
.content1 span:nth-of-type(1){
  margin-top: 20px;
}
</style>
