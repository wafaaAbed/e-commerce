import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import axiosErrorHandler from "../../../util/isAxiosErrorHandler"
import { TCategory } from "@types";

type TResponse=TCategory[];

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async(_,thunkAPI)=> {
    const{rejectWithValue,signal} =thunkAPI;
    try{
      const response = await axios.get<TResponse>("http://localhost:5006/categories",{signal})
    
      return response.data
  
    }catch(error){
      console.log("no")
      return rejectWithValue(axiosErrorHandler(error))
    }
  }
)
export default actGetCategories;