import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import { TProduct } from "@types";
import axiosErrorHandler from "@util/isAxiosErrorHandler";
import axios from "axios";

type TResponse = TProduct[];

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal, getState, fulfillWithValue } = thunkAPI;
    const {wishlist} = getState() as RootState;
    const userWishlist = wishlist.itemsId;
    
    try {
      // const userWishlist = await axios.get<{ productId: number }[]>(
      //   `http://localhost:5006/wishlist?userId=${auth.user?.id}`,
      //   { signal }
      // );

      const response = await axios.get<TResponse>(
        `http://localhost:5006/products`,
        { signal }
      );
      const allProducts= response.data;

      const fullInfoProducts = userWishlist.map((itemId) =>
        allProducts.find((p) => p.id === itemId)
      );
    
      if (!userWishlist) return fulfillWithValue([]);
      if (!fullInfoProducts) return fulfillWithValue([]);
  
      return fullInfoProducts as TProduct[];
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
export default actGetWishlist;
