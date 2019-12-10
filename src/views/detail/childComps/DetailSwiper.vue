<template>
  <div class="detail-swiper">
    <swiper v-if="topImages.length">
      <swiper-item v-for="(item, index) in topImages" :key="index" class="swiper-item">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: 'DetailSwiper',
  props: {
    topImages: {
      type: Array,
      default(){
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
  .swiper-item{
    height: 400px;
    overflow: hidden;
  }
</style>