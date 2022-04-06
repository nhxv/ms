import { ActionTypes } from "./actionTypes";
import backend from "../api";
import { reset } from "./cartActions";

export const login = (loginData) => {
  return async (dispatch) => {
    await backend.post(`/authentication/login`, loginData).then((res) => {
      dispatch({ type: ActionTypes.LOGIN, payload: res.data });
    });
  }
}

export const signout = () => async (dispatch) => {
  dispatch(reset());
  dispatch({type: ActionTypes.SIGNOUT});
}

export const register = (registerData) => async (dispatch) => {
  const response = await backend.post(`/accounts/register`, registerData);
  dispatch({ type: ActionTypes.REGISTER, payload: response.data });
}