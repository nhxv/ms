import backend from "../api";
import { ActionTypes } from "./actionTypes";

export const editOrder = (orderId, orderUpdate) => async (dispatch) => {
  await backend.put(`/account-orders/${orderId}`, orderUpdate)
  .then(() => {
    dispatch({type: ActionTypes.EDIT_ORDER});
  });
}