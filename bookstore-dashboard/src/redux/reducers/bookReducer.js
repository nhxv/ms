import { ActionTypes } from "../actions/actionTypes";

const initialState = {
  trigger: false,
};

export const bookReducer = (state = initialState, {type}) => {
  switch (type) {
    case ActionTypes.ADD_BOOK:
    case ActionTypes.EDIT_BOOK:
      return {...state, trigger: !state.trigger};
    default:
      return state;
  }
}