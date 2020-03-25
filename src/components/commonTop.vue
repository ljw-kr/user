<template>
  <div class="nav">
      <span class="title">大厨到家</span>
      <ul>
        <li><a @click="toIndex">首页</a></li>
        <li><a @click="toAbout">关于我们</a></li>
        <li><a @click="toQuestion">常见问题</a></li>
        <li><a @click="addFriend">添加好友</a></li>
        <li><a @click="toBonus">礼品卡</a></li>
        <li><a @click="toJoin">加入我们</a></li>
        <li v-if="notLogin"><a @click="login">注册/登录</a></li>
        <li v-else>
          <el-dropdown type="primary" @command="handleCommand">
            <span class="el-dropdown-link" @click="toCenter(1)">
             {{this.personName}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-message-solid" command="1">我的消息&nbsp;<span class="msgBox">3</span></el-dropdown-item>
              <el-dropdown-item icon="el-icon-star-on" command="2">我的收藏</el-dropdown-item>
              <el-dropdown-item icon="el-icon-present" command="3">我的订单</el-dropdown-item>
              <el-dropdown-item icon="el-icon-s-custom" command="4">资料与账号</el-dropdown-item>
              <el-dropdown-item icon="el-icon-service" command="5">联系客服</el-dropdown-item>
              <el-dropdown-item icon="el-icon-s-release" command="6">退出账号</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
      <p v-if="viewChief" class="car" @click="drawer=true">
          <img src="../assets/car.png" alt="">
          <span class="count">1</span>
      </p>
      <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        :with-header="false"
        size="300px">
        <div>
          <p style="margin:20px">购物车</p>
          <p class="edition">
            <span>编辑</span>
            <el-checkbox v-model="checked" disabled>备选项</el-checkbox>
          </p>

        </div>
      </el-drawer>

     <login :visible="isLogin" @changeLogin="change" @logined="logined"></login>
  </div>
</template>

<script>
import login from '@/components/login'
import {getUserInfo, logOut} from '@/api/user'
export default {
  name: 'commonTop',
  components: {login},
  data () {
    return {
      isLogin: false,
      notLogin: true,
      personName: '个人中心',
      viewChief: true,
      drawer: false,
      checked: false
    }
  },
  mounted () {
    let customerId = window.localStorage.getItem('accountId')
    if (customerId) {
      this.notLogin = false
      getUserInfo(customerId).then(res => {
        this.personName = res.data.customerName
      })
    } else {
      this.isLogin = true
    }
  },
  methods: {
    change () {
      this.isLogin = false
    },
    logined (id) {
      this.notLogin = false
      getUserInfo(id).then(res => {
        console.log(res)
        this.personName = res.data.customerName
      })
    },
    handleCommand (command) {
      switch (command) {
        case '1': {
          this.toCenter(1)
          break
        }
        case '2': {
          this.toCenter(2)
          break
        }
        case '3': {
          this.toCenter(3)
          break
        }
        case '4': {
          this.toCenter(4)
          break
        }
        case '5': {
          this.toCenter(5)
          break
        }
        default: {
          this.userLogout()
          break
        }
      }
    },
    userLogout () {
      logOut().then(res => {
        console.log(res)
        window.localStorage.removeItem('accountId')
        window.localStorage.removeItem('accountToken')
        this.$message({
          message: '退出成功',
          type: 'success',
          center: true,
          duration: 1000
        })
        this.notLogin = true
        this.$router.push({path: '/'})
      })
    },
    toIndex () {
      this.$router.push({path: '/'}).catch(data => {})
    },
    toAbout () {
      this.$router.push({path: '/about'}).catch(data => {})
    },
    toQuestion () {
      this.$message({
        message: '暂未开放，敬请期待！',
        type: 'warning',
        center: true,
        duration: 1000
      })
    },
    addFriend () {
      this.$message({
        message: '暂未开放，敬请期待！',
        type: 'warning',
        center: true,
        duration: 1000
      })
    },
    toBonus () {
      this.$message({
        message: '暂未开放，敬请期待！',
        type: 'warning',
        center: true,
        duration: 1000
      })
    },
    toJoin () {
      this.$message({
        message: '暂未开放，敬请期待！',
        type: 'warning',
        center: true,
        duration: 1000
      })
    },
    login () {
      this.isLogin = true
    },
    toCenter (index) {
      this.$router.push({path: '/userCenter', query: {active: index}}).catch(data => {})
    }
  }
}
</script>

<style scoped>
 .nav{
  width: 100%;
  height: 65px;
  background-color: #ffe300;
  margin: 0 auto;
  text-align: center;
  position: relative;
}
.nav .title{
  width: 150px;
  height:30px;
  font-size: 32px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  letter-spacing: 1px;
  position:absolute;
  top: 50%;
  margin-top: -25px;
  left:10%;
}
.nav ul{
  /* display: flex; */
  /* position: absolute; */
  width:730px;
  height: 80px;
  /* right: 5% */
  float: right;
  margin-right:68px;
}
.nav ul li{
  padding: 0 5px;
  text-align: center;
  margin-left:2px;
  height: 65px;
  line-height: 65px;
  font-size: 18px;
  padding: 0 15px;
  float: left;
}
.nav ul li:hover{
  cursor: pointer;
  background: #000;
  color:#ffc526
}
.nav ul li:nth-last-of-type(1):hover{
  background: none;
  color:#333
}
.el-dropdown span{
  font-size: 20px;
  color:#333;
  /* font-weight: 600 */
}
.msgBox{
 display: inline-block;
 width: 20px;
 height: 20px;
 line-height: 20px;
 text-align: center;
 border-radius: 50%;
 background: #ccc;
}
.car{
  width:30px;
  height:80px;
  line-height: 80px;
  position: absolute;
  right:50px;
  cursor: pointer;
}
.car img{
  width:30px;
  height: 30px;
}
.car span{
   display: inline-block;
   width:20px;
   height: 20px;
   line-height: 20px;
   text-align: center;
   border-radius: 50%;
   background: red;
   color:#fff;
   font-size: 10px;
   position: absolute;
   right:-5px;
   top:11px
}
.edition{
  width:100%;
  height: 50px;
  line-height: 50px;
  background: rgb(66, 66, 66);
  text-align: left;
  padding-left: 20px;
}
</style>
