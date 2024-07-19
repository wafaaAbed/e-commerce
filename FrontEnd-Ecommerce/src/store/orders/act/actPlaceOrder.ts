import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@util/isAxiosErrorHandler";
import { RootState } from "@store/index";


const actPlaceOrder = createAsyncThunk(
  "orders/actPlaceOrder",
  async(subtotal:number,thunkAPI)=> {
    const{rejectWithValue,getState} =thunkAPI;
    const{cart,auth} = getState() as RootState;
    const orderItems = cart.productFullinfo.map((el)=>({
      id:el.id,
      title:el.title,
      price:el.price,
      img:el.img,
      quantity:el.quantity
    }))
    try{
      const response = await axios.post("http://localhost:5006/order",{
      userId:auth.user?.id,
      items:orderItems,
      subtotal,
      })
    
      return response.data
  
    }catch(error){
      return rejectWithValue(axiosErrorHandler(error))
    }
  }
)

export default actPlaceOrder;