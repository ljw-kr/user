<template>
  <div class='all'>
    <commonTop></commonTop>
    <div class='main'>
      <div class="top_info">
        <p class='des'>私人厨师将世界带入你的盘子</p>
        <p class='note'>使用大厨到家总能让您享受到家的味道</p>
        <div class='search'>
          <el-select v-model='value' filterable placeholder='选择烹饪'>
            <el-option
              v-for='item in options'
              :key='item.value'
              :label='item.label'
              :value='item.value'
            ></el-option>
          </el-select>
          <el-select
            v-model='value2'
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
           <el-date-picker v-model='value1' type='date' placeholder='日期'></el-date-picker>
          </div>
          <el-button type='warning' class='btn1' @click="searchChiefs">找到你的厨师</el-button>
        </div>
      </div>
      <div class='bigInfo'>
        <div class='title'>精选厨师</div>
        <div class='cfInfo'>
          <chiefCard @click.native='toDes' v-for='(item,index) in recommends' :key='index'></chiefCard>
        </div>
      </div>
    </div>
    <commonBottom></commonBottom>
    <!-- <div class='bottom'>
      <div class='alert'>
        <p>
          <a href>京公网安备11010502000501号</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <a href>广播电视节目制作经营许可证（京）字第06990号</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <a href>京ICP备11017824号</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <a href>京ICP证130164号</a>
        </p>
        <p>
          <a href>营业执照</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <a href>网上有害信息举报专区</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <a href>不良信息举报电话：010-56538658</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <a href>举报邮箱 jubao@cshare.com.cn</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <a href>联系电话：010-56538600</a>
        </p>
      </div>
    </div> -->
  </div>
</template>

<script>
import commonTop from '@/components/commonTop'
import chiefCard from '@/components/chiefCard'
import commonBottom from '@/components/commonBottom'
export default {
  name: 'HelloWorld',
  components: { chiefCard, commonTop, commonBottom },
  data () {
    return {
      value1: '',
      value2: '',
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
      value: '',
      recommends: [
        {
          name: 'ljw',
          age: 22,
          src: '',
          rate: 4,
          note: '做出你喜欢的食物',
          goodAt: ['中餐', '西餐', '法餐', '意餐'],
          price: 30
        },
        {
          name: 'ljw',
          age: 22,
          src: '',
          rate: 4,
          note: '做出你喜欢的食物',
          goodAt: ['中餐', '西餐', '法餐', '意餐'],
          price: 30
        },
        {
          name: 'ljw',
          age: 22,
          src: '',
          rate: 4,
          note: '做出你喜欢的食物',
          goodAt: ['中餐', '西餐', '法餐', '意餐'],
          price: 30
        },
        {
          name: 'ljw',
          age: 22,
          src: '',
          rate: 4,
          note: '做出你喜欢的食物',
          goodAt: ['中餐', '西餐', '法餐', '意餐'],
          price: 30
        },
        {
          name: 'ljw',
          age: 22,
          src: '',
          rate: 4,
          note: '做出你喜欢的食物',
          goodAt: ['中餐', '西餐', '法餐', '意餐'],
          price: 30
        },
        {
          name: 'ljw',
          age: 22,
          src: '',
          rate: 4,
          note: '做出你喜欢的食物',
          goodAt: ['中餐', '西餐', '法餐', '意餐'],
          price: 30
        },
        {
          name: 'ljw',
          age: 22,
          src: '',
          rate: 4,
          note: '做出你喜欢的食物',
          goodAt: ['中餐', '西餐', '法餐', '意餐'],
          price: 30
        },
        {
          name: 'ljw',
          age: 22,
          src: '',
          rate: 4,
          note: '做出你喜欢的食物',
          goodAt: ['中餐', '西餐', '法餐', '意餐'],
          price: 30
        },
        {
          name: 'ljw',
          age: 22,
          src: '',
          rate: 4,
          note: '做出你喜欢的食物',
          goodAt: ['中餐', '西餐', '法餐', '意餐'],
          price: 30
        }
      ]
    }
  },
  mounted () {
    console.log(this)
  },
  methods: {
    toDes () {
      console.log('6666')
      let customer = window.localStorage.getItem('accountId')
      if (customer) {
        this.$router.push({ path: '/des' }).catch(data => {})
      } else {
        this.$message({
          message: '请您先登录网站！',
          type: 'warning',
          center: true
        })
      }
    },
    searchChiefs () {
      let customer = window.localStorage.getItem('accountId')
      if (customer) {
        this.$router.push({path: '/results'}).catch(data => {})
      } else {
        this.$message({
          message: '请您先登录网站！',
          type: 'warning',
          center: true
        })
      }
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
  height: 900px;
  background: lightgray;
  margin: 0 auto;
  padding-top: 20px;
}
.cfInfo {
  width: 60%;
  height: 800px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  justify-content: center ;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow-y:scroll
}
.bigInfo .title {
  width: 100%;
  height: 30px;
  margin: 0 auto;
  font-size: 22px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  letter-spacing: 2px;
}
</style>
