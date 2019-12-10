<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton :is-checked="isSelectAll" class="check-button" @click.native="checkClick"/>
      <div>全选</div>
    </div>

    <div class="price">
      合计: {{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算 ({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'

export default {
  name: 'CartButtomBar',
  data() {
    return {
      isC: null
    }
  },
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice(){
      return '￥' + this.cartList.filter(item =>{
        return item.checked
      }).reduce((preValue, item) =>{
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength(){
      return this.cartList.filter(item =>item.checked).length
    },
    isSelectAll(){
      //  return !(this.cartList.filter(item => !item.checked).length)
      //console.log(this.cartList.filter(item => !item.checked).length); 

       if(this.cartList.length === 0)return false
      // return !this.cartList.find(item => !item.checked)
      
      for(let item of this.cartList){
        if(!item.checked){
          return false
        }       
      }
      return true
    }
  },
  methods: {
    checkClick(){
      this.isC = this.isSelectAll;
      // if(this.isC){//全部选中
      //   this.cartList.forEach(item => item.checked = false);
      // }else{
      //   this.cartList.forEach(item => item.checked = true);
      // }
      this.cartList.forEach(item => item.checked = !this.isC);
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请至少选择一件要购买的商品')
      }
      
    }
  },
}
</script>

<style scoped>
  .bottom-bar{
    position: relative;
    top: 6PX;
     display: flex;
     
    height: 45px;  
    line-height: 45px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid yellow;

    background-color: #fff;  
  }
  .check-content{
    display: flex;
    align-items: center;
    width: 70px;
    
  }
  .check-button{
    width: 16px;
    height: 16px;
    line-height: 20px;
    margin: 10px;
  }
  .price{
    margin-left: 120px;
    flex: 1
  }
  .calculate{
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center
  }
</style>
