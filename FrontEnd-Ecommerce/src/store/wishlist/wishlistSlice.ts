import { createSlice } from "@reduxjs/toolkit";
import { TLoading, TProduct, isString } from "@types";
import actGetWishlist from "./act/actGetWishlist";
import actLikeToggle from "./act/actLikeToggle";
import { authLogout } from "@store/auth/authSlice";


interface IWishlistState{
  
  loading : TLoading,
  error:null | string,
  itemsId: number[];
  productFullinfo:TProduct[];
  
}

const initialState : IWishlistState={
  loading : "idle",
  error:null ,
  itemsId:[] ,
  productFullinfo:[],
  
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers:{
    // addToWishlist:(state,action)=>{
    //   state.itemsId.push(action.payload)
    // },
    productsFullInfoCleanUp:(state)=>{
      state.productFullinfo=[];
      state.loading = "idle";
      state.error=null ;
      }
      
  },
  extraReducers:(builder)=> {
    //actLikeToggle
    builder.addCase(actLikeToggle.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      
      if (action.payload.type === "add") {
          state.itemsId.push(action.payload.id);
        } else if (action.payload.type === "remove") {
        state.itemsId = state.itemsId.filter((el) => el !== action.payload.id);
              // when press btn dislike will hidden
        state.productFullinfo = state.productFullinfo.filter(
          (el) => el.id !== action.payload.id
        );
        
      }
      
    });

    //
    builder.addCase(actLikeToggle.rejected, (state, action) => {
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    // get wishlist items
    builder.addCase(actGetWishlist.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWishlist.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productFullinfo = action.payload;
      
    });
    builder.addCase(actGetWishlist.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    })
       // when logout reset
       builder.addCase(authLogout, (state) => {
        state.itemsId = [];
        state.productFullinfo = [];
      });
  }, 
});
export{actGetWishlist,actLikeToggle}
export default wishlistSlice.reducer;
export const {productsFullInfoCleanUp}= wishlistSlice.actions