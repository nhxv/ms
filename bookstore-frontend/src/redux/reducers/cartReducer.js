import { ActionTypes } from "../actions/actionTypes";

const initialState = {
  cart: (JSON.parse(localStorage.getItem("cart")) || []),
}; // do not mutate this

export const cartReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.CART_ADD:
      const cartCopy = [...state.cart];
      const sameItemIndex = cartCopy.findIndex(cartItem => cartItem.bookId === payload.bookId);
      if (sameItemIndex >= 0) {
        // change the quantity (up to 10)
        cartCopy[sameItemIndex].quantity = Math.min(cartCopy[sameItemIndex].quantity + payload.quantity, 10);
      } else {
        cartCopy.push(payload);
      }
      localStorage.setItem("cart", JSON.stringify(cartCopy));
      return {...state, cart: JSON.parse(localStorage.getItem("cart"))};
    case ActionTypes.CART_EDIT:
      let editedCart = state.cart.map(cartItem => {
        if (cartItem.bookId === payload.bookId) {
          cartItem.quantity = payload.quantity;
        }
        return cartItem;
      });
      console.log(editedCart);
      localStorage.setItem("cart", JSON.stringify(editedCart));
      return {...state, cart: JSON.parse(localStorage.getItem("cart"))};
    case ActionTypes.CART_REMOVE:
      let removedCart = state.cart.filter((cartItem) => cartItem.bookId !== payload);
      localStorage.setItem("cart", JSON.stringify(removedCart));
      return {...state, cart: JSON.parse(localStorage.getItem("cart"))};  
    case ActionTypes.CART_MERGE:
      localStorage.setItem("cart", JSON.stringify(payload));
      return {...state, cart: JSON.parse(localStorage.getItem("cart"))};
    case ActionTypes.CART_RESET:
      localStorage.setItem("cart", JSON.stringify([]));
      return {...state, cart: JSON.parse(localStorage.getItem("cart"))};  
    default:
      return state;
  }
}