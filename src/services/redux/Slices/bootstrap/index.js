import GuestRequest from "@/services/axios/GuestRequest";
import Toastify from "@/components/sections/Toastify";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  brands: [],
  categories: [],
  targetGroups: [],
  isLoading: false,
  onRefresh: false,
  validators: {},
};

const bootstrapSlice = createSlice({
  name: "bootstrap",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //#################################################################
    builder.addCase(handleGetBootstrapBrands.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(handleGetBootstrapBrands.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(handleGetBootstrapBrands.fulfilled, (state, action) => {
      state.isLoading = false;
      state.onRefresh = false;
      state.brands = Array.isArray(action.payload) ? action.payload : [];
    });
    //#################################################################
    builder.addCase(handleGetBootstrapCategories.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(handleGetBootstrapCategories.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(handleGetBootstrapCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.onRefresh = false;
      state.categories = Array.isArray(action.payload.data)
        ? action.payload.data
        : [];
    });
    //#################################################################
    builder.addCase(handleGetBootstrapTargetGroups.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      handleGetBootstrapTargetGroups.rejected,
      (state, action) => {
        state.isLoading = false;
      }
    );
    builder.addCase(
      handleGetBootstrapTargetGroups.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.onRefresh = false;
        state.targetGroups = Array.isArray(action.payload)
          ? action.payload
          : [];
      }
    );
    //#################################################################
  },
});

export const handleGetBootstrapBrands = createAsyncThunk(
  "bootstrap/handleGetBrands",
  async (data, { rejectWithValue }) => {
    try {
      const response = await GuestRequest.get("product-brands");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Request failed");
    }
  }
);

export const handleGetBootstrapCategories = createAsyncThunk(
  "bootstrap/handleGetCategories",
  async (data, { rejectWithValue }) => {
    try {
      const response = await GuestRequest.get("categories");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Request failed");
    }
  }
);

export const handleGetBootstrapTargetGroups = createAsyncThunk(
  "bootstrap/handleGetBootstrapTargetGroups",
  async (data, { rejectWithValue }) => {
    try {
      const response = await GuestRequest.get("target-groups");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Request failed");
    }
  }
);

export const bootstrapSelector = (store) => store.bootstrap;
export const bootstrapReducer = bootstrapSlice.reducer;

export default bootstrapSlice;
