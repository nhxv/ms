import { combineReducers } from "redux";
import { authorReducer } from "./authorReducer";
import { authReducer } from "./authReducer";
import { bookReducer } from './bookReducer';

const reducers = combineReducers({
  authSlice: authReducer,
  bookSlice: bookReducer,
  authorSlice: authorReducer,
});

export default reducers;
