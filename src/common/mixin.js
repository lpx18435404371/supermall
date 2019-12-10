import {debounce} from 'common/utils'

import BakeTop from 'components/content/bakeTop/BakeTop'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 50)

    this.itemImgListener = ()=>{
      this.newRefresh() 
      //this.$refs.scroll.refresh()    
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    //console.log('我是混入的内容');
    
  },
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BakeTop
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
  },
}

import {POP, NEW, SELL} from "./const";

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}