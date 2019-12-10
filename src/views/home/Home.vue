<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control" 
                 :titles="['流行','新款','精选']"
                 @tabClick = "tabClick"
                 ref="tabControl1" v-show="isTabFixed"/>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
        <home-swiper :banners='banners' @swiperImageLoad="swiperImageLoad"/>
        <recommend-view :recommends='recommends'/>
        <feature-view/>
        <tab-control :titles="['流行','新款','精选']"
                     @tabClick = "tabClick"
                     ref="tabControl2"/>
        <goods-list :goods="showGoods"/>
        <p class="load-more">加载更多......</p>
    </scroll>        
    <bake-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

import {getHomeMultidata, getHomeGoods} from 'network/home.js'
import {itemListenerMixin, backTopMixin} from 'common/mixin'

export default {
  name:"Home",
  mixins: [itemListenerMixin, backTopMixin],
  data(){
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',      
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  destroyed() {
    console.log('Home destroyed') 
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    //保存Y值
    this.saveY = this.$refs.scroll.getScrollY()

    //取消全局事件监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  created(){
    //请求多个数据
    this.getHomeMultidata();

    //请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },

  methods: {
    //事件监听相关的
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break      
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    
    contentScroll(position){
      //判断BakeTop是否显示 这里的1000为了可读性写成常量比较好 
      (-position.y) >1000 ? this.isShowBackTop = true : this.isShowBackTop = false
      //this.isShowBackTop = (-position.y) > 1000

      //决定TabControl是否吸顶(postion: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType);
      //this.$refs.scroll.refresh()
    },
    swiperImageLoad(){
      //获取TabControl的OffsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    //网络请求相关的方法
    getHomeMultidata(){
        getHomeMultidata().then(res =>{
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list; 
      })
    },
    getHomeGoods(type){
        //获取页码
        const page = this.goods[type].page + 1;
        // console.log(this.goods[type].page)
        getHomeGoods(type, page).then(res =>{
          this.goods[type].list.push(...res.data.data.list);
          //把页码加一
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
  #home{
    /*padding-top:44px ;*/
    height: 100vh;
    position: relative;
    background-color: #fff
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 500;
/* 在浏览器使用原生滚动时，为了不让导航跟随一起滚动
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .tab-control{
    position: relative;
    z-index: 9;
    top: -2px
  }
  .content{
    overflow: hidden;

    position: absolute;
    top: 40px;
    bottom: 49px;
    left: 0;
    right: 0;
    /* height: calc(100% - 49px);
    overflow: hidden; */
  }
  .load-more{
    text-align: center;
    font-size: 15px
  }
  
</style>