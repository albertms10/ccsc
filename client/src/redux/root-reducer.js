import { combineReducers } from "redux";
import assajos from "./assajos/assajos-reducer";
import moviments from "./moviments/moviments-reducer";
import obres from "./obres/obres-reducer";
import projectes from "./projectes/projectes-reducer";
import socis from "./socis/socis-reducer";
import user from "./user/user-reducer";

const rootReducer = combineReducers({
  assajos,
  moviments,
  obres,
  projectes,
  socis,
  user,
});

export default rootReducer;
