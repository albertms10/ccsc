import { combineReducers } from "redux";
import assajos from "./assajos/assajos-reducer";
import user from "./users/user-reducer";

const rootReducer = combineReducers({
  user,
  assajos,
});

export default rootReducer;
