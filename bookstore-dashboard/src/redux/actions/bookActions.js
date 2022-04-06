import backend from "../api";
import { ActionTypes } from "./actionTypes";

// only sync function in reducer so we make http request here: https://stackoverflow.com/questions/56502838/is-it-ok-to-make-a-rest-api-request-from-within-a-redux-reducer
export const addBook = (bookData) => async (dispatch) => {
  await backend.post(`/books`, bookData).then(() => {
    dispatch({type: ActionTypes.ADD_BOOK});
  });
}

export const editBook = (bookData, bookId) => async (dispatch) => {
  await backend.put(`/books/${bookId}`, bookData).then(() => {
    dispatch({type: ActionTypes.EDIT_BOOK});
  });
}

export const removeBook = (id) => {
  return {
    type: ActionTypes.REMOVE_BOOK
  }
}