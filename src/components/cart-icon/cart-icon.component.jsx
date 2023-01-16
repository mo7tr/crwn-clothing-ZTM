import { useDispatch, useSelector } from "react-redux";

// import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector.js";

import { setIsCartOpen } from "../../store/cart/cart.action.js";

import {
  CartIconContainer,
  ShoppingIcon,
  ItemCount,
} from "./cart-icon.styles.jsx";

function CartIcon() {
  const dispatch = useDispatch();

  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;
