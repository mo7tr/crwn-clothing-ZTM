import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;

const selectCategoryReducer = (state) => state.categories.value;

// export const selectCategories = createSelector(
//   [selectCategoryReducer],
//   (categoriesSlice) => {
//     console.log("calling selectCategories in create selector");
//     console.log("categoriesSlice", categoriesSlice);
//     console.log("categoriesSlice.categories", categoriesSlice.categories);
//     return categoriesSlice.categories;
//   }
// );

// export const selectCategoriesMap = createSelector(
//   [selectCategoryReducer],
//   (categories) => {
//     console.log("calling selectCategoriesMap in create selector", categories);
//     categories.reduce((acc, category) => {
//       const { title, items } = category;
//       acc[title.toLowerCase()] = items;
//       console.log("acc", acc);
//       return acc;
//     }, {});
//   }
// );

export const selectCategories = createSelector(
  (state) => {
    console.log("state.categories.value 1", state.categories.value);
    return state.categories.value;
  },
  (categoriesSlice) => {
    console.log("calling selectCategories in create selector");
    console.log("categoriesSlice", categoriesSlice);
    console.log("categoriesSlice.categories", categoriesSlice.categories);
    return categoriesSlice.categories;
  }
);

export const selectCategoriesMap = createSelector(
  (state) => {
    console.log("state.categories.value 2", state.categories.value);
    return state.categories.value;
  },
  (categories) => {
    console.log("calling selectCategoriesMap in create selector", categories);
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;

      return acc;
    }, {});
  }
);
