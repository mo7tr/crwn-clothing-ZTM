import { createContext, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((item) => item.id !== cartItemToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

/// REDUCER

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const CART_ACTION_TYPES = {
  IS_CART_OPEN: "IS_CART_OPEN",
  ADD_ITEM_TO_CART: "ADD_ITEM_TO_CART",
  REMOVE_ITEM_FROM_CART: "REMOVE_ITEM_FROM_CART",
  CLEAR_ITEM_FROM_CART: "CLEAR_ITEM_FROM_CART",
};

const cartReducer = (state, action) => {
  console.log(1, state);
  console.log(11, action);

  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };

    case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
      return {
        ...state,
        cartItems: addCartItem(state.cartItems, payload),
        cartCount: state.cartCount + 1,
        cartTotal:
          state.cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
          ) + payload.price,
      };

    case CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: removeCartItem(state.cartItems, payload),
        cartCount: state.cartCount - 1,
        cartTotal:
          state.cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
          ) - payload.price,
      };

    case CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: clearCartItem(state.cartItems, payload),
        cartCount: state.cartCount - payload.quantity,
        cartTotal:
          state.cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
          ) -
          payload.price * payload.quantity,
      };

    default:
      throw new Error(`Unhandled type ${type} in CartReducer`);
  }
};

/// REDUCER END

export const CartProvider = ({ children }) => {
  /// REDUCER

  // const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
  const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);
  console.log("cartItems", cartItems);
  console.log("cartCount", cartCount);

  const setIsCartOpen = () => {
    console.log("In setIsCartOpen");
    dispatch({ type: CART_ACTION_TYPES.IS_CART_OPEN, payload: !isCartOpen });
  };

  const addItemToCart = (productToAdd) => {
    console.log("In addItemToCart");
    dispatch({
      type: CART_ACTION_TYPES.ADD_ITEM_TO_CART,
      payload: productToAdd,
    });
  };

  const removeItemFromCart = (cartItemToRemove) => {
    console.log("In removeItemFromCart");
    dispatch({
      type: CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART,
      payload: cartItemToRemove,
    });
  };

  const clearItemFromCart = (cartItemToClear) => {
    console.log("In cartItemToClear");
    dispatch({
      type: CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART,
      payload: cartItemToClear,
    });
  };

  /// REDUCER END

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
