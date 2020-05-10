<template>
  <div>
    <commonTop></commonTop>
    <div class="container">
      <div class="order_state">
        <div class="state_title">
          <img src="../assets/defaultIcon.jpg" alt class="logo" />
          <span>结算页</span>
        </div>
        <div class="steps">
          <el-steps :space="200" finish-status="success" :align-center="true">
            <el-step title="我的购物车"></el-step>
            <el-step title="填写核对订单信息" process-status="success"></el-step>
            <el-step title="成功提交订单"></el-step>
          </el-steps>
        </div>
      </div>
      <div class="content">
        <p style="paddingTop:20px;color:#666;fontSize:16px;marginLeft:5px">填写并核对订单信息</p>
        <div class="checkout">
          <div class="address_info">
            <p style="marginBottom:15px;paddingTop:5px">
              服务地址
              <el-button
                type="warning"
                class="new_address"
                size="small"
                @click="addressVisible=true"
              >+ 新增地址</el-button>
            </p>
            <el-dialog title="新增地址" :visible.sync="addressVisible" width="600px">
              <div style="marginBottom:5px">
                <span style="width:500px;display:block;">用户名</span>
                <el-input
                  placeholder="请输入您的用户名"
                  v-model="newCustomerName"
                  style="width:500px;display:inline-block;marginTop:5px"
                ></el-input>
              </div>
              <div style="marginBottom:5px">
                <span>手机号码</span>
                <el-input
                  placeholder="请输入您的手机号码"
                  v-model="newCustomerPhone"
                  style="width:500px;display:inline-block;marginTop:10px"
                  type="number"
                ></el-input>
              </div>
              <div style="marginBottom:5px">
                <span style="display:block;marginBottom:10px">所在城市</span>
                <el-cascader
                  size="middle"
                  :options="cityOptions"
                  v-model="newAddress"
                  :placeholder="this.newAddress"
                  @change="addressChange"
                  :center="true"
                ></el-cascader>
              </div>
              <div>
                <span>具体地址</span>
                <el-input
                  placeholder="请输入您的具体地址"
                  v-model="newDetailadd"
                  style="width:500px;display:inline-block;marginTop:10px"
                ></el-input>
              </div>
              <div style="marginTop: 40px" class="confirmBtn">
                <el-button type="warning" @click="addAddress">确认</el-button>
                <el-button type="primary" @click="addressVisible=false">取消</el-button>
              </div>
            </el-dialog>
            <div class="address">
              <p>
                {{this.allAddress}}
                <el-button type="warning" size="small" @click="edit(modifyIndex)" class="btn1">编辑</el-button>
                <el-button type="danger" size="small" @click="deleteAdd(modifyIndex)" class="btn2">删除</el-button>
                <span class="arrow_down"  @click="showList">更多地址 <i class="el-icon-arrow-down"></i></span>
              </p>
              <ul class="address_list">
                <li
                  v-for="(item, index) in addList"
                  :key="index"
                  @click="selectAdd(index)"
                >{{item.allName}}</li>
              </ul>
              <el-dialog title="修改地址" :visible.sync="modifyVisible" width="600px">
                <div style="marginBottom:5px">
                <span style="width:500px;display:block;">用户名</span>
                <el-input
                  :placeholder="this.modifyCustomerName"
                  v-model="modifyCustomerName"
                  style="width:500px;display:inline-block;marginTop:5px"
                ></el-input>
              </div>
              <div style="marginBottom:5px">
                <span>手机号码</span>
                <el-input
                  :placeholder="this.modifyCustomerPhone"
                  v-model="modifyCustomerPhone"
                  style="width:500px;display:inline-block;marginTop:10px"
                  type="number"
                ></el-input>
              </div>
              <div style="marginBottom:5px">
                <span style="display:block;marginBottom:10px">所在城市</span>
                <el-cascader
                  size="middle"
                  :options="cityOptions"
                  v-model="modifyAddress"
                  :placeholder="this.modifyAddress"
                  @change="changeAddress"
                  :center="true"
                ></el-cascader>
              </div>
              <div>
                <span>具体地址</span>
                <el-input
                  :placeholder="this.modifyDetailadd"
                  v-model="modifyDetailadd"
                  style="width:500px;display:inline-block;marginTop:10px"
                ></el-input>
              </div>
                <div style="marginTop: 40px" class="confirmBtn">
                  <el-button type="warning" @click="modifyOld(modifyIndex)">确认</el-button>
                  <el-button type="primary" @click="modifyVisible=false">取消</el-button>
                </div>
              </el-dialog>
            </div>
          </div>
          <div class="pay_info">
            <p>支付方式</p>
            <div class="pay_button" ref="payway">
              <el-button size="small" @click="checkWay(0)">支付宝</el-button>
              <el-button size="small" @click="checkWay(1)">微信</el-button>
              <el-button size="small" @click="checkWay(2)">银行卡</el-button>
            </div>
          </div>
          <div class="food_info">
            <p>菜品信息</p>
            <div>
              <ul class="top">
                <li>图片</li>
                <li>名称</li>
                <li>类型</li>
                <li>数量(件)</li>
                <li>实付(元)</li>
              </ul>
              <div class="dish" v-for="(item, index) in orderMenu" :key="index">
                <ul>
                  <li>
                    <img :src="item.dishIcon" alt class="img" />
                  </li>
                  <li>{{item.dishName}}</li>
                  <li>{{item.categoryType}}{{item.categoryStyle}}</li>
                  <li>{{item.dishQuantity}}</li>
                  <li style="color:red">{{item.dishPrice}}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="time">
            <p>服务时间及备注</p>
            <div class="date_time">
              <span>{{this.time}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <el-button type="warning" size="small" v-if="modifyTime" @click="modifyTime=false">修改</el-button>
              <el-date-picker
                v-model="timepick"
                @change="confirmTime"
                type="datetime"
                placeholder="选择日期时间"
                :default-time="this.time"
                :clearable="false"
                v-else
              ></el-date-picker>
            </div>
            <el-switch
              style="display: block;margin: 10px 0 10px 50px"
              v-model="value1"
              active-color="#ffe300"
              inactive-color="#ff4949"
              active-text="需要代买食材"
              inactive-text="无需代买食材"
              @change="dd"
            ></el-switch>
            <div class="remark">
              <el-input placeholder="请输入您的备注" v-model="orderRemark"></el-input>
            </div>
          </div>
          <div class="bonus">
            <p style="marginBottom:10px">使用优惠/抵用券</p>
            <el-tabs v-model="bonusActive" type="card">
              <el-tab-pane label="优惠券" name="first">
                <div class="ticket">优惠券</div>
              </el-tab-pane>
              <el-tab-pane label="抵用券" name="second">
                <div class="ticket">抵用券</div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="submit">
            <div class="text">
              <p>
                <span>共&nbsp;{{this.toatalCount}}&nbsp;件菜品, 菜品总额:</span>
                <span>{{this.oldPrice}}元</span>
              </p>
              <p>
                <span>菜单优惠：</span>
                <span>{{this.bonusMoney}}元</span>
              </p>
              <p>
                <span>应付总额：</span>
                <span style="color:#df3028;fontSize:18px">{{this.totalMoney}}元</span>
              </p>
            </div>
            <el-button class="btn" @click="toPay">提交订单</el-button>
          </div>
          <el-dialog
            title="提示"
            :visible.sync="payVisible"
            top="1vh"
            width="800px"
            center
            :close-on-click-modal="false"
            :before-close="handleClose"
          >
            <div class="imgage">
              <p>实付金额：{{this.totalMoney}}.00元</p>
              <div class="pw-box">
                <img src="../assets/qr.png" alt />
                <div class="pw-text">
                  <p>请使用微信扫一扫</p>
                  <p>扫描二维码支付</p>
                </div>
              </div>
              <div class="phone">
                <img src="../assets/phonebg.png" alt />
              </div>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
    <commonBottom></commonBottom>
  </div>
</template>

<script>
import commonTop from '@/components/commonTop'
import commonBottom from '@/components/commonBottom'
import {
  getUserInfo,
  getAllAddress,
  addAddress,
  modifyAddress,
  deleteAddress,
  submitOrder,
  payfor
} from '@/api/user'
import { formatDate2 } from '@/utils/format'
import { testPhone } from '@/utils/test'
import { CodeToText, regionData } from 'element-china-area-data' // 引入
export default {
  name: 'payLoad',
  components: { commonTop, commonBottom },
  inject: ['reload'],
  data () {
    return {
      customerId: '',
      chefId: '',
      customerName: '',
      allAddress: '',
      // 新增地址相关
      newCustomerName: '',
      newCustomerPhone: '',
      newAddress: '请选择',
      newProvince: '',
      newCity: '',
      newCounty: '',
      newDetailadd: '',
      // 修改地址相关
      modifyIndex: -1, // 编辑地址索引
      modifyCustomerName: '',
      modifyCustomerPhone: '',
      modifyAddress: '',
      modifyProvince: '',
      modifyCity: '',
      modifyCounty: '',
      modifyDetailadd: '',
      customerAddress: '',
      customerDetailadd: '',
      orderRemark: '',
      orderTime: '',
      addressVisible: false,
      modifyVisible: false,
      cityOptions: regionData,
      value1: false,
      foodStatus: 1,
      payway: '',
      addList: [],
      collapseActive: ['0'],
      bonusActive: 'first',
      cityAddress: '',
      orderMenu: [],
      toatalCount: 2,
      oldPrice: 212,
      totalMoney: 207,
      bonusMoney: -5,
      payVisible: false,
      time: formatDate2(new Date()),
      timepick: '',
      modifyTime: true
    }
  },
  created () {
    this.$route.params.data.forEach(item => {
      item.dishPrice = item.dishPrice * item.dishQuantity
      this.orderMenu.push(item)
    })
    this.customerId = this.$route.params.customerId
    this.chefInfo = this.$route.params.chef
    this.getUser()
    this.getAddress()
  },
  beforeRouteEnter (to, from, next) {
    console.log(to, from)
    if (from.path === '/') {
      window.history.go(-1)
    } else {
      next(vm => {
        // vm.$router.replace({name: to.name, params: to.params})
      })
    }
  },
  mounted () {},
  methods: {
    // 获取用户信息
    getUser () {
      getUserInfo(this.customerId).then(res => {
        if (res.code === 0) {
          let data = res.data
          this.customerName = data.customerName
          this.customerPhone = data.customerPhone
          this.customerAddress =
          data.customerProvince +
          data.customerCity +
          data.customerCounty +
          data.customerDetailadd
          this.allAddress =
          data.customerName +
          ' ' +
          this.customerAddress +
          ' ' +
          data.customerPhone
          this.cityAddress = data.customerProvince + data.customerCity
          this.customerDetailadd = data.customerDetailadd
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
    // 获取用户地址
    getAddress () {
      getAllAddress(this.customerId).then(res => {
        if (res.code === 0) {
          let tt = ' '
          res.data.forEach(item => {
            item.allName =
            item.customerName +
            tt +
            item.customerProvince +
            item.customerCity +
            item.customerCounty +
            item.customerDetailadd +
            tt +
            item.customerPhone
            this.addList.push(item)
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
    },
    // 是否购买食材
    dd (value) {
      if (value === true) {
        this.foodStatus = 0
      } else {
        this.foodStatus = 1
      }
    },
    // 支付方式
    checkWay (index) {
      this.$refs.payway.children[0].classList.remove('active')
      this.$refs.payway.children[1].classList.remove('active')
      this.$refs.payway.children[2].classList.remove('active')
      this.$refs.payway.children[index].classList.add('active')
      switch (index) {
        case 0:
          this.payway = '支付宝'
          break
        case 1:
          this.payway = '微信'
          break
        default:
          this.payway = '银行卡'
          break
      }
    },
    // 选择服务地址
    selectAdd (index) {
      document.getElementsByClassName('btn1')[0].style.display = 'inline-block'
      document.getElementsByClassName('btn2')[0].style.display = 'inline-block'
      this.modifyIndex = index
      this.allAddress = this.addList[index].allName
      document.getElementsByClassName('address_list')[0].style.display = 'none'
    },
    // 展开地址列表
    showList () {
      document.getElementsByClassName('address_list')[0].style.display ===
      'none'
        ? (document.getElementsByClassName('address_list')[0].style.display =
            'block')
        : (document.getElementsByClassName('address_list')[0].style.display =
            'none')
    },
    // 新增地址变化
    addressChange (values) {
      // 带全部选项的得到的值是一个对象
      this.newAddress = '' // 每次选择城市前需要清理掉之前的选择
      this.newProvince = CodeToText[values[0]]
      this.newCity = CodeToText[values[1]]
      this.newCounty = CodeToText[values[2]]
      for (let key in values) {
        this.newAddress += CodeToText[values[key]]
      }
    },
    // 新增地址
    addAddress () {
      if (!this.newCustomerName) {
        this.$message({
          message: '请输入用户名',
          type: 'warning',
          center: true,
          duration: 1000
        })
      } else if (!this.newCustomerPhone) {
        this.$message({
          message: '请输入手机号码',
          type: 'warning',
          center: true,
          duration: 1000
        })
      } else if (!testPhone(this.newCustomerPhone)) {
        this.$message({
          message: '手机号码无效',
          type: 'warning',
          center: true,
          duration: 1000
        })
      } else if (!this.newAddress) {
        this.$message({
          message: '请选择城市',
          type: 'warning',
          center: true,
          duration: 1000
        })
      } else if (!this.newDetailadd) {
        this.$message({
          message: '请填写具体地址',
          type: 'warning',
          center: true,
          duration: 1000
        })
      } else {
        let data = {}
        data.customerId = this.customerId
        data.customerName = this.newCustomerName
        data.customerPhone = this.newCustomerPhone
        data.customerProvince = this.newProvince
        data.customerCity = this.newCity
        data.customerCounty = this.newCounty
        data.customerDetailadd = this.newDetailadd
        addAddress(data).then(res => {
          if (res.code === 27) {
            this.addList = []
            this.getAddress()
            this.$message({
              message: '添加地址成功',
              type: 'success',
              center: true,
              duration: 1000
            })
            this.addressVisible = false
            this.newProvince = this.newCity = this.newCounty = this.newDetailadd =
            ''
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
    },
    // 修改地址变化
    changeAddress (values) {
      // 带全部选项的得到的值是一个对象
      this.modifyAddress = ''
      this.modifyProvince = CodeToText[values[0]]
      this.modifyCity = CodeToText[values[1]]
      this.modifyCounty = CodeToText[values[2]]
      for (let key in values) {
        this.modifyAddress += CodeToText[values[key]]
      }
    },
    // 点击编辑，加载对应地址
    edit (index) {
      let address = this.addList[index]
      this.modifyCustomerName = address.customerName
      this.modifyCustomerPhone = address.customerPhone
      this.modifyAddress = address.customerProvince + '/' + address.customerCity + '/' + address.customerCounty
      this.modifyDetailadd = address.customerDetailadd
      this.modifyVisible = true
    },
    // 修改地址
    modifyOld (index) {
      let add = this.addList[index]
      let data = {}
      data.addressId = add.addressId
      data.customerName = this.modifyCustomerName || add.customerName
      data.customerPhone = this.modifyCustomerPhone || add.customerPhone
      data.customerProvince = this.modifyProvince || add.customerProvince
      data.customerCity = this.modifyCity || add.customerCity
      data.customerCounty = this.modifyCounty || add.customerCounty
      data.customerDetailadd = this.modifyDetailadd || add.customerDetailadd
      modifyAddress(data).then(res => {
        if (res.code === 0) {
          this.addList = []
          this.getUser()
          this.getAddress()
          document.getElementsByClassName('btn1')[0].style.display = 'none'
          document.getElementsByClassName('btn2')[0].style.display = 'none'
          this.$message({
            message: '修改成功',
            type: 'success',
            center: true,
            duration: 1000
          })
          this.modifyVisible = false
          this.modifyProvince = this.modifyCity = this.modifyCounty = this.modifyDetailadd =
            ''
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
    // 删除地址
    deleteAdd (index) {
      let data = this.addList[index].addressId
      deleteAddress(data).then(res => {
        if (res.code === 24) {
          this.addList = []
          this.getUser()
          this.getAddress()
          document.getElementsByClassName('btn1')[0].style.display = 'none'
          document.getElementsByClassName('btn2')[0].style.display = 'none'
          this.$message({
            message: '已删除',
            type: 'success',
            center: true,
            duration: 1000
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
    },
    // 提交订单
    toPay () {
      let data = {}
      data.customerId = this.customerId
      data.customerName = this.customerName
      data.customerPhone = this.customerPhone
      data.customerAddress = this.allAddress
      data.chefId = this.chefInfo.chefId
      data.chefName = this.chefInfo.chefName
      data.orderTime = this.orderTime || new Date().getTime() / 1000
      data.orderRemark = this.orderRemark || '无'
      data.foodStatus = this.foodStatus
      submitOrder(data).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '提交订单成功',
            type: 'success',
            center: true,
            duratio: 1000
          })
          console.log(res.data.orderId)
          let redictUrl = 'http://193.112.183.246:8888/fwdj/pay/create?orderId=' + res.data.orderId + '&returUrl=https://baidu.com'
          window.location.href = redictUrl
          // payfor(res.data.orderId).then(res => {
          //   console.log(res)
          //   console.log('付款中')
          // })
        } else {
          this.$message({
            message: res.msg,
            type: 'warning',
            center: true,
            duratio: 1000
          })
        }
      })
    },
    handleClose () {
      this.$confirm(
        '您的订单还未完成支付，请尽快支付。',
        '确认要离开收银台？',
        {
          confirmButtonText: '继续支付',
          cancelButtonText: '确认离开',
          type: 'warning'
        }
      )
        .then(() => {
          // this.payVisible = true
        })
        .catch(() => {
          this.payVisible = false
          this.$message({
            type: 'info',
            message: '已放入“我的订单”'
          })
          this.$router.replace({ path: '/' })
        })
    },
    // 时间格式化
    confirmTime () {
      this.orderTime = this.timepick.getTime() / 1000
      let timePick = formatDate2(this.timepick)
      this.time = timePick
      this.modifyTime = true
    }
  }
}
</script>

<style scoped>
.container {
  width: 1200px;
  margin: 0 auto;
  /* background: #f4f4f4; */
  text-align: left;
}
p {
  font-weight: 600;
}
.content {
  background: #fff;
}
.order_state {
  width: 100%;
  height: 100px;
  background: #fff;
  border-bottom: 1px solid #ccc;
}
.state_title {
  display: inline-block;
  width: 200px;
  height: 100%;
  position: relative;
}
.state_title span {
  font-size: 20px;
  color: #ddd;
  /* width:120px; */
  height: 40px;
  text-align: center;
  line-height: 40px;
  position: absolute;
  left: 100px;
  top: 50%;
  margin-top: -20px;
  transform: skew(-20deg);
}
.logo {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-top: 10px;
  /* margin-left: 20px; */
}
.steps {
  display: inline-block;
  width: 450px;
  float: right;
  margin-top: 20px;
}
.checkout {
  background: #fff;
  /* border: 1px solid #ccc; */
  margin-top: 10px;
  padding: 7px 20px;
  padding-bottom: 30px;
}
.new_address {
  float: right;
  color: #aaa;
  font-size: 12px;
}
.address_info {
  border-bottom: 1px solid #ccc;
}
.address {
  margin-left: 40px;
  padding-bottom: 10px;
  position: relative;
}
.address:hover {
  cursor: pointer;
}
.address .el-button {
  padding: 5px 8px;
  margin-left: 15px;
}
.arrow_down {
  position: absolute;
  right: 110px;
  font-size: 12px;
}
.address_list {
  margin:0;
  margin-top: 5px;
  /* padding:0; */
  width: 90%;
  border: 1px solid #ccc;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  background: #fff;
  /* position: absolute; */
  /* bottom:-50px; */
  display: none;
}
.address_list li {
  width: 100%;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  padding-left: 5px;
}
.address_list li:hover {
  background: lightyellow;
}
.pay_info {
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
}
.el-collapse {
  width: 80%;
  margin-left: 30px;
  border-top: none !important;
}
.el-collapse:hover {
  cursor: default !important;
}
.el-collapse-item__content p {
  display: inline-block;
}
.el-collapse-item__content:hover .edit {
  display: inline-block;
}
.el-collapse-item__header:hover .edit {
  display: inline-block;
}
.edit {
  display: none;
  float: right;
}
.pay_button {
  padding: 10px;
}
.pay_button button {
  opacity: 0.8;
  margin-left: 20px;
}
.pay_button button:hover {
  outline: none;
  border-color: none !important;
}
.active {
  background: #df3028 !important;
  color: #fff !important;
  opacity: 1;
  border: none !important;
}
.food_info {
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
}
.food_info .img {
  width: 120px;
  height: 80px;
  object-fit: cover;
}
.dish {
  margin: 10px auto;
  height: 80px;
  box-shadow: 1px 1px 2px 2px #ddd;
  padding-left: 50px;
}
.dish ul {
  float: left;
  height: 80px;
  display: flex;
  width: 100%;
}
.dish ul li {
  float: left;
  width: 250px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 15px;
}
.top {
  display: flex;
  padding-left: 50px;
  background: #eee;
  height: 40px;
  margin-top: 10px;
  letter-spacing: 1px;
}
.top li {
  width: 250px;
  text-align: center;
  float: left;
  height: 40px;
  line-height: 40px;
}
.time {
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
}
.time .date_time {
  padding-top: 10px;
  padding-left: 50px !important;
}
.remark {
  width: 1110px;
  margin-left: 50px;
  padding-top: 10px;
  padding-left: 0 !important;
}
.bonus {
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
}
.ticket {
  width: 150px;
  height: 100px;
  line-height: 100px;
  color: green;
  text-align: center;
  background: #f4f4f4;
}
.submit {
  padding: 15px 0;
  height: 130px;
  background: #f4f4f4;
  position: relative;
}
.text {
  float: right;
  margin-right: 14px;
}
.text p {
  display: flex;
  width: 400px;
  font-weight: normal;
  font-size: 15px;
  /* color:#ccc */
}
.text p span {
  display: inline-block;
  width: 200px;
  text-align: right;
  margin: 2px 0;
}
.btn {
  background: #df3028;
  color: #fff !important;
  position: absolute;
  bottom: 10px;
  right: 10px;
  border: none !important;
}
.imgage {
  position: relative;
  height: 450px;
}
.imgage p {
  text-align: center;
  font-size: 22px;
}
.pw-box img {
  width: 300px;
  height: 300px;
  object-fit: cover;
  /* transform: scale(1.1); */
}
.pw-box {
  width: 300px;
  display: inline-block;
  left: 40px;
  position: absolute;
  top: 50px;
  transform: scale(1.07);
}
.pw-text p {
  margin: 0;
  font-size: 14px;
  line-height: 22px;
  color: #fff;
  font-weight: 700;
}
.pw-text {
  transform: scale(0.92);
  height: 44px;
  padding: 8px 0 8px 125px;
  /* margin-left: 20px; */
  background: #ff7674
    url(//storage.360buyimg.com/payment-assets/pc/icon/icon-red.png) 50px 8px
    no-repeat;
}
.phone {
  position: absolute;
  right: 0;
}
.confirmBtn {
  text-align: center;
  margin-top: 20px;
}
.confirmBtn button {
  margin: 0 20px;
  width: 100px;
}
.btn1,.btn2{
  display: none;
}
</style>
