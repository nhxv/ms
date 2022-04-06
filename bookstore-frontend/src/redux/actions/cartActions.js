import { ActionTypes } from "./actionTypes";
import backend from "../api";

export const add = (cartItemData) => {
  return {type: ActionTypes.CART_ADD, payload: cartItemData};
}

export const addAsync = (cartItemData) => async (dispatch) => {
  const username = JSON.parse(sessionStorage.getItem("account")).email;
  await backend.put(`accounts/cart-merge/${username}`, [cartItemData])
  .then((res) => {
    console.log("cart after add from backend");
    console.log(res.data.cart);
    dispatch({type: ActionTypes.CART_MERGE, payload: res.data.cart});
  })
}

export const remove = (id) => {
  return {type: ActionTypes.CART_REMOVE, payload: id};
}

export const removeAsync = () => async (dispatch) => {}

export const edit = (id, quantity) => {
  return {
    type: ActionTypes.CART_EDIT,
    payload: {bookId: id, quantity: quantity}
  }
}

export const editAsync = () => async (dispatch) => {

}

export const merge = (cart) => { // the "merge" logic is in backend
  return {
    type: ActionTypes.CART_MERGE,
    payload: cart,
  }
}

export const reset = () => {
  return {type: ActionTypes.CART_RESET};
}