import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk('Form/fetchCategories', async()=>{
    
})

export const FormSlice = createSlice({
  name: "Form",
  initialState: {
    Categories: [],
    SecondCategores: [],
  },
  reducers: {},
  extraReducers(builder) {},
});

export default FormSlice.reducer;
