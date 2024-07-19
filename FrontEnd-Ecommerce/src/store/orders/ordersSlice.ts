import { createSlice } from "@reduxjs/toolkit";
import { TLoading, TOrderItem, isString } from "@types";
import actGetOrders from "./act/actGetOrders";
import actPlaceOrder from "./act/actPlaceOrder";
interface IOrderState{
  
  loading : TLoading,
  error:null | string,
  isOrdering:boolean;
  orderList:TOrderItem[]
}

const initialState : IOrderState={

  loading : "idle",
  error:null,
  isOrdering:false,
  orderList:[]

}

const orderstSlice = createSlice({
  name: 'order',
  initialState,
  reducers:{
    IsOrderingItems:(state)=>{
    state.isOrdering = !state.isOrdering
    
    },
    resetOrderSatus:(state)=>{
      state.error = null;
      state.loading = "idle";
    }

  },
  extraReducers:(builder)=>{
    builder.addCase(actPlaceOrder.pending,(state)=>{
      state.loading ="succeeded" ;
      state.error =null ;
    });
    builder.addCase(actPlaceOrder.fulfilled, (state) => {
      state.loading = "succeeded";
      // state.orderList = action.payload;
    });
    builder.addCase(actPlaceOrder.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    //get Orders
    builder.addCase(actGetOrders.pending,(state)=>{
      state.loading ="succeeded" ;
      state.error =null ;
    });
    builder.addCase(actGetOrders.fulfilled, (state,action) => {
      state.loading = "succeeded";
      state.orderList = action.payload;
    });
    builder.addCase(actGetOrders.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

  },
});
export {actGetOrders,actPlaceOrder}
export default orderstSlice.reducer;
export const {IsOrderingItems,resetOrderSatus}=orderstSlice.actions