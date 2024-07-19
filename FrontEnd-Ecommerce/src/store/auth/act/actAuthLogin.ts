import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@util/isAxiosErrorHandler";


type TFormData={
  password:string,
  email:string,
  }
  type TResponse = {
    user: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
    };
    accessToken: string;
  };
  const actAuthLogin = createAsyncThunk(
    "auth/actAuthLogin",
    async (formData:TFormData, thunkAPI) => {
    const {rejectWithValue}= thunkAPI
  
    try {
      const res = await axios.post<TResponse>("http://localhost:5006/login",formData)
      return res.data
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error))
    }
    })
  export default actAuthLogin;