import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
    addCart(context, payload){
      return new Promise((resolve, reject)=>{

          // let oldProduct = null;
        // for(let item in state.cartList){
        //   if(item.iid === payload.iid){
        //     oldProduct = item
        //   }
        // }

        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

        if(oldProduct){
          //oldProduct.count += 1
          context.commit(ADD_COUNTER, oldProduct)
          resolve('当前商品数量+1')
        }else{
          //也可以一开始就传过来一个count属性
          //payload.count = 1
          //state.cartList.push(payload)
          context.commit(ADD_TO_CART, payload)
          resolve('添加了一个新的商品')
        }
      })

    }
    
}