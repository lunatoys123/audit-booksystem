import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBorrowedBook = createAsyncThunk(
  "Return/fetchBorrowedBook",
  async (props) => {
    const page = Number(props.page);
    const limit = Number(props.limit);

    const response = await axios.get(
      "http://localhost:3001/fetchBorrowedBook",
      {
        params: { page, limit, ...props },
      }
    );

    return response.data;
  }
);

export const SearchBorrowedBook = createAsyncThunk(
  "Return/SearchBorrowedBook",
  async (props) => {
    const page = 1;
    const limit = Number(props.limit);

    const response = await axios.get(
      "http://localhost:3001/fetchBorrowedBook",
      {
        params: { page, limit, ...props },
      }
    );

    return { limit, data: response.data };
  }
);

export const fetchTotalBorrowedBook = createAsyncThunk(
  "Return/TotalBorrowedBook",
  async (props) => {
    const limit = Number(props.limit);
    const ComputerNo = props.ComputerNo;

    const response = await axios.get(
      "http://localhost:3001/fetchTotalBorrowedBook",
      {
        params: { ComputerNo },
      }
    );

    return Math.ceil(Number(response.data.totalNumber) / limit);
  }
);

export const fetchNextPage = createAsyncThunk(
  "Return/NextPage",
  async (props) => {
    const page = Number(props.page) + 1;
    const limit = Number(props.limit);

    const response = await axios.get(
      "http://localhost:3001/fetchBorrowedBook",
      {
        params: { page, limit, ...props },
      }
    );

    return response.data;
  }
);

export const fetchPreviousPage = createAsyncThunk(
  "Return/PreviousPage",
  async (props) => {
    const page = Number(props.page) - 1;
    const limit = Number(props.limit);

    const response = await axios.get(
      "http://localhost:3001/fetchBorrowedBook",
      {
        params: { page, limit, ...props },
      }
    );

    return response.data;
  }
);

export const fetchToTargetPage = createAsyncThunk(
  "Return/fetchToTargetPage",
  async (props) => {
    const page = Number(props.page);
    const limit = Number(props.limit);

    const response = await axios.get(
      "http://localhost:3001/fetchBorrowedBook",
      {
        params: { page, limit, ...props },
      }
    );

    return { page, data: response.data };
  }
);

export const ReturnSlice = createSlice({
  name: "Return",
  initialState: {
    page: 1,
    offset: 0,
    data: [],
    limit: 5,
    totalPage: 0,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchBorrowedBook.fulfilled, (state, action) => {
      return { ...state, data: action.payload };
    });
    builder.addCase(SearchBorrowedBook.fulfilled, (state, action) => {
      return {
        ...state,
        page: 1,
        limit: action.payload.limit,
        data: action.payload.data,
      };
    });
    builder.addCase(fetchTotalBorrowedBook.fulfilled, (state, action) => {
      return { ...state, totalPage: action.payload };
    });
    builder.addCase(fetchNextPage.fulfilled, (state, action) => {
      return { ...state, page: state.page + 1, data: action.payload };
    });
    builder.addCase(fetchPreviousPage.fulfilled, (state, action) => {
      return { ...state, page: state.page - 1, data: action.payload };
    });
    builder.addCase(fetchToTargetPage.fulfilled, (state, action) => {
      return { ...state, page: action.payload.page, data: action.payload.data };
    });
  },
});

export default ReturnSlice.reducer;

export const SelectPage = (state) => state.Return.page;

export const SelectLimit = (state) => state.Return.limit;

export const SelectData = (state) => state.Return.data;

export const SelectTotalPage = (state) => state.Return.totalPage;
