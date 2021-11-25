import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBorrowHistory = createAsyncThunk(
  "Borrow/fetchBorrowHistory",
  async (props) => {
    const page = Number(props.page);
    const limit = Number(props.limit);

    const response = await axios.get(
      "http://localhost:3001/fetchBorrowHistory",
      {
        params: { page, limit, ...props },
      }
    );

    return response.data;
  }
);

export const SearchBorrowHistory = createAsyncThunk(
  "Borrow/SearchBorrowHistory",
  async (props) => {
    const page = 1;
    const limit = Number(props.limit);

    const response = await axios.get(
      "http://localhost:3001/fetchBorrowHistory",
      {
        params: { page, limit, ...props },
      }
    );
    return { page, limit, data: response.data };
  }
);

export const fetchTotalBorrowHistory = createAsyncThunk(
  "Borrow/fetchTotalBorrowHistory",
  async (props) => {
    const limit = Number(props.limit);

    const response = await axios.get(
      "http://localhost:3001/fetchTotalBorrowHistory",
      {
        params: { ...props },
      }
    );

    return Math.ceil(Number(response.data.totalNumber) / limit);
  }
);

export const NextPage = createAsyncThunk("Borrow/nextPage", async (props) => {
  const page = Number(props.page + 1);
  const limit = Number(props.limit);

  const response = await axios.get("http://localhost:3001/fetchBorrowHistory", {
    params: { page, limit, ...props },
  });

  return response.data;
});

export const PreviousPage = createAsyncThunk(
  "Borrow/PreviousPage",
  async (props) => {
    const page = Number(props.page - 1);
    const limit = Number(props.limit);

    const response = await axios.get(
      "http://localhost:3001/fetchBorrowHistory",
      {
        params: { page, limit, ...props },
      }
    );

    return response.data;
  }
);

export const fetchToCertainPage = createAsyncThunk(
  "Borrow/FetchToCertainPage",
  async (props) => {
    const page = Number(props.page);
    const limit = Number(props.limit);

    const response = await axios.get(
      "http://localhost:3001/fetchBorrowHistory",
      {
        params: { page, limit, ...props },
      }
    );

    return { page, data: response.data };
  }
);
export const borrowSlice = createSlice({
  name: "borrow",
  initialState: {
    page: 1,
    offset: 0,
    data: [],
    limit: 5,
    totalPage: 0,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchBorrowHistory.fulfilled, (state, action) => {
      return { ...state, data: action.payload };
    });
    builder.addCase(SearchBorrowHistory.fulfilled, (state, action) => {
      return {
        ...state,
        page: action.payload.page,
        data: action.payload.data,
        limit: action.payload.limit,
      };
    });
    builder.addCase(fetchTotalBorrowHistory.fulfilled, (state, action) => {
      return { ...state, totalPage: action.payload };
    });
    builder.addCase(NextPage.fulfilled, (state, action) => {
      return { ...state, page: state.page + 1, data: action.payload };
    });
    builder.addCase(PreviousPage.fulfilled, (state, action) => {
      return { ...state, page: state.page - 1, data: action.payload };
    });
    builder.addCase(fetchToCertainPage.fulfilled, (state, action) => {
      return { ...state, page: action.payload.page, data: action.payload.data };
    });
  },
});

export default borrowSlice.reducer;

export const SelectPage = (state) => state.borrow.page;

export const SelectLimit = (state) => state.borrow.limit;

export const SelectData = (state) => state.borrow.data;

export const SelectTotalPage = (state) => state.borrow.totalPage;
