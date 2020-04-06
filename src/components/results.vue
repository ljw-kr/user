<template>
  <div>
    <commonTop></commonTop>
    <div class="result">
      <div class="searchTop">
        <div id="bdMap">
          <!-- <i class="el-icon-location"></i> -->
          <!-- <span>{{this.position}}</span> -->
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
          <span>可用</span>
          <el-date-picker v-model="date"></el-date-picker>
        </div>
      </div>
      <div class="filter1" v-if="isChef">
        <span>厨师等级：</span>
        <div class="rank">
          <div class="imgs">
            <img src="../assets/middle.gif" alt />
            <span @click="selectLevel">业余</span>
            <img src="../assets/low.gif" alt />
            <span @click="selectLevel">初级</span>
            <img src="../assets/upper.gif" alt />
            <span @click="selectLevel">资深</span>
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
              :min="10"
              :max="100"
              :step="10"
              @change="changePrice"
            ></el-slider>
          </div>
        </div>
        <div class="selectButton">
          <el-button type="warning" size="small">清除筛选</el-button>
          <el-button type="warning" size="small">高级筛选</el-button>
        </div>
      </div>
      <div class="dish_price" v-else>
        <p>价格范围</p>
        <span>{{this.priceRange}}￥/人</span>
        <div class="slideRange2">
          <el-slider
            v-model="foodPrice"
            range
            show-stops
            :min="10"
            :max="100"
            :step="10"
            @change="changePrice"
          ></el-slider>
        </div>
        <div class="selectButton2">
          <el-button type="warning" size="small">清除筛选</el-button>
          <el-button type="warning" size="small">高级筛选</el-button>
        </div>
      </div>
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
            <el-checkbox v-for="(food, index) in foodOptions" :label="food" :key="index">{{food}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="dish_style" v-else>
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
      </div>
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
      <div class="dish_type" v-else>
        <p>菜品类型</p>
        <div class="selectBox">
          <el-checkbox-group v-model="checkedTypes" @change="handleCheckedTypeChange">
            <el-checkbox v-for="(type, index) in typeOptions" :label="type" :key="index">{{type}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
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
      <div class="searchResult">
        <p class="reTitle" v-if="isChef">搜索结果：共为您搜索到 {{this.count}} 位优质厨师</p>
        <p class="reTitle" v-else>搜索结果：共为您搜索到 {{this.count}} 份美味菜品</p>
        <div class="chief_list">
          <chiefCard
            v-for="(item,index) in chefs"
            :key="index"
            @click.native="toDes(item.chefId)"
            :chefInfo="item"
          ></chiefCard>
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
import { searchChief, searchFood } from '@/api/user'
import { CodeToText, provinceAndCityData } from 'element-china-area-data' // 引入
// provinceAndCityData ： 省市二级数据，得到数组
// regionData: 省市区三级数据，得到对象
// CodeToText： 方法， CodeToText['130060'] 得到地区名
// TextToCode：方法, TextToCode['北京'] 得到地域码
export default {
  name: 'result',
  components: { commonTop, chiefCard, commonBottom },
  data () {
    return {
      position: '',
      cityOptions: provinceAndCityData,
      address: {},
      chefName: '',
      chefprovince: '',
      chefcity: '',
      dishName: '',
      date: '',
      price: '',
      cRank: '',
      foodPrice: [35, 100],
      priceRange: '35-100',
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
      checkedFoods: ['早餐/午餐'],
      languageRadio: '中文',
      reserveRadio: '适中',
      count: 4,
      chefs: [],
      isChef: true,
      recommends: [
        {
          chefName: '欧阳锋',
          chefLevel: 4,
          chefSlogan: '做出你喜欢的食物',
          chefSpeciality: '法餐',
          chefCost: 30,
          chefIcon: require('../assets/ml.jpg'),
          chefBackground: require('../assets/1.jpg')
        },
        {
          chefName: '天上童姥',
          chefLevel: 4,
          chefSlogan: '做出你喜欢的食物',
          chefSpeciality: '法餐',
          chefCost: 30,
          chefIcon: require('../assets/ml.jpg'),
          chefBackground: require('../assets/1.jpg')
        },
        {
          chefName: '洪七公',
          chefLevel: 4,
          chefSlogan: '做出你喜欢的食物',
          chefSpeciality: '法餐',
          chefCost: 30,
          chefIcon: require('../assets/ml.jpg'),
          chefBackground: require('../assets/1.jpg')
        },
        {
          chefName: '文豪',
          chefLevel: 4,
          chefSlogan: '做出你喜欢的食物',
          chefSpeciality: '法餐',
          chefCost: 30,
          chefIcon: require('../assets/ml.jpg'),
          chefBackground: require('../assets/1.jpg')
        }
      ]
    }
  },
  created () {
    // this.chefs = this.$route.params.chefs
    console.log(this.chefs)
    this.count = this.chefs.length || 0
    this.position = this.$route.params.position
    console.log(this.position)
  },
  mounted () {},
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
        data.cheflevel = this.cheflevel || ''
        data.chefname = this.chefname || ''
        data.chefstatus = this.chefstatus || ''
        data.chefprovince = this.chefprovince || ''
        data.chefcity = this.chefcity || ''
        data.chefcounty = this.chefcounty || ''
        data.chefspeciality = this.chefspeciality || ''
        data.lowcost = this.lowcost || ''
        data.highcost = this.highcost || ''
        data.page = this.page || 0
        data.size = this.size || 10
        searchChief(data).then(res => {
          if (res.code === 0) {
            console.log(res)
          } else {
            this.$message({
              message: res.msg,
              type: 'warning',
              center: true,
              duration: 1500
            })
          }
        })
        data = null
        console.log(data)
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
        searchFood(data).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.count = res.data.length
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
      this.checkedFoods = this.foodOptions
    },
    // 全不选
    uncheck () {
      this.checkedFoods = []
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
</style>
