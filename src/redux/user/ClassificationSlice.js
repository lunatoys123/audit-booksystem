import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchClassification = createAsyncThunk(
  "Classification/fetchClassification",
  async (props) => {
    const page = Number(props.page);
    const limit = Number(props.limit);

    const response = await axios.get(
      "http://localhost:3001/fetchClassification",
      {
        params: { page, limit },
      }
    );

    return response.data;
  }
);

export const fetchTotalClassification = createAsyncThunk(
  "Classification/fetchTotalClassification",
  async (props) => {
    const limit = Number(props.limit);

    const response = await axios.get(
      "http://localhost:3001/fetchTotalClassification"
    );

    return Math.ceil(Number(response.data.totalNumber) / limit);
  }
);

export const GetClassificationData = createAsyncThunk(
  "Classification/GetClassificationData",
  async (props) => {
    const categoriesKey = props.categoriesKey;

    const response = await axios.get(
      "http://localhost:3001/GetClassificationData",
      {
        params: { categoriesKey },
      }
    );

    return response.data;
  }
);

export const fetchToCertainPage = createAsyncThunk(
  "Classification/FetchToCertainPage",
  async (props) => {
    const page = props.page;
    const limit = props.limit;

    const response = await axios.get(
      "http://localhost:3001/fetchClassification",
      {
        params: { page, limit },
      }
    );

    return { page, data: response.data };
  }
);

export const NextPage = createAsyncThunk(
  "Classification/NextPage",
  async (props) => {
    const page = Number(props.page + 1);
    const limit = Number(props.limit);

    const response = await axios.get(
      "http://localhost:3001/fetchClassification",
      {
        params: { page, limit },
      }
    );

    return response.data;
  }
);

export const PreviousPage = createAsyncThunk(
  "Classification/PreviousPage",
  async (props) => {
    const page = Number(props.page - 1);
    const limit = Number(props.limit);

    const response = await axios.get(
      "http://localhost:3001/fetchClassification",
      { params: { page, limit } }
    );

    return response.data;
  }
);

export const SearchClassification = createAsyncThunk(
  "Classification/SearchClassification",
  async (props) => {
    const page = 1;
    const limit = props.limit;
    console.log(limit);

    const response = await axios.get(
      "http://localhost:3001/fetchClassification",
      {
        params: { page, limit },
      }
    );

    return { page, limit, data: response.data };
  }
);
export const classificationSlice = createSlice({
  name: "Classification",
  initialState: {
    page: 1,
    offset: 0,
    data: [],
    limit: 5,
    totalPage: 0,
    updateClassificationName: "",
    updateClassificationDescription: "",
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchClassification.fulfilled, (state, action) => {
      return { ...state, data: action.payload };
    });
    builder.addCase(GetClassificationData.fulfilled, (state, action) => {
      return {
        ...state,
        updateClassificationName: action.payload.categories,
        updateClassificationDescription: action.payload.catedesc,
      };
    });
    builder.addCase(NextPage.fulfilled, (state, action) => {
      return { ...state, page: state.page + 1, data: action.payload };
    });
    builder.addCase(fetchTotalClassification.fulfilled, (state, action) => {
      return { ...state, totalPage: action.payload };
    });
    builder.addCase(PreviousPage.fulfilled, (state, action) => {
      return { ...state, page: state.page - 1, data: action.payload };
    });
    builder.addCase(fetchToCertainPage.fulfilled, (state, action) => {
      return { ...state, page: action.payload.page, data: action.payload.data };
    });
    builder.addCase(SearchClassification.fulfilled, (state, action) => {
      return {
        ...state,
        page: action.payload.page,
        limit: action.payload.limit,
        data: action.payload.data,
      };
    });
  },
});

export default classificationSlice.reducer;

export const SelectPage = (state) => state.Classification.page;

export const SelectLimit = (state) => state.Classification.limit;

export const SelectData = (state) => state.Classification.data;

export const SelectTotalPage = (state) => state.Classification.totalPage;

export const SelectUpdateClassificationName = (state) =>
  state.Classification.updateClassificationName;

export const SelectUpdateClassificationDescription = (state) =>
  state.Classification.updateClassificationDescription;
