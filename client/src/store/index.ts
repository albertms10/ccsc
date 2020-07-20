import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import assajos from "./assajos/reducer";
import moviments from "./moviments/reducer";
import obres from "./obres/reducer";
import projectes from "./projectes/reducer";
import socis from "./socis/reducer";
import user from "./user/reducer";

export const rootReducer = combineReducers({
  assajos,
  moviments,
  obres,
  projectes,
  socis,
  user,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
