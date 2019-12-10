<template>
    <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
export default {
  name:'tab-bar-item',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data(){
    return{
      // isActive:true
      // activeStyle: '#fff'
    }
  },
  methods:{
    itemClick(){
      if(this.$route.path!==this.path){
        this.$router.replace(this.path)
      }
      // console.log(this.path)  ,
      // console.log(this.activeColor)
    },
  },
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive? {color: this.activeColor} : {}
    }
  }
}
</script>

<style scoped>
 .tab-bar-item{
    flex: 1;
    text-align: center;
     height: 49px;
     margin-top: 8px;
  }
  .tab-bar-item img{
    width: 20px;
    height: 20px;
  }
  .active{
    color: red
  }
</style>