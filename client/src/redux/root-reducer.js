import { combineReducers } from "redux";
import assajos from "./assajos/assajos-reducer";
import projectes from "./projectes/projectes-reducer";
import user from "./users/user-reducer";

const rootReducer = combineReducers({
  user,
  projectes,
  assajos,
});

export default rootReducer;
