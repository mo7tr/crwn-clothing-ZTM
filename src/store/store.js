import { combineReducers, configureStore } from "@reduxjs/toolkit";

import logger from "redux-logger";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import user from "./user/user.slice";
import cart from "./cart/cart.slice";
import categories from "./categories/categories.slice";

const reducers = combineReducers({ user, cart, categories });

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
  blacklist: ["user"],
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export const persistor = persistStore(store);
