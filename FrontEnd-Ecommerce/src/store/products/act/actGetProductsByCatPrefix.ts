import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProduct} from "@types"
import axiosErrorHandler from "../../../util/isAxiosErrorHandler";

type TResponse = TProduct[];

const actGetProductsByCatPrefix= createAsyncThunk (
  "products/actGetProductsByCatPrefix",
  async(prefix:string, thunkAPI)=> {
    const{rejectWithValue,signal} =thunkAPI;
    try{
      const response = await axios.get<TResponse>(`http://localhost:5006/products?cat_prefix=${prefix}`,{signal})
      return response.data
  
    }catch(error){
      return rejectWithValue(axiosErrorHandler(error))
    }
  }
)
export default actGetProductsByCatPrefix;