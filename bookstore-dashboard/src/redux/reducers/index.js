import { combineReducers } from "redux";
import { authorReducer } from "./authorReducer";
import { authReducer } from "./authReducer";
import { bookReducer } from './bookReducer';
import { orderReducer } from "./orderReducer";

const reducers = combineReducers({
  authSlice: authReducer,
  bookSlice: bookReducer,
  authorSlice: authorReducer,
  orderSlice: orderReducer,
});

export default reducers;
