<template>
  <div class="about">
      <commonTop></commonTop>
      <div class="center">
          6666
      </div>
      <commonBottom></commonBottom>
  </div>
</template>

<script>
import commonTop from '@/components/commonTop'
import commonBottom from '@/components/commonBottom'
export default {
  name: 'about',
  components: {commonTop, commonBottom},
  data () {
    return {
      txt: ''
    }
  }
}
</script>

<style scoped>
.about{
  width: 100%;
}
.center{
  width: 80%;
  height:800px;
  margin: 0 auto;
  border:1px solid #ccc;
  border-top: none;
  border-radius: 5px;
  background: #fff;
}
</style>
