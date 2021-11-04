import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk("Book/fetchBook", async (props) => {
  const page = Number(props.page);
  const limit = props.limit;
  const title = props.title;
  const author = props.author;
  const response = await axios.get("http://localhost:3001/AllBooks", {
    params: { page, limit, title, author },
  });

  return response.data;
});

export const DataSlice = createSlice({
  name: "user",
  initialState: {
    page: 1,
    offset: 0,
    data: [],
    limit: 5,
    totalPage: 0,
  },
  reducers: {},
  extraReducers(builder) {},
});

export default DataSlice.reducer;

export const selectLimit = (state) => state.data.limit;

export const selectData = (state) => state.data.data;

export const selectTotalPage = (state) => state.data.totalPage;

export const selectPage = (state) => state.data.page;
