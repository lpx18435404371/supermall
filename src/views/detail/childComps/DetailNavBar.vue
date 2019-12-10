<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles"
             class="title-item"
             :key="index"
             :class="{active: index === currentIndex}"
             @click="titleClick(index)">
           {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index){
      //console.log(index);
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    backClick(){
      // console.log(this.$route)
      // console.log(this.$router)
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 13px
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-height-text)
  }
  .back{
    margin-top: 6px
  }
</style>