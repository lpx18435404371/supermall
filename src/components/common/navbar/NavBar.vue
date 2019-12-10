<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div><slot></slot>
    <div class="center"><slot name="center"></slot></div><slot></slot>
    <div class="right"><slot name="right"></slot></div><slot></slot>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.nav-bar{
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  box-shadow: 0 1px 1px rgba(100, 100, 100, .1)
}
.left,.right{
  width: 60px;
}
.center{
  flex: 1;
}
</style>