<template>
  <div id="app">
    <router-view/>
    <!-- <van-tabbar v-model="active" v-if="showTabBar" active-color="#F88EA0">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/classification">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/shoppingcar">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/person">个人中心</van-tabbar-item>
    </van-tabbar> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
      active:0,
      showTabBar:true
    }
  },
  watch:{
    // $route(to,from){
    //    let whiteList = ['classification','home','person','shoppingcar'];
    //    if(whiteList.indexOf(to.name) == -1){
    //       this.showTabBar = false;
    //    }else{
    //       this.showTabBar = true;
    //    }
    // }
  }
}
</script>

<style lang="less">

</style>



