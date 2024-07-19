import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@util/isAxiosErrorHandler";
import { RootState } from "@store/index";

const actLikeToggle = createAsyncThunk(
  "wishlist/actLikeToggle",
  async (id:number, thunkAPI) => {
    const { rejectWithValue ,getState} = thunkAPI;
    const { auth } = getState() as RootState;
    const userId = auth.user?.id;
    try {
      const isRecordExist = await axios.get(
        `http://localhost:5006/wishlist?userId=${auth.user?.id}&productId=${id}`
      );
  
      if (isRecordExist.data.length > 0 ) {
        await axios.delete(`http://localhost:5006/wishlist/${isRecordExist.data[0].id}`);

        return { type: "remove", id };
      } else {
        await axios.post("http://localhost:5006/wishlist", { userId:userId, productId: id });
        
        return { type: "add", id };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actLikeToggle;
