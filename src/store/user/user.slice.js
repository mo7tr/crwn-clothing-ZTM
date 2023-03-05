import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  signInWithGooglePopup,
  signInAuthWithEmailAndPassword,
  getCurrentUser,
} from "../../utils/firebase/firebase.utils";

import { authenticationHelper } from "./user.actionHelper";

const initialState = {
  value: null,
  isLoading: false,
  error: null,
};

// const unsubscribe = onAuthStateChangedListener((user) => {
//   if (user) {
//     createUserDocumentFromAuth(user);
//   }
//   const pickedUser =
//     user && (({ accessToken, email }) => ({ accessToken, email }))(user);

//   console.log("pickedUser", pickedUser);
//   return pickedUser;
// });

// export const getSnapshotFromUserAuth = createAsyncThunk(
//   "user/getSnapshotFromUserAuth",
//   async (userAuth, additionalDetails) => {
//     try {
//       const userSnapshot = await createUserDocumentFromAuth(
//         userAuth,
//         additionalDetails
//       );
//     } catch (error) {}
//   }
// );

export const isUserAuthenticated = createAsyncThunk(
  "user/isUserAuthenticated",
  async () => {
    try {
      const userAuth = await getCurrentUser();

      if (!userAuth) {
        console.log("!userAuth");
        return;
      }

      return authenticationHelper(userAuth);
    } catch (error) {
      console.log("isUserAuthenticated error: ", error);
      return error;
    }
  }
);

export const signInWithGooglePopupAction = createAsyncThunk(
  "user/signInWithGooglePopup",
  async () => {
    try {
      const { user } = await signInWithGooglePopup();

      return await authenticationHelper(user);
    } catch (error) {
      console.log("signInWithGoogle error: ", error);
      return error;
    }
  }
);

export const signInAuthWithEmailAndPasswordAction = createAsyncThunk(
  "user/signInAuthWithEmailAndPassword",
  async ({ email, password }) => {
    try {
      console.log(33);

      const { user } = await signInAuthWithEmailAndPassword(email, password);

      return await authenticationHelper(user);
    } catch (error) {
      console.log("signInWithEmailAndPassowrd error: ", error);
      return error;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [isUserAuthenticated.pending]: (state) => {
      state.isLoading = true;
    },

    [isUserAuthenticated.fulfilled]: (state, action) => {
      console.log("action.payload =>", action.payload);
      state.value = action.payload;
      state.isLoading = false;
    },
    [isUserAuthenticated.rejected]: (state, action) => {
      console.log("action.payload =>", action.payload);
      state.error = action.payload;
      state.isLoading = false;
    },

    [signInWithGooglePopupAction.pending]: (state) => {
      state.isLoading = true;
    },

    [signInWithGooglePopupAction.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.value = action.payload;
    },

    [signInWithGooglePopupAction.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [signInAuthWithEmailAndPasswordAction.pending]: (state) => {
      state.isLoading = true;
    },

    [signInAuthWithEmailAndPasswordAction.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.value = action.payload;
    },

    [signInAuthWithEmailAndPasswordAction.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
