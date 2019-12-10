<template>
  <div class="cart-list">
    <scroll class="content">
      <cart-list-item v-for="(item, index) in cartList" :itemInfo="item" :key="index"/>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

import { mapGetters } from 'vuex'

export default {
  name: 'CartList',
  computed: {
    ...mapGetters(['cartList'])
  },
  components: {
    Scroll,
    CartListItem
  }
}
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 44px - 49px - 49px);
  }
  .content{
    /* height: 100%; */
    overflow: hidden; 
  }
</style>
