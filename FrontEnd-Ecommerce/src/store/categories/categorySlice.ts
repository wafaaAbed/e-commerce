import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import { TCategory, TLoading, isString } from "@types";


interface ICategoryState{
  loading : TLoading,
  error:null | string,
  records:TCategory[],
}

const initialState : ICategoryState={
  loading :"idle",
  error:null ,
  records:[],
}

const categoriestSlice = createSlice({
  name: 'category',
  initialState,
  reducers:{
    categoryCleanup:(state)=>{
      state.records=[],
      state.error=null,
      state.loading ="idle"
    }
  },
  extraReducers:(builder)=> {
    builder.addCase(actGetCategories.pending,(state)=>{
      state.loading ="succeeded" ;
      state.error =null ;
    });
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    }, 
});
export {actGetCategories};
export default categoriestSlice.reducer
export const {categoryCleanup}= categoriestSlice.actions