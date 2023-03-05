import { createSelector } from "@reduxjs/toolkit";

const selectCategoryReducer = (state) => state.categories;

export const selectCategoriesMap = createSelector(
  selectCategoryReducer,
  (categoriesSlice) =>
    categoriesSlice.value.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;

      return acc;
    }, {})
);

export const selectCategoriesIsLoading = createSelector(
  selectCategoryReducer,
  (categoriesSlice) => categoriesSlice.isLoading
);

export const selectCategoriesError = (state) => state.categories.error;
