<template>
  <div>
    <commonTop></commonTop>
    <div class="result">
      <div class="searchTop">
        <div id="bdMap">
          <el-cascader
            size="middle"
            :options="cityOptions"
            v-model="position"
            :placeholder="position"
            @change="selectCity"
          ></el-cascader>
        </div>
        <div class="searchInput">
          <el-button type="warning" size="small" style="marginLeft:315px" @click="searchOne">找厨师</el-button>
          <el-input v-model="chefName"></el-input>
          <el-button type="warning" size="small" @click="searchOneDish">找菜品</el-button>
          <el-input v-model="dishName" width="50px"></el-input>
        </div>
      </div>
      <div class="filter1" v-if="isChef">
        <span>厨师等级：</span>
        <div class="rank">
          <div class="imgs">
             <el-cascader
                v-model="rank"
                :options="rankOptions"
                @change="selectRank"
              ></el-cascader>
          </div>
        </div>
        <div class="coin">
          <span>货币：</span>
          <select name id="selectCoin">
            <option value="人名币">人名币</option>
            <option value="美元">美元</option>
          </select>
        </div>
        <div class="price">
          <span>价格：</span>
          <span>{{this.priceRange}}￥/人</span>
          <div class="slideRange">
            <el-slider
              v-model="foodPrice"
              range
              show-stops
              :min="50"
              :max="400"
              :step="10"
              @change="changePrice"
            ></el-slider>
          </div>
        </div>
        <div class="selectButton">
          <el-button type="warning" size="small" @click="searchAgain">清除筛选</el-button>
          <el-button type="warning" size="small" @click="selectDeep">高级筛选</el-button>
        </div>
      </div>
      <!-- <div class="dish_price" v-else>
        <p>价格范围</p>
        <span>{{this.priceRange}}￥/人</span>
        <div class="slideRange2">
          <el-slider
            v-model="foodPrice"
            range
            show-stops
            :min="30"
            :max="200"
            :step="10"
            @change="changePrice"
          ></el-slider>
        </div>
        <div class="selectButton2">
          <el-button type="warning" size="small">清除筛选</el-button>
          <el-button type="warning" size="small">高级筛选</el-button>
        </div>
      </div> -->
      <div class="filter2" v-if="isChef">
        <div class="title">
          <span>特色</span>
          <div>
            <el-button type="primary" @click="checkAll">全选</el-button>
            <el-button type="primary" @click="uncheck">全不选</el-button>
          </div>
        </div>
        <div class="selectBox">
          <el-checkbox-group v-model="checkedFoods" @change="handleCheckedFoodsChange">
            <el-checkbox v-for="(food, index) in styleOptions" :label="food" :key="index">{{food}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <!-- <div class="dish_style" v-else>
        <p>菜品风格</p>
        <div class="selectBox">
          <el-checkbox-group v-model="checkedStyles" @change="handleCheckedStylesChange">
            <el-checkbox
              v-for="(style, index) in styleOptions"
              :label="style"
              :key="index"
            >{{style}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div> -->
      <div class="language" v-if="isChef">
        <span>语种选择：</span>
        <div>
          <el-radio-group v-model="languageRadio">
            <el-radio :label="'中文'">中文</el-radio>
            <el-radio :label="'英语'">英语</el-radio>
            <el-radio :label="'西班牙语'">西班牙语</el-radio>
          </el-radio-group>
        </div>
      </div>
      <!-- <div class="dish_type" v-else>
        <p>菜品类型</p>
        <div class="selectBox">
          <el-checkbox-group v-model="checkedTypes" @change="handleCheckedTypeChange">
            <el-checkbox v-for="(type, index) in typeOptions" :label="type" :key="index">{{type}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div> -->
      <div class="reserve" v-if="isChef">
        <span>收取定金：</span>
        <div>
          <el-radio-group v-model="reserveRadio">
            <el-radio :label="'严格'">严格</el-radio>
            <el-radio :label="'适中'">适中</el-radio>
            <el-radio :label="'宽松'">宽松</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="searchResult" v-if="isChef">
        <p class="reTitle">搜索结果：共为您搜索到 {{this.count}} 位优质厨师</p>
        <div class="chief_list">
          <chiefCard
            v-for="(item,index) in chefs"
            :key="index"
            @click.native="toDes(item.chefId)"
            :chefInfo="item"
          ></chiefCard>
        </div>
        <div class="loading"><i class="el-icon-loading" v-if="load"></i><span style="fontSize:20px" v-else>已经到底啦~</span></div>
      </div>
      <div class="searchResult" v-else>
        <p class="reTitle">搜索结果：共为您搜索到 {{this.count}} 份美味菜品</p>
         <div class="chief_list">
          <dish
            v-for="(item,index) in dishes"
            :key="index"
            :dishMenu="item"
            @click.native="toDes(item.chefId)"
          ></dish>
        </div>
      </div>
    </div>
    <commonBottom></commonBottom>
  </div>
</template>

<script>
import commonTop from '@/components/commonTop'
import commonBottom from '@/components/commonBottom'
import chiefCard from '@/components/chiefCard'
import dish from '@/components/dish'
import { searchChief, searchFood } from '@/api/user'
import { CodeToText, provinceAndCityData } from 'element-china-area-data' // 引入
// provinceAndCityData ： 省市二级数据，得到数组
// regionData: 省市区三级数据，得到对象
// CodeToText： 方法， CodeToText['130060'] 得到地区名
// TextToCode：方法, TextToCode['北京'] 得到地域码
export default {
  name: 'result',
  components: { commonTop, chiefCard, commonBottom, dish },
  data () {
    return {
      position: '',
      cityOptions: provinceAndCityData,
      address: {},
      chefName: '',
      chefprovince: '',
      chefcity: '',
      chefspeciality: '',
      dishName: '',
      date: '',
      price: '',
      foodPrice: [50, 400],
      priceRange: '50-400',
      rank: '',
      rankOptions: [
        {
          value: '业余',
          label: '业余',
          children: [
            {
              value: '家庭能手',
              label: '家庭能手'
            },
            {
              value: '厨师达人',
              label: '厨师达人'
            },
            {
              value: '专家',
              label: '专家'
            }
          ]
        },
        {
          value: '专业',
          label: '专业',
          children: [
            {
              value: '一级',
              label: '一级'
            },
            {
              value: '二级',
              label: '二级'
            },
            {
              value: '三级',
              label: '三级'
            },
            {
              value: '四级',
              label: '四级'
            }
          ]
        }

      ],
      foodOptions: [
        '早餐/午餐',
        '甜点/糕点',
        '家宴',
        '鸡尾酒',
        '低热量',
        '清真',
        '高蛋白',
        '节日套餐'
      ],
      styleOptions: [
        '湘菜',
        '粤菜',
        '潮汕菜',
        '闽菜',
        '靓火老汤',
        '私房菜',
        '炖品类',
        '清真',
        '东北菜',
        '节日套餐'
      ],
      typeOptions: [
        '中国',
        '美国',
        '法国',
        '意大利',
        '西班牙',
        '迪拜',
        '英国',
        '巴西'
      ],
      checkedTypes: ['中国'],
      checkedStyles: ['粤菜'],
      checkedFoods: [],
      languageRadio: '中文',
      reserveRadio: '适中',
      count: 4,
      chefs: [],
      dishes: [],
      isChef: true,
      currentPage: 0,
      dataPages: '',
      recommends: [],
      load: true
    }
  },
  created () {
    this.chefs = this.$route.params.chefs
    console.log(this.chefs)
    this.count = this.$route.params.chefNumber
    this.dataPages = this.$route.params.dataPages
    this.chefspeciality = this.$route.params.speciality
    this.chefprovince = this.$route.params.province
    this.chefcity = this.$route.params.city
    this.position = this.$route.params.province + '/' + this.$route.params.city
    console.log(this.position)
  },
  beforeRouteEnter (to, from, next) {
    console.log(to, from)
    if (from.path === '/') {
      window.location.href = 'http://cshare.com/'
    } else {
      next(vm => {
        // vm.$router.replace({name: to.name, params: to.params})
      })
    }
  },
  mounted () {
    let data = {}
    data.chefname = this.chefname || ''
    if (this.rank.length > 0) {
      this.cheflevel = this.rank[0] + ' ' + this.rank[1]
    }
    data.cheflevel = this.cheflevel || ''
    data.chefname = this.chefname || ''
    data.chefstatus = this.chefstatus || ''
    data.chefprovince = this.chefprovince || ''
    data.chefcity = this.chefcity || ''
    data.chefcounty = this.chefcounty || ''
    let sp = ''
    if (this.checkedFoods.length > 0) {
      this.checkedFoods.forEach(item => {
        sp += item + ' '
      })
    }
    this.chefspeciality += sp
    data.chefspeciality = this.chefspeciality.replace(/(\s*$)/g, '')
    data.lowcost = this.lowcost || ''
    data.highcost = this.highcost || ''
    data.page = this.page || ''
    data.size = this.size || ''
    const that = this // 因为下文中的this指的是卡片容器，所以全局this要另外指代
    // 监听厨师卡片容器的滚动
    let dom = document.getElementsByClassName('chief_list')[0]
    dom.addEventListener('scroll', function () {
      let totalPage = that.dataPages
      const scrollDistance = dom.scrollHeight - dom.scrollTop - dom.clientHeight
      // console.log(scrollDistance)
      if (scrollDistance === 0) { // 等于0证明已经到底，可以请求接口
        if (that.currentPage < totalPage) { // 当前页数小于总页数就请求
          document.getElementsByClassName('loading')[0].style.display = 'block'
          that.currentPage++// 当前页数自增
          data.page = that.currentPage
          // 请求接口的代码
          searchChief(data).then(res => {
            // 将请求回来的数据和当前展示的数据合并在一起
            if (res.code === 0) {
              that.chefs = that.chefs.concat(res.data)
              setTimeout(() => {
                document.getElementsByClassName('loading')[0].style.display = 'none'
              }, 2000)
              // data = null
            } else {
              that.load = false
              setTimeout(() => {
                document.getElementsByClassName('loading')[0].style.display = 'none'
              }, 2000)
            }
          })
        }
      }
    })
  },
  watch: {
    reserveRadio: function handle (newval, oldval) {
      console.log(this.reserveRadio)
    }
  },
  methods: {
    // 查找某位厨师
    searchOne () {
      console.log(this.chefName)
      if (this.chefName === '') {
        this.$message({
          message: '厨师名不能为空',
          type: 'warning',
          center: true,
          duration: 1500
        })
      } else {
        let data = {}
        data.chefname = this.chefName || ''
        data.cheflevel = ''
        data.chefstatus = ''
        data.chefprovince = ''
        data.chefcity = ''
        data.chefcounty = ''
        data.chefspeciality = ''
        data.lowcost = ''
        data.highcost = ''
        data.page = this.page || 0
        data.size = this.size || 10
        console.log(data)
        searchChief(data).then(res => {
          if (res.code === 0) {
            console.log(res)
            this.chefs = res.data
            this.count = res.data.length
            data = null
          } else {
            this.$message({
              message: res.msg,
              type: 'warning',
              center: true,
              duration: 1500
            })
          }
        })
      }
    },
    // 查找菜品
    searchOneDish () {
      console.log(this.dishName)
      if (this.dishName === '') {
        this.$message({
          message: '菜品名称不能为空',
          type: 'warning',
          center: true
        })
      } else {
        let data = {}
        data.dishname = this.dishName
        data.lowprice = this.lowprice || ''
        data.highprice = this.highprice || ''
        data.categorystyle = this.categorystyle || ''
        data.categorytype = this.categorytype || ''
        data.page = this.page || ''
        data.size = this.size || ''
        data.sorttype = 1
        this.isChef = false
        console.log(data)
        searchFood(data).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.count = res.data.length
            this.dishes = res.data
            // res.data.forEach(item => {
            //   getCategoryType(item.categoryType).then(res => {
            //     item.categoryType = res.data.categoryName
            //   })
            //   getCategoryType(item.categoryStyle).then(res => {
            //     item.categoryStyle = res.data.categoryName
            //   })
            //   this.dishes.push(item)
            // })
            data = null
          } else {
            this.$message({
              message: '没有搜索到呢',
              type: 'warning',
              center: true
            })
          }
        })
      }
    },
    // 价格范围
    changePrice (e) {
      console.log(e)
      this.priceRange = e[0] + '-' + e[1]
      this.lowcost = e[0]
      this.highcost = e[1]
    },
    // 厨师等级
    selectRank (values) {
      console.log(values)
    },
    // 清除筛选
    searchAgain () {
      this.chefprovince = this.chefcity = this.chefspeciality = this.lowcost = this.highcost = this.rank = this.position = ''
    },
    // 高级筛选
    selectDeep () {
      let data = {}
      data.chefname = this.chefName || ''
      if (this.rank.length > 0) {
        this.cheflevel = this.rank[0] + ' ' + this.rank[1]
      }
      data.cheflevel = this.cheflevel || ''
      data.chefstatus = this.chefstatus || ''
      data.chefprovince = this.chefprovince || ''
      data.chefcity = this.chefcity || ''
      data.chefcounty = this.chefcounty || ''
      this.chefspeciality = ''
      if (this.checkedFoods.length > 0) {
        this.checkedFoods.forEach(item => {
          this.chefspeciality += item + ' '
        })
      }
      data.chefspeciality = this.chefspeciality.replace(/(\s*$)/g, '')
      data.lowcost = this.lowcost || ''
      data.highcost = this.highcost || ''
      data.page = this.page || 0
      data.size = this.size || 10
      console.log(data)
      searchChief(data).then(res => {
        if (res.code === 0) {
          console.log(res)
          this.chefs = res.data
          this.count = res.data.length
          data = null
        } else {
          this.$message({
            message: res.msg,
            type: 'warning',
            center: true,
            duration: 1500
          })
        }
      })
    },
    handleCheckedFoodsChange (e) {
      console.log(e)
    },
    handleCheckedTypeChange (e) {
      console.log(e)
    },
    handleCheckedStylesChange (e) {
      console.log(e)
    },
    // 选择城市
    selectCity (values) {
      console.log(values)
      this.chefprovince = CodeToText[values[0]]
      this.chefcity = CodeToText[values[1]]
      this.position = CodeToText[values[0]] + CodeToText[values[1]]
    },
    // 全选
    checkAll () {
      this.checkedFoods = this.styleOptions
      this.styleOptions.forEach(item => {
        this.chefspeciality += item + ' '
      })
      console.log(this.chefspeciality)
    },
    // 全不选
    uncheck () {
      this.checkedFoods = []
      this.chefspeciality = ''
    },
    // 前往厨师界面
    toDes (id) {
      this.$router
        .push({ path: '/des', query: { chefId: id } })
        .catch(data => {})
    },
    // 选择厨师等级
    selectLevel (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>
.result {
  width: 1200px;
  margin: 0 auto;
  text-align: center;
  font-size: 13px;
  border: 1px solid #ccc;
  border-top: none;
  background: #fff;
}
#bdMap {
  width:130px;
  height: 34px;
  line-height: 34px;
  display: inline-block;
  /* padding: 2px 5p; */
  margin-left: 5px;
  font-size: 12px;
  position: absolute;
  left: 8.5%;
  top: 50%;
  margin-top: -19px;
}
.searchTop {
  width: 1200px;
  height: 80px;
  line-height: 80px;
  background: #ffc324;
  font-size: 14px;
  position: relative;
  text-align: center;
  margin: 0 auto;
}
.searchTop span {
  margin-right: 10px;
}
.searchInput {
  width: auto;
}
.el-input {
  width: 150px;
  margin-right: 80px;
}
.el-input__inner {
  height: 20px !important;
  line-height: 20px !important;
}
.filter1 {
  width: 1200px;
  margin: 0 auto;
  padding-left: 5%;
  text-align: left;
  display: flex;
  margin-top: 15px;
  padding-bottom: 10px;
  color: #bbb;
  font-size: 14px;
  letter-spacing: 1px;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
}
.rank {
  /* display: flex; */
  flex-direction: column;
  margin-right: 150px;
  margin-top: -10px;
}
.rank span {
  padding: 1px 8px;
  color: #333;
  background: #ddd;
  display: inline-block;
  height: 23px;
  line-height: 23px;
  border-radius: 2px;
  margin-right: 20px;
  margin-left: 5px;
}
.rank span:hover {
  background: #fee233;
  cursor: pointer;
}
.rank span:active {
  transform: scale(1.1);
}
.imgs {
  margin-top: 10px;
  font-size: 12px;
}
.imgs img {
  width: 23px;
  height: 23px;
  object-fit: cover;
  vertical-align: middle;
  margin-top: -4px;
}
.coin {
  display: flex;
  flex-direction: column;
  margin-right: 150px;
}
#selectCoin {
  margin-top: 10px;
  outline: none;
  border-radius: 3px;
  border-color: #ccc;
  padding: 1px;
}
.price {
  display: flex;
  flex-direction: column;
  width: 100px;
  margin-right: 150px;
}
.slideRange {
  width: 100%;
}
.selectButton {
  display: flex;
  flex-direction: column;
  font-size: 13px;
}
.selectButton button {
  padding: 7px 15px;
  margin-left: 0;
  margin-top: 7px;
}
.selectButton button:nth-of-type(1) {
  margin-top: 0px;
}
.filter2 {
  width: 1200px;
  margin: 0 auto;
  padding-left: 5%;
  text-align: left;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
}
.title {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-right: 150px;
}
.title button {
  font-size: 12px;
  padding: 7px 20px;
  margin: 7px 15px 5px 0;
}
.language {
  display: flex;
  width: 1200px;
  margin: 0 auto;
  padding-left: 5%;
  text-align: left;
  margin-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
}
.language div {
  margin-left: 150px;
}
.reserve {
  width: 1200px;
  margin: 0 auto;
  padding-left: 5%;
  text-align: left;
  display: flex;
  margin-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
}
.reserve div {
  margin-left: 150px;
}
.searchResult {
  width: 100%;
  height: auto;
  overflow-y:scroll;
  background: #f4f4f4;
}
.reTitle {
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  padding-top: 20px;
}
.chief_list {
  width: 100%;
  height: 800px;
  margin: 0 auto;
  margin-left: 3.5%;
  margin-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
}
*::-webkit-scrollbar {
  width: 0;
}
.dish_price {
  width: 1200px;
  margin: 0 auto;
  padding-left: 5%;
  text-align: left;
  margin-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  position: relative;
}
.dish_price p {
  margin-bottom: 8px;
  font-size: 16px;
}
.slideRange2 {
  width: 200px;
}
.selectButton2 {
  width: 100px;
  position: absolute;
  left: 350px;
  top: -4px;
  display: flex;
  flex-direction: column;
}
.selectButton2 button {
  /* padding: 7px 15px; */
  margin-left: 0 !important;
  margin-top: 7px !important;
}
.dish_style {
  width: 1200px;
  margin: 0 auto;
  padding-left: 5%;
  text-align: left;
  margin-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
}
.dish_style p {
  margin-bottom: 8px;
  font-size: 16px;
}
.dish_type {
  width: 1200px;
  margin: 0 auto;
  padding-left: 5%;
  text-align: left;
  margin-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
}
.dish_type p {
  margin-bottom: 8px;
  font-size: 16px;
}
.loading{
  font-size: 40px;
  display: none;
}
</style>
