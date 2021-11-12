import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetUserData = createAsyncThunk("user/GetUser", async () => {
  const response = await axios.get("http://localhost:3001/getUser");
  return response.data;
});

export const GetUpdateUserData = createAsyncThunk(
  "user/GetUpdate",
  async (props) => {
    const userId = props.userId;

    const response = await axios.get(
      "http://localhost:3001/getUserNameAndPassword",
      {
        params: { userId },
      }
    );

    return response.data;
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: [],
    usernameToUpdate: "",
    userpasswordToUpdate: "",
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(GetUserData.fulfilled, (state, action) => {
      return { ...state, userData: action.payload };
    });
    builder.addCase(GetUpdateUserData.fulfilled, (state, action)=>{
      return {...state, usernameToUpdate: action.payload.username, userpasswordToUpdate: action.payload.userpassword}
    })
  },
});

export default userSlice.reducer;

export const SelectUserData = (state) => state.user.userData;

export const SelectUpdateUsername = (state) => state.user.usernameToUpdate;

export const SelectupdateUserPassword = (state) =>
  state.user.userpasswordToUpdate;
