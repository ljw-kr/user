<template>
  <div class='all'>
    <commonTop></commonTop>
    <div class='main'>
      <div class="top_info">
        <p class='des'>私人厨师将世界带入你的盘子</p>
        <p class='note'>使用风味到家总能让您享受到家的味道</p>
        <div class='search'>
          <el-select v-model='type' filterable placeholder='选择烹饪'>
            <el-option
              v-for='item in options'
              :key='item.value'
              :label='item.label'
              :value='item.value'
            ></el-option>
          </el-select>
          <el-select
            v-model='city'
            filterable
            placeholder='城市'
            class='second'
          >
            <el-option
              v-for='item in options2'
              :key='item.value'
              :label='item.label'
              :value='item.value'
            ></el-option>
          </el-select>
          <div class='block'>
           <el-date-picker v-model='datetime' type='date' placeholder='日期'></el-date-picker>
          </div>
          <el-button type='warning' class='btn1' @click="searchChiefs">找到你的厨师</el-button>
        </div>
      </div>
      <div class='bigInfo'>
        <div class='title'>精选厨师</div>
        <div class='cfInfo' v-if="this.recommends.length!==0">
          <chiefCard @click.native='toDes(item.chefId)' v-for='(item,index) in recommends' :key='index' :chefInfo="item"></chiefCard>
        </div>
        <div class="cfInfo" v-else style="textAlign:center !important">
          暂无数据
        </div>
        <div class="loading"><i class="el-icon-loading" v-if="load"></i><span style="fontSize:20px" v-else>已经到底啦~</span></div>
      </div>
    </div>
    <commonBottom></commonBottom>
  </div>
</template>

<script>
import commonTop from '@/components/commonTop'
import chiefCard from '@/components/chiefCard'
import commonBottom from '@/components/commonBottom'
import {pushChef, getCatogery, getOrderInfo, searchChief} from '@/api/user'
import BMap from 'BMap'
export default {
  name: 'HelloWorld',
  components: { chiefCard, commonTop, commonBottom },
  data () {
    return {
      chefprovince: '',
      chefcity: '',
      page: '',
      size: '',
      datetime: '',
      city: '',
      options: [
        {
          value: '选项1',
          label: '粤菜'
        },
        {
          value: '选项2',
          label: '湘菜'
        },
        {
          value: '选项3',
          label: '闽菜'
        },
        {
          value: '选项4',
          label: '川菜'
        },
        {
          value: '选项5',
          label: '鲁菜'
        },
        {
          value: '选项6',
          label: '浙菜'
        },
        {
          value: '选项7',
          label: '苏菜'
        },
        {
          value: '选项8',
          label: '徽菜'
        }
      ],
      options2: [
        {
          value: '选项1',
          label: '广州'
        },
        {
          value: '选项5',
          label: '北京'
        },
        {
          value: '选项2',
          label: '上海'
        },
        {
          value: '选项3',
          label: '深圳'
        },
        {
          value: '选项4',
          label: '杭州'
        }
      ],
      type: '',
      recommends: [],
      customerId: '',
      totalpages: 1,
      currentPage: 1,
      load: true
    }
  },
  created () {
    getCatogery().then(res => {
      if (res.code === 0) {
        let options = []
        res.data.forEach(item => {
          let option = {}
          if (item.categoryType < 200) {
            option.label = item.categoryName
            option.value = item.categoryType
            options.push(option)
            option = null
          }
        })
        this.options = options
      }
    })
    // 百度地图API功能
    try {
      this.mapEnter()
    } catch (error) {}
    let data = {}
    data.chefprovince = this.chefprovince
    data.chefcity = this.chefcity
    data.page = ''
    data.size = ''
    setTimeout(() => {
      pushChef(data).then(res => {
        if (res.code === 0) {
          this.totalpages = res.totalpages
          this.recommends = res.data
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
    }, 1000)
  },
  mounted () {
    this.customerId = window.localStorage.getItem('accountId')
    let info = {}
    info.customerId = this.customerId
    info.page = ''
    info.size = ''
    getOrderInfo(info).then(res => {
      console.log(res)
    })
    let data = {}
    data.chefprovince = this.chefprovince
    data.chefcity = this.chefcity
    const that = this // 因为下文中的this指的是卡片容器，所以全局this要另外指代
    // 监听厨师卡片容器的滚动
    let dom = document.getElementsByClassName('cfInfo')[0]
    dom.addEventListener('scroll', function () {
      let totalPage = that.totalpages
      const scrollDistance = dom.scrollHeight - dom.scrollTop - dom.clientHeight
      console.log(scrollDistance)
      if (scrollDistance === 0) { // 等于0证明已经到底，可以请求接口
        if (that.currentPage < totalPage) { // 当前页数小于总页数就请求
          document.getElementsByClassName('loading')[0].style.display = 'block'
          that.currentPage++// 当前页数自增
          data.page = that.currentPage
          // 请求接口的代码
          pushChef(data).then(res => {
            // 将请求回来的数据和当前展示的数据合并在一起
            if (res.code === 0) {
              that.recommends = that.recommends.concat(res.data)
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
  methods: {
    mapEnter () {
      var geolocation = new BMap.Geolocation()
      const that = this
      geolocation.getCurrentPosition(function (r) {
        // console.log(this)
        if (this.getStatus() === 0) {
          var gc = new BMap.Geocoder()
          gc.getLocation(r.point, function (rs) {
            console.log(rs) // 有时候定位不准确
            that.chefprovince = rs.addressComponents.province
            that.chefcity = that.city = rs.addressComponents.city
          })
        } else {
          alert('failed' + this.getStatus())
          this.position = '定位失败'
        }
      }, {enableHighAccuracy: true})
    },
    toDes (id) {
      if (this.customerId) {
        this.$router.push({ path: '/des', query: {chefId: id} }).catch(data => {})
      } else {
        this.$message({
          message: '请您先登录网站！',
          type: 'warning',
          center: true
        })
      }
    },
    searchChiefs () {
      if (this.customerId) {
        // this.$router.push({path: '/results'}).catch(data => {})
        let data = {}
        data.chefprovince = ''
        data.chefcity = ''
        data.page = 4
        data.size = 5
        pushChef(data).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$router.replace({ name: 'results', params: {chefs: res.data, position: this.city} })
          }
        })

        // let data = {}
        // data.chefname = this.chefname || ''
        // data.cheflevel = this.cheflevel || ''
        // data.chefname = this.chefname || ''
        // data.chefstatus = this.chefstatus || ''
        // data.chefprovince = this.chefprovince || ''
        // data.chefcity = this.chefcity || ''
        // data.chefcounty = this.chefcounty || ''
        // data.chefspeciality = this.chefspeciality || ''
        // data.lowcost = this.lowcost || ''
        // data.highcost = this.highcost || ''
        // data.page = this.page || 0
        // data.size = this.size || 10
        // searchChief(data).then(res => {
        //   if (res.code === 0) {
        //     console.log(res)
        //   } else {
        //     this.$message({
        //       message: res.msg,
        //       type: 'warning',
        //       center: true
        //     })
        //   }
        // })
        // console.log(data)
      } else {
        this.$message({
          message: '请您先登录网站！',
          type: 'warning',
          center: true,
          duration: 1000
        })
      }
    },
    reload () {
      let data = {}
      data.chefprovince = this.chefprovince
      data.chefcity = this.chefcity
      data.page = ''
      data.size = ''
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
*::-webkit-scrollbar {
  width: 0;
}
.all {
  overflow: auto;
  height: auto;
}
.all::-webkit-scrollbar {
  width: 0;
}

.main {
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
}
.top_info{
  width: 100%;
  height:500px;
  background: url('../assets/1.jpg');
  background-size: 100% 100%;
  padding-top:130px;
  padding-bottom: 80px;
}
.top_info .des {
  font-size: 45px;
  width: 400px;
  color: #fff;
  font-weight: 600;
  margin: 20px auto;
  margin-top:80px;
  letter-spacing: 6px;
  text-shadow: 0 0 2px #000;
}
.top_info .note {
  font-size: 22px;
  color: rgba(255, 255, 255);
  width: 460px;
  margin: 0 auto;
  margin-top: 50px;
  letter-spacing: 2px;
}
.top_info .search {
  display: flex;
  width: 900px;
  margin: 0 auto;
  margin-top: 60px;
}
.el-input .el-input--suffix {
  font-size: 19px !important;
}
.el-select .el-input .el-input__inner {
  height: 50px !important;
}
.search .block {
  margin-left: 500px;
}
.search .second {
  margin-left: 250px;
}
.el-select {
  position: absolute;
}
.search .btn1 {
  margin-left: 50px;
}
.bigInfo {
  width: 100%;
  height: auto;
  background: lightgray;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
}
.cfInfo {
  width: 76.8%;
  height: 900px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow-y:scroll;
  padding-bottom: 25px;
}
.bigInfo .title {
  width: 100%;
  height: 30px;
  margin: 0 auto;
  font-size: 22px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  letter-spacing: 2px;
}
.loading{
  font-size: 40px;
  display: none;
}
</style>
