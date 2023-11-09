import { combineReducers } from "redux";
import loginReducer from "./loginReducers";

const routReducer = combineReducers({
  auth: loginReducer,
});

export default routReducer;
