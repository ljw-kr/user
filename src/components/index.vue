<template>
<div class="all">
  <div class="nav">
      <span>大厨到家</span>
      <ul>
        <li><a href="">关于我们</a></li>
        <li><a href="">常见问题</a></li>
        <li><a href="">搜索</a></li>
        <li><a href="">添加好友</a></li>
        <li><a href="">礼品卡</a></li>
        <li><a href="">加入我们</a></li>
        <li><a href="">注册</a></li>
      </ul>
  </div>
  <div class="main">
     <p class="des">私人厨师将世界带入你的盘子</p>
     <p class="note">使用大厨到家总能让您享受到家的味道</p>
     <div class="search">
      <el-select v-model="value" filterable placeholder="选择烹饪">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value2" filterable placeholder="城市" class="second" prefix-icon='el-icon-location-information'>
          <i class="el-icon-location-information" style="position:absolute;left:300px"></i>
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="block">
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="日期">
          </el-date-picker>
        </div>
        <el-button type="primary" class="btn1">找到你的厨师</el-button>
      </div>
  </div>
  <div class="bottom">
     <div class="alert">
       <p>
         <a href="">京公网安备11010502000501号</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
         <a href="">广播电视节目制作经营许可证（京）字第06990号</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
         <a href="">京ICP备11017824号 </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
         <a href="">京ICP证130164号</a>
        </p>
        <p>
          <a href="">营业执照</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <a href="">网上有害信息举报专区 </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <a href="">不良信息举报电话：010-56538658 </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <a href="">举报邮箱 jubao@zcool.com.cn </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <a href="">联系电话：010-56538600</a>
        </p>
     </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      value1: '',
      value2: '',
      options: [{
        value: '选项1',
        label: '粤菜'
      }, {
        value: '选项2',
        label: '湘菜'
      }, {
        value: '选项3',
        label: '闽菜'
      }, {
        value: '选项4',
        label: '川菜'
      }, {
        value: '选项5',
        label: '鲁菜'
      },
      {
        value: '选项5',
        label: '浙菜'
      },
      {
        value: '选项5',
        label: '苏菜'
      },
      {
        value: '选项5',
        label: '徽菜'
      }],
      options2: [
        {
          value: '选项1',
          label: '广州'
        },
        {
          value: '选项1',
          label: '北京'
        },
        {
          value: '选项1',
          label: '上海'
        },
        {
          value: '选项1',
          label: '深圳'
        },
        {
          value: '选项1',
          label: '杭州'
        }],
      value: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*::-webkit-scrollbar{
  width:0
}
.all{
   overflow: auto;
   height: auto
}
.all::-webkit-scrollbar{
  width: 0
}
.nav{
  width: 100%;
  height: 100px;
  background-color: #fff;
  margin: 0 auto;
  text-align: center;
  position: relative;
  box-shadow: 0 0 5px rgba(0,0,0,.5) inset
}
.nav span{
  width: 150px;
  height:50px;
  font-size: 32px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  letter-spacing: 1px;
  position:absolute;
  top: 50%;
  margin-top: -25px;
  left:5%;
}
.nav ul{
  display: flex;
  width: 620px;
  position: absolute;
  height: 30px;
  top: 50%;
  margin-top: -15px;
  right: 12%;
}
.nav ul li{
  flex:1;
  text-align: center;
  margin-left:2px;
  height: 30px;;
  line-height: 30px;
  font-size: 20px;
  font-weight: 600
}
.nav ul li:nth-of-type(1){
  width: 100px !important
}
.main{
  width: 100%;
  height: 700px;
  background:url('../assets/1.jpg');
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
}
.main .des{
  font-size: 45px;
  position: absolute;
  width: 400px;
  color: #fff;
  font-weight: 600;
  font-family: '微软雅黑';
  top:35%;
  left:50%;
  margin-left: -200px;
  letter-spacing: 6px;
  text-shadow: 0 0 2px #000
}
.main .note{
  font-size: 22px;
  color: rgba(255,255,255);
  position: absolute;
  width: 460px;
  top: 58%;
  left:50%;
  margin-left: -230px;
  letter-spacing: 2px;
  /* text-shadow: 0 0 0.5px #000 */

}
.main .search{
  position: absolute;
  display: flex;
  width: 900px;
  top: 70%;
  /* padding: 0 150px; */
  left:50%;
  margin-left: -450px
}
.el-input .el-input--suffix{
  font-size: 19px !important
}
.el-select .el-input .el-input__inner{
  height: 50px !important
}
.search .block{
  margin-left: 500px
}
.search .second{
  margin-left: 250px;
}
.el-select{
  position: absolute;
}
input:focus{
  outline: none
}
.el-button--primary{
  background-color: #ffc526 !important;
  border: none
}
.search .btn1{
  margin-left: 50px
}
.btn1:hover{
  transform: scale(1.05)
}
.bottom{
  width: 100%;
  height: 150px;
  background-color: gray;
  overflow: hidden
}
.bottom .alert{
  margin-top:50px
}
.alert p:nth-of-type(2){
  margin-top: 15px
}
</style>
