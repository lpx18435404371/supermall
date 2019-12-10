<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartPiece}})</div>
    </nav-bar>
    <cart-list/>
    <CartButtomBar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps//CartList'
import CartButtomBar from './childComps/CartButtomBar'

import { mapGetters } from 'vuex'

export default {
  name:"ShopCart",
  components: {
    NavBar,
    CartList,
    CartButtomBar
  },
  computed: {
    ...mapGetters(['cartList']),
    cartPiece(){
      return this.cartList.reduce((oldAdded, item) =>{
        return oldAdded + item.count
      }, 0)
    }
  },
}
</script>

<style scoped>
  .cart{
    height: 100vh;
    position: relative;
  }
  .nav-bar{
    background: var(--color-tint);
    color:#fff;
  }
</style>