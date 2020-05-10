<template>
  <div class="dish_content">
     <div class="content">
       <img :src="this.dishMenu.dishIcon" alt="" class="image">
       <div class="bg">
        <p class="name">{{this.dishMenu.dishName}}</p>
       <p class="intro">{{this.dishMenu.dishDescription}}</p>
        <p class="price">1-10人 | {{this.dishMenu.dishPrice}}元</p>
        </div>
     </div>
  </div>
</template>

<script>
export default {
  name: 'dish',
  props: ['dishMenu'],
  data () {
    return {
    }
  },
  created () {
    console.log(this.dishes)
  },
  methods: {
  }
}
</script>

<style scoped>
.content{
  width:220px;
  height: 300px;
  box-shadow:0 0 5px rgba(0, 0, 0,0.5);
    text-align: center;
    font-size: 12px;
    color: rgba(0,0,0,.8);
    margin: 10px 0 50px 0;
}
.image{
  width: 220px;
  height: 130px;
  object-fit: cover;
  vertical-align: middle;
}
.bg{
  height: 170px;
  background: url('../assets/bg.jpg');
  background-size: 100% 100%;
}
.name{
  font-size: 16px;
  opacity: 0.7;
  font-weight: bold;
  padding-top: 4px;
  /* margin: 5px auto; */
}
.intro{
    width: 100%;
    height: 47px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    margin: 0 auto;
    padding-top:65px;
}
.price{
  margin-top: 8px;
}
</style>
