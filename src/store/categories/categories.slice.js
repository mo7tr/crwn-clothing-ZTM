import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

const initialState = {
  value: [],
  isLoading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories", // = action type
  async (_, { rejectWithValue }) => {
    try {
      const categoriesArray = await getCategoriesAndDocuments("categories");
      return categoriesArray;
    } catch (error) {
      return rejectWithValue(
        "Seems there is an error fetching shop categories"
      );
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCategories.pending]: (state) => {
      state.isLoading = true;
    },

    [fetchCategories.fulfilled]: (state, action) => {
      state.value = action.payload;
      state.isLoading = false;
    },

    [fetchCategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default categoriesSlice.reducer;
