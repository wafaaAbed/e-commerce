import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByCatPrefix from "./act/actGetProductsByCatPrefix";
import { TLoading, TProduct, isString } from "@types";
interface IProductState{
    loading : TLoading,
  error:null | string,
  records:TProduct[],
}

const initialState : IProductState={
  loading :"idle",
  error:null ,
  records:[],
}

const productSlice = createSlice({
  name: 'category',
  initialState,
  reducers:{
    productCleanup:(state)=>{
      state.records=[],
      state.error=null,
      state.loading ="idle"
    }
  },
  extraReducers:(builder)=> {
    builder.addCase(actGetProductsByCatPrefix.pending,(state)=>{
      state.loading ="succeeded" ;
      state.error =null ;
    });
    builder.addCase(actGetProductsByCatPrefix.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetProductsByCatPrefix.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    }, 
});
export{actGetProductsByCatPrefix}
export default productSlice.reducer
export const {productCleanup}= productSlice.actions