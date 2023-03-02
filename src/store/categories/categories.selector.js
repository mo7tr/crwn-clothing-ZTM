import { createSelector } from "@reduxjs/toolkit";

const selectCategoryReducer = (state) => state.categories.value;

export const selectCategoriesMap = createSelector(
  selectCategoryReducer,
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;

      return acc;
    }, {})
);
