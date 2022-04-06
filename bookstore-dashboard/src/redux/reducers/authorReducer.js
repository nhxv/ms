import { ActionTypes } from "../actions/actionTypes";

const initialState = {
  trigger: false,
};

export const authorReducer = (state = initialState, {type}) => {
  switch (type) {
    case ActionTypes.ADD_AUTHOR:
    case ActionTypes.EDIT_AUTHOR:
      return {...state, trigger: !state.trigger};
    default:
      return state;
  }
}