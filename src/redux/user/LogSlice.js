import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLog = createAsyncThunk("Log/fetchLogs", async (props) => {
  const page = Number(props.page);
  const limit = Number(props.limit);

  const response = await axios.get("http://localhost:3001/fetchLog", {
    params: { page, limit, ...props },
  });

  return response.data;
});

export const fetchTotalLog = createAsyncThunk(
  "Log/fetchTotalLog",
  async (props) => {
    const limit = props.limit;
    const response = await axios.get("http://localhost:3001/fetchTotalLog", {
      params: { ...props },
    });

    return Math.ceil(Number(response.data.totalNumber) / limit);
  }
);

export const SearchLog = createAsyncThunk("Log/SearchLog", async (props) => {
  const page = 1;
  const limit = Number(props.limit);

  const response = await axios.get("http://localhost:3001/fetchLog", {
    params: { page, limit, ...props },
  });

  return { page, limit, data: response.data };
});

export const NextPage = createAsyncThunk("Log/NextPage", async (props) => {
  const page = Number(props.page) + 1;
  const limit = Number(props.limit);

  const response = await axios.get("http://localhost:3001/fetchLog", {
    params: { page, limit, ...props },
  });

  return response.data;
});

export const fetchToCertainPage = createAsyncThunk(
  "Log/FetchToCertainPage",
  async (props) => {
    const page = Number(props.page);
    const limit = Number(props.limit);

    const response = await axios.get("http://localhost:3001/fetchLog", {
      params: { page, limit, ...props },
    });

    return { page, data: response.data };
  }
);

export const PreviousPage = createAsyncThunk(
  "Log/PreviousPage",
  async (props) => {
    const page = Number(props.page) - 1;
    const limit = Number(props.limit);

    const response = await axios.get("http://localhost:3001/fetchLog", {
      params: { page, limit, ...props },
    });

    return response.data;
  }
);

export const LogSlice = createSlice({
  name: "Log",
  initialState: {
    page: 1,
    offset: 0,
    data: [],
    limit: 5,
    totalPage: 0,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchLog.fulfilled, (state, action) => {
      return { ...state, data: action.payload };
    });
    builder.addCase(fetchTotalLog.fulfilled, (state, action) => {
      return { ...state, totalPage: action.payload };
    });
    builder.addCase(SearchLog.fulfilled, (state, action) => {
      return {
        ...state,
        page: action.payload.page,
        data: action.payload.data,
        limit: action.payload.limit,
      };
    });
    builder.addCase(NextPage.fulfilled, (state, action) => {
      return { ...state, data: action.payload, page: state.page + 1 };
    });
    builder.addCase(PreviousPage.fulfilled, (state, action) => {
      return { ...state, data: action.payload, page: state.page - 1 };
    });
    builder.addCase(fetchToCertainPage.fulfilled, (state, action) => {
      return { ...state, data: action.payload.data, page: action.payload.page };
    });
  },
});

export default LogSlice.reducer;

export const SelectData = (state) => state.Log.data;

export const SelectPage = (state) => state.Log.page;

export const SelectLimit = (state) => state.Log.limit;

export const SelectTotalPage = (state) => state.Log.totalPage;
