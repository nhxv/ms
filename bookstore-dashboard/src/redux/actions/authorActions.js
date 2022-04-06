import backend from "../api";
import { ActionTypes } from "./actionTypes"

export const resetAuthorStore = () => {
  return {type: ActionTypes.RESET_AUTHOR_STORE};
}

export const addAuthor = (authorData) => async (dispatch) => {
  await backend.post(`/authors`, authorData).then(() => {
    dispatch({type: ActionTypes.ADD_AUTHOR});
  });
}

export const editAuthor = (authorData, id) => async (dispatch) => {
  await backend.put(`/authors/${id}`, authorData).then (() => {
    dispatch({type: ActionTypes.EDIT_AUTHOR});
  });
}