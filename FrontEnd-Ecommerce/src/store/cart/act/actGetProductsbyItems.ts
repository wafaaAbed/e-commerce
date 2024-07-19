import { TProduct } from "@types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axiosErrorHandler from "@util/isAxiosErrorHandler";
import axios from "axios";

type TResponse = TProduct[];

const actGetProductsByItems = createAsyncThunk(
  "cart/actGetProductsByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, fulfillWithValue, signal } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsId = Object.keys(cart.items);

    // when cart 0 will return emty array
    if (!itemsId.length) return fulfillWithValue([]);
    
    try {
      // to apear http://localhost:5005/products?id=1&&id=2

      const response = await axios.get<TResponse>(
        `http://localhost:5006/products`,
        { signal }
      );
    
    const allProducts= response.data;
    const itemsIdNumber = itemsId.map(item => +item )

    
    const fullInfoProducts = itemsIdNumber.map((itemId=> (
      allProducts.find(p => +p.id === itemId  )
      
    ) ))   
  
    if (!fullInfoProducts.length) return fulfillWithValue([]);

      return fullInfoProducts as TProduct[];
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProductsByItems;
