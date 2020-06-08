import { combineReducers } from "redux";
import assajos from "./assajos/assajos-reducer";
import projectes from "./projectes/projectes-reducer";
import socis from "./socis/socis-reducer";
import user from "./user/user-reducer";

const rootReducer = combineReducers({
  user,
  projectes,
  socis,
  assajos,
});

export default rootReducer;
