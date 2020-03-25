<template>
  <div>
      <div class="aboutText">
        <el-input v-model="txt" placeholder="请输入宁得疑惑"></el-input>
      </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      txt: ''
    }
  }
}
</script>

<style>
.aboutText{
  height: 500px;
  width: 1200px;
  background-color: #000;
}
</style>
