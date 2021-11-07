import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "Form/fetchCategories",
  async () => {
    const response = await axios.get("http://localhost:3001/fetchCategories");
    return response.data;
  }
);

export const FormSlice = createSlice({
  name: "Form",
  initialState: {
    Categories: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      return { Categories: action.payload };
    });
  },
});

export default FormSlice.reducer;

export const selectCategories = (state) => state.Form.Categories;
