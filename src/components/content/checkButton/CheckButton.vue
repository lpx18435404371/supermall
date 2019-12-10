<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>

export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .check-button{   
    border-radius: 50%;
    border: 1px solid #333;
    /* box-shadow: 1px 1px 1px #eee */
  }
  .check{
    border: 1px solid red;
    background-color: red
  }
</style>
