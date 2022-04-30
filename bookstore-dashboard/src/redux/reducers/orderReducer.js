import { ActionTypes } from "../actions/actionTypes";

const initialState = {
  trigger: false,
};

export const orderReducer = (state = initialState, {type}) => {
  switch (type) {
    case ActionTypes.EDIT_ORDER:
      return {...state, trigger: !state.trigger};
    default:
      return state;
  }
}