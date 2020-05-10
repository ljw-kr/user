<template>
  <div class="all">
    <p class="title">
      <span>{{this.data.createTime}}&nbsp;&nbsp;&nbsp;</span>
      <span>订单号:&nbsp;</span>
      <span>{{this.data.orderId}}</span>
    </p>
    <div class="text_wrap">
      <img :src="this.data.orderDetailList[0].dishIcon" alt class="img" />
      <div class="text">
        <p>
          菜品：
          <span
            v-for="(item, index) in this.data.orderDetailList"
            :key="index"
          >/{{item.dishName}}</span>
        </p>
        <p>
          上门地址：
          <span>{{this.data.customerAddress}}</span>
        </p>
        <p>
          上门时间：
          <span>{{this.data.orderTime}}</span>
        </p>
      </div>
      <div class="price">
        <p>总额: {{this.data.orderAmount}}</p>
        <p>{{this.data.payWay?this.data.payWay:'在线支付'}}</p>
      </div>
      <div class="state">
        <p>{{this.data.orderStatus===-1?'已取消':(this.data.orderStatus===0?'待支付':(this.data.orderStatus===1?'待确认':(this.data.orderStatus===2)?'待评论':'已完成'))}}</p>
        <p @click="toOrderDes" class="state_des">订单详情</p>
        <el-dialog
          title="订单详情"
          :visible.sync="orderVisible"
          width="700px"
          top="5vh"
          center
          :close-on-click-modal="false"
        >
          <div class="detail">
            <p>订单状态：{{this.data.orderStatus===-1?'已取消':(this.data.orderStatus===0?'待支付':(this.data.orderStatus===1?'待确认':(this.data.orderStatus===2)?'待评论':'已完成'))}}</p>
            <div class="detail_content">
              <p @click="toChef" style="paddingBottom:15px">
                厨师： {{this.detailData.chefName}}&nbsp;
                <i class="el-icon-arrow-right"></i>
              </p>
              <hr />
              <div
                v-for="(item, index) in this.detailData.orderDetailList"
                :key="index"
                class="dish_content"
              >
                <img :src="item.dishIcon" alt class="detailImg" />
                <span>{{item.dishName}}</span>
                <span>￥{{item.dishPrice}}&nbsp;&nbsp;x&nbsp;&nbsp;{{item.dishQuantity}}</span>
              </div>
              <p style="width:100%;marginTop:10px">备注：&nbsp;{{this.data.orderRemark}}</p>
              <!-- <hr style="marginTop:15px"> -->
              <div style="height:50px">
                <el-button
                  type="warning"
                  style="float:right;margin:10px;marginTop:23px"
                  @click="toChef"
                >再来一单</el-button>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
      <div class="action">
        <el-button
          type="warning"
          class="btn"
          v-if="this.data.orderStatus===2"
          @click="commentVisible=true"
        >去评论</el-button>
        <el-button type="danger" class="btn" v-else-if="this.data.orderStatus===0" @click="cancel">取消</el-button>
        <el-button type="warning" class="btn" v-else-if="this.data.orderStatus===1" @click="successOrder">确认完成</el-button>
        <el-button
          type="warning"
          class="btn"
          v-if="this.data.orderStatus===0"
          @click="toPayOrder"
        >去支付</el-button>
        <el-button
          type="warning"
          class="btn"
          v-else-if="this.data.orderStatus===-1"
          @click="toChef"
        >再来一单</el-button>
        <el-button type="danger" class="btn" v-else-if="this.data.orderStatus===2">删除</el-button>
        <el-button
          type="warning"
          class="btn"
          v-else-if="this.data.orderStatus===3"
          @click="toChef"
        >再来一单</el-button>
      </div>
      <el-dialog
        :title="this.data.chefName + '的厨房美味'"
        :visible.sync="commentVisible"
        width="700px"
        center
        :close-on-click-modal="false"
      >
        <div class="rate">
          <span style="display:inline-block;marginBottom:10px">评分</span>
          <el-rate v-model="commentRate" text-color="#ff9900" @change="getRate"></el-rate>
        </div>
        <div class="comment" style="marginTop:15px">
          <span style="display:inline-block;marginBottom:10px">评价</span>
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5}"
            :placeholder="text"
            v-model="commentText"
            maxlength="100"
            :show-word-limit="true"
          ></el-input>
        </div>
        <div class="container">
          <div
            v-for="(item ,index) in afterImg"
            :key="index"
            style="display:inline-block;position:relative;marginTop:15px"
          >
            <img :src="item" alt class="img" />
            <i class="el-icon-delete close" @click="deleteImg(index)"></i>
          </div>
          <div class="camera" style="borderRadius:5px;cursor:pointer" @click="upload">
            <i
              class="el-icon-camera"
              style="marginTop:20px;width: 100%;textAlign: center;fontSize:20px"
            ></i>
            <span style="display:inline-block;width: 100%;textAlign: center;">上传图片</span>
            <input
              type="file"
              accept="image/*"
              @change="handleFile"
              style="display:none"
              multiple="multiple"
              ref="file"
            />
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="commentVisible = false">取 消</el-button>
          <el-button type="warning" @click="submitComment">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { giveComment, getOrderDetail, cancelOrder, finishOrder } from '@/api/user'
export default {
  name: 'allorder',
  props: ['data'],
  data () {
    return {
      defaultImg: require('../assets/rose.jpg'),
      foodName: '',
      address: '',
      time: '',
      commentVisible: false,
      orderVisible: false,
      detailData: {},
      text:
        '亲，来评价下这名厨师为您服务的用餐体验吧，可以从厨师的服务态度，做工手艺，菜品的美味程度等方面描述哦~',
      commentRate: 0,
      commentText: '',
      afterImg: []
    }
  },
  created () {
    console.log(this.data)
  },
  methods: {
    // 获取评论分数
    getRate (value) {
      console.log(value)
      this.commentRate = value
    },
    // 确认完成订单
    successOrder () {
      let data = {}
      data.customerId = this.data.customerId
      data.orderId = this.data.orderId
      finishOrder(data).then(res => {
        if (res.code === 43) {
          this.$message({
            message: res.msg,
            type: 'scuuess',
            center: true,
            duration: 1500
          })
          this.$nextTick(() => {
            this.data.orderStatus = 2
          })
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
    // 去支付
    toPayOrder () {

    },
    // 订单详情
    toOrderDes () {
      let info = {}
      info.orderId = this.data.orderId
      info.customerId = this.data.customerId
      console.log(info)
      getOrderDetail(info).then(res => {
        console.log(res)
        if (res.code === 0) {
          console.log(res)
          this.detailData = res.data
          this.orderVisible = true
        } else {
          this.$message({
            message: res.msg,
            type: 'warning',
            center: true
          })
        }
      })
    },
    // 取消订单
    cancel () {
      let data = {}
      data.customerId = this.data.customerId
      data.orderId = this.data.orderId
      this.$confirm(
        '提示',
        '确认要取消该订单？',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          cancelOrder(data).then(res => {
            if (res.code === 43) {
              console.log(res)
              this.$message({
                message: res.msg,
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
        })
        .catch(() => {})
    },
    // 前往厨师界面
    toChef () {
      this.$router
        .push({ path: '/des', query: { chefId: this.data.chefId } })
        .catch(data => {})
    },
    upload () {
      if (this.afterImg.length >= 5) {
        this.$message({
          message: '亲，上传不了太多的图片啦',
          type: 'warning',
          center: true
        })
        return false
      } else {
        this.$refs.file.click()
      }
    },
    // 原生http请求，解决跨域问题
    getXhr (type, url, file) {
      const that = this
      /* eslint-disable */
      var reader = new FileReader();
      var fileName = file.name;
      let fd = new FormData();
      reader.onload = data => {
        let res = data.target || data.srcElement;
        console.log(res);
        fd.append("file", file, fileName);
        var xhr = "";
        if (typeof XMLHttpRequest !== "undefined") {
          xhr = new XMLHttpRequest();
        } else if (typeof ActiveXObject !== "undefined") {
          if (typeof arguments.callee.activeXString !== "string") {
            let versions = [
              "MSXML2.XMLHttp.6.0",
              "MSXML2.XMLHttp.3.0",
              "MSXML2.XMLHttp"
            ]; // ie browser different vesions
            let i, len;
            for (i = 0, len = versions.length; i < len; i++) {
              try {
                new ActiveXObject(versions[i]);
                arguments.callee.activeXString = versions[i];
                break;
              } catch (ex) {
                // jump
              }
            }
          }
          xhr = new ActiveXObject(arguments.callee.activeXString);
        } else {
          throw new Error("No XHR object available.");
        }
        xhr.open(type, url, true);
        xhr.upload.addEventListener(
          "progress",
          res => {
            if (res.lengthComputable) {
              // 上传进度
              var percent = ((res.loaded / res.total) * 100).toFixed(2);
              console.log(percent);
            }
          },
          false
        );
        xhr.addEventListener("readystatechange", function() {
          var result = xhr;
          if (result.status !== 200) {
            // error
            console.log("上传失败");
            return false;
          } else if (result.readyState === 4) {
            // finished
            let res = "";
            res = JSON.parse(result.responseText);
            console.log(res);
            that.afterImg.push(res.data.url);
            // that.avatarImg = that.result.data.url;
            console.log(that.afterImg);
            // console.log(that.avatarImg);
          }
        });
        xhr.send(fd); // 开始上传
        // this.myCropper.replace(res.result, false); // 默认false, 适应高度，不失真 ,替换裁剪框的图片路径为本地上传的图片路径
      };
      reader.readAsDataURL(file);
    },
    // 处理本地图片上传
    handleFile(e) {
      let $target = e.target || e.srcElement; // ie下支持e.srcElement，ff支持e.target。
      let len = this.afterImg.length + $target.files.length;
      if (len > 5) {
        this.$message({
          message: "亲，不能上传超过5张图片哦~",
          type: "warning",
          center: true
        });
      } else {
        let url = "http://193.112.183.246:8888/fwdj/utils/icon";
        for (let i = 0; i < $target.files.length; i++) {
          this.getXhr("post", url, $target.files[i]);
        }
      }
    },
    // 删除待上传的图片
    deleteImg(index) {
      this.afterImg.splice(index, 1);
    },
    // 提交评论
    submitComment() {
      let data = {};
      data.orderId = this.data.orderId;
      data.evaluateScore = this.commentRate;
      data.evaluateContent = this.commentText;
      data.customerId = this.data.customerId
      data.imgs = ''
      if (this.afterImg.length !== 0) {
        this.afterImg.forEach(item => {
         data.imgs += item + '##'
        })
      }
      console.log(data);
      giveComment(data).then(res => {
        if (res.code === 0) {
          this.$nextTick(() => {
            this.data.orderStatus = 3
          })
           this.$message({
            message: '评论成功',
            type: "success",
            center: true,
            duration: 1000
          });
          this.commentVisible = false
        } else {
          this.$message({
            message: res.msg,
            type: "warning",
            center: true,
            duration: 1000
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.all {
  width: 97%;
  border: 1px solid #ddd;
  margin-bottom: 5px;
}
.title {
  color: #aaa;
  background: #f4f4f4;
  height: 35px;
  line-height: 35px;
  padding-left: 10px;
}
.text_wrap {
  padding-left: 10px;
  margin: 5px;
  display: flex;
  cursor: pointer;
}
.img {
  width: 100px;
  height: 80px;
  object-fit: cover;
  vertical-align: middle;
}
.text {
  display: inline-block;
  width: 400px;
  height: 80px;
  margin-left: 10px;
  font-size: 13px;
}
.text p {
  margin: 5px 0;
}
.price {
  width: 130px;
  height: 80px;
  margin: 5px 0 5px 10px;
  border-left: 1px solid #ccc;
  position: relative;
  text-align: center;
}
.price p {
  width: 120px;
  text-align: center;
  margin: 0 auto;
  margin-top: 10px;
}
.price p:nth-of-type(2) {
  width: 90px;
  margin: 0 auto;
  border-top: 1px solid #ccc;
  padding-top: 5px;
  margin-top: 5px;
}
.state {
  height: 80px;
  margin: 5px 0;
  border-left: 1px solid #ccc;
  position: relative;
  text-align: center;
}
.state p {
  width: 120px;
  text-align: center;
  margin: 0 auto;
  margin-top: 10px;
}
.state .state_des {
  width: 90px;
  margin: 0 auto;
  border-top: 1px solid #ccc;
  padding-top: 5px;
  margin-top: 5px;
  cursor: pointer;
  color: #ffe300;
}
.action {
  width: 200px;
  height: 80px;
  text-align: center;
  border-left: 1px solid #ccc;
  margin-top: 5px;
}
.btn {
  width: 80px;
  padding: 5px;
  display: block;
  margin: 12px auto;
  font-size: 13px;
}
.camera {
  width: 80px;
  height: 80px;
  background: #ddd;
  margin-top: 15px;
  /* display: inline-block; */
}
.camera:active {
  transform: scale(1.1);
}
.container {
  /* padding-top: 15px; */
}
.container .img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  vertical-align: top;
  margin-right: 5px;
}
.img:hover + .close {
  display: inline-block;
}
.close {
  position: absolute;
  right: 12px;
  top: 8px;
  display: none;
  color: #fff;
  font-size: 20px;
}
.detail {
  text-align: left !important;
}
.detail p {
  text-align: left !important;
  width: 100%;
}
.detailImg {
  width: 100px;
  height: 80px;
  border-radius: 5px;
  object-fit: cover;
  vertical-align: middle;
}
.dish_content {
  width: 100%;
  display: flex;
  padding-left: 45px;
  padding-top: 15px;
}
.dish_content span {
  display: inline-block;
  width: 100px;
  text-align: center;
  margin-left: 100px;
  height: 80px;
  line-height: 80px;
}
</style>
