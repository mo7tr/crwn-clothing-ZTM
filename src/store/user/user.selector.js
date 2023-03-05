import { createSelector } from "@reduxjs/toolkit";

const selectUserReducer = (state) => state.user;

export const selectCurrentUser = createSelector(
  selectUserReducer,
  (userSlice) => userSlice.value
);

export const selectUserIsLoadingSignUp = createSelector(
  selectUserReducer,
  (userSlice) => userSlice.isLoadingSignUp
);

export const selectUserIsLoadingSignIn = createSelector(
  selectUserReducer,
  (userSlice) => userSlice.isLoadingSignIn
);
