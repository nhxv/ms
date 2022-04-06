import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { cartReducer } from "./cartReducer";

const reducers = combineReducers({
    cartSlice: cartReducer,
    authSlice: authReducer,
});

export default reducers;
