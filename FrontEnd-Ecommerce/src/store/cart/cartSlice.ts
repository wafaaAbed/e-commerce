import { createSlice } from "@reduxjs/toolkit";
import { TLoading, TProduct, isString } from "@types";
import { getCartTotalQuantitySelcotor } from "./selector";
import actGetProductsByItems from "./act/actGetProductsbyItems";
import { authLogout } from "@store/auth/authSlice";

interface ICartState{
  loading : TLoading,
  error:null | string,
  items: { [key: string]: number };
  productFullinfo:TProduct[] ;
}

const initialState:ICartState={
  loading : "idle",
  error:null,
  items:{},
  productFullinfo:[]
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers:{
      addToCart:(state,action)=>{
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    
    },
    cartItemChangeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    cartItemRemove: (state, action) => {
      delete state.items[action.payload];
      state.productFullinfo = state.productFullinfo.filter(
        (el) => el.id !== action.payload
      );
    },
    productsFullInCleanUp: (state) => {
      state.productFullinfo = [];
    },
    clearCartAfterPlaceOrder: (state) => {
      state.items={};
      state.productFullinfo=[];
    }
  },
  extraReducers:(builder)=> {
    builder.addCase(actGetProductsByItems.pending,(state)=>{
      state.loading ="succeeded" ;
      state.error =null ;
    });
    builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productFullinfo = action.payload;
  
    });
    builder.addCase(actGetProductsByItems.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
       // when logout reset
       builder.addCase(authLogout, (state) => {
        state.items = {};
        state.productFullinfo = [];
      });
  }, 
})
export default cartSlice.reducer;
export const {addToCart,productsFullInCleanUp,cartItemChangeQuantity,clearCartAfterPlaceOrder,cartItemRemove}=cartSlice.actions;
export {getCartTotalQuantitySelcotor,actGetProductsByItems}