import { combineReducers } from "redux";
import userReducer from "./users/user-reducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
