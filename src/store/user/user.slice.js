import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  signInWithGooglePopup,
  signInAuthWithEmailAndPassword,
  getCurrentUser,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from "../../utils/firebase/firebase.utils";

import { authenticationHelper } from "./user.actionHelper";

const initialState = {
  value: null,
  isLoadingSignIn: false,
  isLoadingSignUp: false,
  error: null,
};

export const isUserAuthenticated = createAsyncThunk(
  "user/isUserAuthenticated",
  async (_, { rejectWithValue }) => {
    try {
      const userAuth = await getCurrentUser();
      if (!userAuth) {
        console.log("!userAuth");
        return;
      }
      return authenticationHelper(userAuth);
    } catch (error) {
      alert(error);

      return rejectWithValue(error);
    }
  }
);

export const signInWithGooglePopupAction = createAsyncThunk(
  "user/signInWithGooglePopup",
  async (_, { rejectWithValue }) => {
    try {
      const { user } = await signInWithGooglePopup();

      return await authenticationHelper(user);
    } catch (error) {
      alert(error);
      return rejectWithValue(error);
    }
  }
);

export const signInAuthWithEmailAndPasswordAction = createAsyncThunk(
  "user/signInAuthWithEmailAndPassword",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { user } = await signInAuthWithEmailAndPassword(email, password);

      return await authenticationHelper(user);
    } catch (error) {
      alert(error);
      return rejectWithValue(error);
    }
  }
);

export const signUpAuthWithEmailAndPasswordAction = createAsyncThunk(
  "user/signUpAuthWithEmailAndPassword",
  async ({ email, password, displayName }, { rejectWithValue }) => {
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      return await authenticationHelper(user, { displayName });
    } catch (error) {
      alert(error);
      return rejectWithValue(error);
    }
  }
);

export const signOutUserAction = createAsyncThunk(
  "user/signOut",
  async (_, { rejectWithValue }) => {
    try {
      await signOutUser();

      return null;
    } catch (error) {
      alert(error);
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [isUserAuthenticated.pending]: (state) => {
      console.log("isUserAuthenticated? pending");
    },

    [isUserAuthenticated.fulfilled]: (state, action) => {
      state.value = action.payload;
    },
    [isUserAuthenticated.rejected]: (state, action) => {
      state.error = action.payload;
    },

    [signInWithGooglePopupAction.pending]: (state) => {
      state.isLoadingSignIn = true;
    },

    [signInWithGooglePopupAction.fulfilled]: (state, action) => {
      state.isLoadingSignIn = false;
      state.value = action.payload;
    },

    [signInWithGooglePopupAction.rejected]: (state, action) => {
      state.isLoadingSignIn = false;
      state.error = action.payload;
    },

    [signInAuthWithEmailAndPasswordAction.pending]: (state) => {
      state.isLoadingSignIn = true;
    },

    [signInAuthWithEmailAndPasswordAction.fulfilled]: (state, action) => {
      state.isLoadingSignIn = false;
      state.value = action.payload;
    },

    [signInAuthWithEmailAndPasswordAction.rejected]: (state, action) => {
      state.isLoadingSignIn = false;
      state.error = action.payload;
    },

    [signUpAuthWithEmailAndPasswordAction.pending]: (state) => {
      state.isLoadingSignUp = true;
    },

    [signUpAuthWithEmailAndPasswordAction.fulfilled]: (state, action) => {
      state.isLoadingSignUp = false;
      state.value = action.payload;
    },

    [signUpAuthWithEmailAndPasswordAction.rejected]: (state, action) => {
      state.isLoadingSignUp = false;
      state.error = action.payload;
    },

    [signOutUserAction.pending]: () => {
      console.log("signing out processing");
    },

    [signOutUserAction.fulfilled]: (state, action) => {
      console.log("fulfilled");
      state.value = action.payload;
    },

    [signOutUserAction.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
