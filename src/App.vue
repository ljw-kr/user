<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding:0
}
#app {
  font-family: "PingFang SC","Lantinghei SC","Microsoft YaHei","HanHei SC","Helvetica Neue","Open Sans",Arial,"Hiragino Sans GB","微软雅黑",STHeiti,"WenQuanYi Micro Hei",SimSun,sans-serif;;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
}
li{
  list-style: none;
}
a{
  text-decoration: none;
}
button{
  color:#282828 !important;
  font-family: "PingFang SC","Lantinghei SC","Microsoft YaHei","HanHei SC","Helvetica Neue","Open Sans",Arial,"Hiragino Sans GB","微软雅黑",STHeiti,"WenQuanYi Micro Hei",SimSun,sans-serif;;
}
button:active{
  transform: scale(1.1);
}
/* 修改第三方框架的样式*/
.el-tabs__item{
  color:#aaa;
}
.el-tabs__item:hover{
  color:#282828 !important
}
.el-tabs__item.is-active{
  color:#282828 !important;
}
.el-tabs__active-bar{
  background:#282828;
}
.el-dropdown-menu__item:hover{
   background-color:#ffe300 !important;
   color:#282828 !important
}
.el-radio__input.is-checked .el-radio__inner{
  border-color:#ffe300 !important;
  background-color: #ffe300 !important;
}
.el-radio__input.is-checked+.el-radio__label{
   color:#e6a23c !important
}
.el-button--primary{
   background-color:#f4f4f4 !important;
   border:none;
   color:#282828
}
.el-button--primary:hover{
  background: #ccc !important;
}
.el-button--warning{
   background-color:#ffe300 !important;
   border:none
}
.el-button--warning:hover{
  background: #ffc526 !important;
}
.el-dropdown .el-dropdown__caret-button::before{
  background: none !important;
}
input:focus{
  border:1px solid #DCDFE6 !important;
}
.el-dialog__header{
  text-align: left !important;
  border-bottom: 1px solid #ccc
}
textarea:focus{
  border:1px solid #DCDFE6 !important;
}
.swiper-pagination-bullet-active {
    background-color: #ffe300;
}
.el-drawer__body{
  background: #090723 !important;
  color:#fff
  /* width:300px */
}
.el-message--success{
  background-color: #fdf6ec;
  border-color: #faecd8;
}
.el-message .el-icon-success{
  color:#E6A23C
}
.el-message--success .el-message__content{
  color:#E6A23C
}
</style>
