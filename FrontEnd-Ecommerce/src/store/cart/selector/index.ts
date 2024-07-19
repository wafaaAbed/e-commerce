import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/index";


const getCartTotalQuantitySelcotor= createSelector(
  (state:RootState)=> state.cart.items,
  (items)=>{
    const totalQuantity = Object.values(items).reduce(
      (acc:number,curren)=>{
        return (acc + curren );
      },0
    ) ;
return totalQuantity;
  }
)
export  {getCartTotalQuantitySelcotor};