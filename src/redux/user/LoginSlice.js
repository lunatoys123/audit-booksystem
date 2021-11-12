import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetLoginName = createAsyncThunk(
  "user/fetchUser",
  async (props) => {
    const username = props.username;
    const password = props.password;
    const response = await axios.get("http://localhost:3001/login", {
      params: { username, password },
    });

    return response.data.uname;
  }
);

export const LoginSlice = createSlice({
  name: "Login",
  initialState: {
    loginName: "",
    loginState: "init",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetLoginName.rejected, (state, action) => {
        return { ...state, loginState: "failed" };
      })
      .addCase(GetLoginName.fulfilled, (state, action) => {
        if (action.payload === undefined) {
          return { ...state, loginState: "failed" };
        } else {
          return { loginState: "Success", loginName: action.payload };
        }
      });
  },
});

export default LoginSlice.reducer;

export const selectLoginState = (state) => state.Login.loginState;

export const selectLoginName = (state) => state.Login.loginName;
