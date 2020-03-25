<template>
  <div class="description">
    <commonTop></commonTop>
    <div class="des_main">
      <div class="top">
        <div class="back" @click="backHome">
          <i class="el-icon-arrow-left"></i>
          <span>返回</span>
        </div>
        <div class="person">
          <div class="intros">
            <img src="../assets/ml.jpg" alt class="left" />
            <div class="right">
              <p>Dadishi</p>
              <span>全球休闲食品</span>
              <el-button type="warning"  @click="boxVisible=true">发私信</el-button>
              <el-dialog
                title="写私信"
                :visible.sync="boxVisible"
                width="40%"
                :close-on-click-modal="false"
                :center="false">
                <div class="box">
                  <el-input placeholder="henry666" :readonly="true"></el-input>
                  <div style="margin: 20px 0;"></div>
                  <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入内容"
                    v-model="msgContent"
                    maxlength="300"
                    show-word-limit>
                  </el-input>
                  <div style="marginTop: 40px">
                    <el-button type="warning" class="btn" @click="sendMessage">确认</el-button>
                    <el-button type="primary" class="btn" @click="boxVisible=false">取消</el-button>
                  </div>
                </div>
              </el-dialog>
            </div>
          </div>
          <div class="desci">每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍</div>
        </div>
      </div>
      <div class="center">
        <p class="title">菜单</p>
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide v-for="(item, index) in menus" :key="index">
            <chiefMenu :chiefMenus="item"></chiefMenu>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
          <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
        </swiper>
      </div>
    </div>
    <commonBottom></commonBottom>
  </div>
</template>

<script>
import commonTop from '@/components/commonTop'
import chiefMenu from '@/components/chiefMenu'
import commonBottom from '@/components/commonBottom'
export default {
  name: 'desciption',
  components: {commonTop, chiefMenu, commonBottom},
  data () {
    return {
      boxVisible: false,
      msgContent: '',
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 0,
        effect: 'coverflow',
        centeredSlides: true,
        direction: 'horizontal',
        paginationClickable: true,
        autoplayDisableOnInteraction: false,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        coverflowEffect: {
          slideShadows: false // 去掉阴影部分
        },
        loop: true,
        // autoplay: true,
        speed: 1000,
        pagination: {
          el: '.swiper-pagination'
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        grabCursor: true // 鼠标停留变为抓手
      },
      menus: [
        {
          name: '奥尔良鸡翅',
          image: require('../assets/1.jpg'),
          note: '新奥尔良鸡翅等系列产品自进入中国市场后，深受消费者的喜爱，特别是年轻热和小孩子',
          types: {
            style: '聚会',
            type: '美国'
          },
          price: '5-40人|35-45元'
        },
        {
          name: '西兰花炒牛肉',
          image: require('../assets/2.jpg'),
          note: '新奥尔良鸡翅等系列产品自进入中国市场后，深受消费者的喜爱，特别是年轻热和小孩子',
          types: {
            style: '聚会',
            type: '美国'
          },
          price: '5-40人|35-45元'
        },
        {
          name: '冬菇炒瘦肉',
          image: require('../assets/3.jpg'),
          note: '新奥尔良鸡翅等系列产品自进入中国市场后，深受消费者的喜爱，特别是年轻热和小孩子',
          types: {
            style: '聚会',
            type: '美国'
          },
          price: '5-40人|35-45元'
        }
      ]
    }
  },
  mounted () {},
  methods: {
    backHome () {
      this.$router.push({path: '/'})
    },
    sendMessage () {
      this.$message({
        message: '消息发送成功',
        type: 'success',
        center: true
      })
      setTimeout(() => {
        this.boxVisible = !this.boxVisible
      }, 500)
    }
  }
}
</script>

<style scoped>
.description {
  width: 100%;
  height: 800px;
  margin: 0 auto;
  background: #f6f6f6;
}
.des_main {
  width: 100%;
  height: 800px;
  margin: 0 auto;
}
.top {
  width: 100%;
  height: 200px;
  border: 1px solid #e1e1e1;
  background: #fff;
}
.back {
  width: 60px;
  height: 20px;
  padding-top: 8px;
  padding-left: 10%;
  background: #fff;
  color: gray;
}
.back:hover {
  cursor: pointer;
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
  width: 300px;
  height: 100%;
  /* background-color: lightgray; */
  display: flex;
  margin-left: 10%;
  /* justify-content: space-around; */
}
.desci {
  width: 300px;
  height: 100%;
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  word-break: break-all;
  margin-right: 10%;
  padding-top: 10px;
}
.left {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  vertical-align: middle;
  margin-left: 0;
}
.right {
  width: 150px;
  height: 100%;
  padding-top: 5%;
}
.right p {
  font-size: bold;
  font-size: 24px;
}
.right span {
  display: inline-block;
  margin: 10px 0;
  font-size: 12px;
}
.center{
  width:100%;
  margin: 0 auto;
}
.title{
  text-align: center;
  font-size: 18px;
  color:#000;
  opacity: 0.8;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 10px;
}
.swiper-wrapper {
    /* width: 80% !important; */
}
.swiper-slide {
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
  /* width: auto; */
}
.swiper-container {
    width: 1200px !important;
    --swiper-navigation-color: black
}
.swiper-slide-next{
  transform: scale(0.85) !important;
}
.swiper-slide-active{
  transform: scale(1) !important;
}
.swiper-slide-prev{
  transform: scale(0.85) !important;
}
.swiper-pagination{
   top:340px
}
.btn{
 width: 100px;
}
</style>
