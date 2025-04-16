import GuestRequest from "@/services/axios/GuestRequest";
import Toastify from "@/components/sections/Toastify";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  stores: [],
  isLoading: false,
  onRefresh: false,
  validators: {},
};

const storesSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //#################################################################
    builder.addCase(handleGetStores.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(handleGetStores.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(handleGetStores.fulfilled, (state, action) => {
      state.isLoading = false;
      state.onRefresh = false;
      state.stores = action.payload?.data;
    });
    //#################################################################
    builder.addCase(handleCreateStore.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(handleCreateStore.rejected, (state, action) => {
      state.validators = action.payload?.validators ?? {};
      state.isLoading = false;
    });
    builder.addCase(handleCreateStore.fulfilled, (state, action) => {
      Toastify(1, action.payload?.message);
      state.isLoading = false;
      state.onRefresh = true;
    });
    //#################################################################
    builder.addCase(handleUpadateStore.pending, (state, action) => {
      console.log("pending");
      state.isLoading = true;
    });
    builder.addCase(handleUpadateStore.rejected, (state, action) => {
      console.log("faler");
      state.validators = action.payload?.validators ?? {};
      state.isLoading = false;
    });
    builder.addCase(handleUpadateStore.fulfilled, (state, action) => {
      console.log("success");
      Toastify(action.payload?.data?.type, action.payload?.data?.message);
      state.isLoading = false;
      state.onRefresh = true;
    });
    //#################################################################
    builder.addCase(handleDeleteStore.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(handleDeleteStore.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(handleDeleteStore.fulfilled, (state, action) => {
      Toastify(action.payload?.data?.type, action.payload?.data?.message);
      state.isLoading = false;
      state.onRefresh = true;
    });
  },
});

export const handleGetStores = createAsyncThunk(
  "stores/handleGetStores",
  async () => {
    const response = await GuestRequest.get("stores");
    return { data: response.data };
  }
);

export const handleCreateStore = createAsyncThunk(
  "stores/handleCreateStore",
  async (data, { rejectWithValue }) => {
    try {
      const response = await GuestRequest.post("stores", data);
      return { data: response.data };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Request failed");
    }
  }
);

export const handleDeleteStore = createAsyncThunk(
  "stores/handleDeleteStore",
  async ({ id, ids }, { rejectWithValue }) => {
    try {
      const response = await GuestRequest.delete("stores", {
        data: {
          ids: ids,
          id: id,
        },
      });
      return { data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Request failed");
    }
  }
);

export const handleUpadateStore = createAsyncThunk(
  "stores/handleUpadateStore",
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      const response = await GuestRequest.patch(`stores/${id}`, data);
      return { data: response.data };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Request failed");
    }
  }
);

export const storesSelector = (store) => store.stores;
export const storesReducer = storesSlice.reducer;

export default storesSlice;
