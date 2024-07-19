import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@util/isAxiosErrorHandler";
import { RootState } from "@store/index";
import { TOrderItem } from "@types";

type TResponse = TOrderItem[];



const actGetOrders = createAsyncThunk(
  "orders/actGetOrders",
  async(_,thunkAPI)=> {
    const{rejectWithValue,getState,signal} =thunkAPI;
    const {auth} = getState() as RootState
    
    try{
      const response = await axios.get<TResponse>(`http://localhost:5006/order?userId=${auth.user?.id}`,{signal})
        
      return response.data
  
    }catch(error){
      return rejectWithValue(axiosErrorHandler(error))
    }
  }
)
export default actGetOrders