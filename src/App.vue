<template>
  <div id="app">
    <tab-bar>
    <tab-bar-item>
      <img slot="item-icon" src="~assets/img/tabbar/home.png" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item>
      <img slot="item-icon" src="~assets/img/tabbar/category.png" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item>
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.png" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item>
      <img slot="item-icon" src="~assets/img/tabbar/profile.png" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from 'components/tabbar/TabBar'
import TabBarItem from 'components/tabbar/TabBarItem'


export default {
  name: 'app',
  components: {
   TabBar,
   TabBarItem
  }
}
</script>

<style scoped>
  @import 'assets/css/base.css';


</style>
