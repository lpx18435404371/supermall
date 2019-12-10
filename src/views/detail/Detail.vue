<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
      <detail-param-info :paramInfo="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <bake-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addToCart"/>
    <!-- <toast :message="message" :show="show"/> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps//DetailBaseInfo'
import DetailShopInfo from './childComps//DetailShopInfo'
import DetailGoodsInfo from './childComps//DetailGoodsInfo'
import DetailParamInfo from './childComps//DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
// import Toast from 'components/common/toast/Toast'

import {getDetail, GoodsInfo, Shop, GoodsParam, getRecommend} from 'network/detail'
import {itemListenerMixin, backTopMixin} from 'common/mixin'
import {debounce} from 'common/utils'

import { mapActions } from 'vuex'

export default {
  name: 'Detail',
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // message: '',
      // show: false
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    // Toast
  },
  created() {
    //保存传入的id
    this.iid = this.$route.params.iid;

    //详情数据---根据ID请求轮播图数据
    getDetail(this.iid).then(res =>{
      //console.log(res);
      const data = res.data.result
      this.topImages = data.itemInfo.topImages

      //获取参数商品数据
      this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)

      //店铺参数信息
      this.shop = new Shop(data.shopInfo)

      //详情参数数据
      this.detailInfo = data.detailInfo

      //获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //取出评论信息
      if(data.rate.cRate!== 0){
        this.commentInfo = data.rate.list[0]
      }
      
    })
    
    //请求详情推荐数据
    getRecommend().then(res =>{
      console.log(res);
      this.recommends = res.data.data.list
      
    })
    
    this.getThemeTopY = debounce(() =>{
      
      this.themeTopYs = []

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
        this.themeTopYs.push(Number.MAX_VALUE)

        console.log(this.themeTopYs);
    }, 50)
  },
  methods: {
    // imgLoad(){
    //   this.$refs.scroll.refresh()
    // }
    ...mapActions(['addCart']),

    detailImageLoad(){
      this.newRefresh(); 
      
      this.getThemeTopY()
      
    },
    titleClick(index){
      //console.log(index);   
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
    },
    contentScroll(position){
      const positionY = -position.y

      let length = this.themeTopYs.length
      for(let i= 0; i< length- 1; i++){
        // if(positionY> this.themeTopYs[parseInt(i)] && positionY< this.themeTopYs[parseInt(i+1)]){
        //   console.log(i);         
        // }
        
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
          
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
        // if (this.currentIndex !== i && ((i < length -1 && positionY>= this.themeTopYs[i] && positionY< this.themeTopYs[i+1]) || (i === length -1 && positionY>= this.themeTopYs[i]))) {
        //   this.currentIndex = i
        //   console.log(this.currentIndex);
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }
      }

      //判断BakeTop是否显示
      (-position.y) >1000 ? this.isShowBackTop = true : this.isShowBackTop = false
    },
    addToCart(){
      //获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.dec = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      product.count = 1

      //将商品添加到购物车
      this.addCart(product).then(res =>{
        // this.show = true
        // this.message = res
        
        // setTimeout(() =>{
        //   this.show = false
        //   this.message = ''
        // },1500)

        this.$toast.show(res)
      })
    }
  },
  mounted() {
    
  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
}
</script>

<style scoped>
  #detail{
    position: absolute;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff
  }
  .content{
    height: calc(100% - 44px - 49px);
    overflow: hidden; /**这里不加overflow: hidden;的话还会有原生鼠标滚动 */
  }
</style>