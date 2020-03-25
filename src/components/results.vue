<template>
  <div class="result">
    <commonTop></commonTop>
     <div class="searchTop">
        <div id="bdMap">
         <i class="el-icon-location"></i>
         <span>
         {{this.position}}
         </span>
        </div>
         <span style="marginLeft:125px">我要找</span>
         <el-input v-model="type"></el-input>
         <span>烹饪</span>
         <el-input v-model="place" width="50px"></el-input>
         <span>可用</span>
         <el-date-picker v-model="date"></el-date-picker>
     </div>
     <div class="filter">
         <div class="rank">
             <span>厨师排名</span>
             <div class="imgs">
                 <img src="../assets/low.gif" alt="">
                 <img src="../assets/middle.gif" alt="">
                 <img src="../assets/upper.gif" alt="">
             </div>
         </div>
         <div>价格</div>
     </div>
  </div>
</template>

<script>
import commonTop from '@/components/commonTop'
import BMap from 'BMap'
export default {
  name: 'result',
  components: {commonTop},
  data () {
    return {
      position: '定位中',
      address: {},
      type: '',
      place: '',
      date: '',
      price: '',
      cRank: ''
    }
  },
  mounted () {
    // 百度地图API功能
    this.mapEnter()
  },
  methods: {
    mapEnter () {
      var geolocation = new BMap.Geolocation()
      const that = this
      geolocation.getCurrentPosition(function (r) {
        console.log(this)
        if (this.getStatus() === 0) {
          // let mk = new BMap.Marker(r.point)
          // map.addOverlay(mk)
          // map.panTo(r.point)
          // map.centerAndZoom(new BMap.Point(r.point.lng, r.point.lat), 15) // 根据坐标初始化地图
          // map.enableScrollWheelZoom(true)
          // map.addControl(new BMap.NavigationControl()) // 平移缩放控件
          // map.addControl(new BMap.ScaleControl()) // 比例尺
          // map.addControl(new BMap.OverviewMapControl()) // 缩略地图
          // map.addControl(new BMap.MapTypeControl()) // 地图类型
          // map.setCurrentCity('广州') // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
          // 添加标注
          // var marker = new BMap.Marker(new BMap.Point(r.point.lng, r.point.lat)) // 创建标注
          //  map.addOverlay(marker) // 将标注添加到地图中
          var gc = new BMap.Geocoder()
          gc.getLocation(r.point, function (rs) {
            console.log(rs) // 有时候定位不准确
            that.position = rs.addressComponents.province + rs.addressComponents.city
            that.address.province = rs.addressComponents.province
            that.address.city = rs.addressComponents.city
          })
        } else {
          alert('failed' + this.getStatus())
        }
      }, {enableHighAccuracy: true})
    }
  }
}
</script>

<style scoped>
.result{
    width: 100%;
    margin: 0 auto;
    text-align: left;
}
#bdMap{
   /* width:50px; */
   height:30px;
   line-height: 30px;
   display:inline-block;
   padding: 2px 5px;
   margin-left: 5px;
   font-size: 12px;
   position: absolute;
   left:10%;
   top:50%;
   margin-top: -15px;
}
.searchTop{
    width:100%;
    height: 80px;
    line-height: 80px;
    background: #ffc324;
    font-size: 14px;
    position: relative;
    text-align: center;
}
.el-input{
  width: 150px;
  margin-right:80px;
}
.el-input__inner{
  height:20px !important;
  line-height: 20px !important;
}
.filter{
    display: flex;
}
.rank{
    display: flex;
    flex-direction: column;
}
.imgs{
    flex: 1;
}
.imgs img{
    width: 20px;
    height: 20px;
    object-fit: cover;
}
</style>
