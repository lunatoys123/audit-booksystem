import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk("Book/fetchBook", async (props) => {
  const page = Number(props.page);
  const limit = Number(props.limit);

  const response = await axios.get("http://localhost:3001/fetchBooks", {
    params: { page, limit, ...props },
  });
  console.log(response);
  return response.data;
});

export const fetchTotalPage = createAsyncThunk(
  "Book/fetchTotalPage",
  async (props) => {
    const limit = Number(props.limit);

    const response = await axios.get("http://localhost:3001/fetchTotalPage", {
      params: { ...props },
    });

    return Math.ceil(Number(response.data.totalNumber) / limit);
  }
);

export const NextPage = createAsyncThunk("Book/fetchNextPage",async(props)=>{
  
})

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
  extraReducers(builder) {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      return { ...state, data: action.payload };
    });
    builder.addCase(fetchTotalPage.fulfilled, (state, action) => {
      return { ...state, totalPage: action.payload };
    });
  },
});

export default DataSlice.reducer;

export const selectLimit = (state) => state.data.limit;

export const selectData = (state) => state.data.data;

export const selectTotalPage = (state) => state.data.totalPage;

export const selectPage = (state) => state.data.page;
