import { ActionTypes } from "./actionTypes";
import backend from '../api';

export const login = (loginData) => async (dispatch) => {
  await backend.post(`/authentication/login`, loginData).then((res) => {
    dispatch({ type: ActionTypes.LOGIN, payload: res.data });
  });
}

export const signout = () => {
  return {type: ActionTypes.SIGNOUT};
}