import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@util/isAxiosErrorHandler";


type TFormData={
  firstName:string,
  lastName:string,
  password:string,
  email:string,
  }
  const actAuthRegister = createAsyncThunk(
    "auth/actAuthRegister",
    async (formData:TFormData, thunkAPI) => {
    const {rejectWithValue}= thunkAPI
  
    try {
      const res = await axios.post("http://localhost:5006/register",formData)
      console.log(res.data)
      return res.data
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error))
    }
    })
  export default actAuthRegister;