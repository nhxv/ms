import { ActionTypes } from "../actions/actionTypes";

const initialState = {
  isAuth: !!sessionStorage.getItem("account"),
};

export const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.LOGIN:
      sessionStorage.removeItem("account");
      sessionStorage.removeItem("roles");
      sessionStorage.setItem("account", JSON.stringify(payload.email));
      sessionStorage.setItem("roles", JSON.stringify(payload.roles));
      localStorage.setItem("token", payload.token);
      return {...state, isAuth: !!sessionStorage.getItem("account")};
    case ActionTypes.SIGNOUT:
      sessionStorage.removeItem("account");
      sessionStorage.removeItem("roles");
      localStorage.removeItem("token");
      return {...state, isAuth: !!sessionStorage.getItem("account")};    
    default:
      return state;        
  }
}