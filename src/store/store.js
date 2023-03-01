// import { compose, createStore, applyMiddleware } from "redux";

// import logger from "redux-logger";

// import { rootReducer } from "./root-reducer";

// const middleWares = [logger];

// const composeEnhancers = compose(applyMiddleware(...middleWares));

// export const store = createStore(rootReducer, undefined, composeEnhancers);

import { configureStore } from "@reduxjs/toolkit";

import user from "./user/user.slice";
import cart from "./cart/cart.slice";
import categories from "./categories/categories.slice";

export const store = configureStore({
  reducer: {
    user,
    cart,
    categories,
  },
});
