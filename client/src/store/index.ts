import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import thunk, { ThunkAction } from "redux-thunk";

import assajos from "./assajos/reducer";
import moviments from "./moviments/reducer";
import obres from "./obres/reducer";
import projectes from "./projectes/reducer";
import socis from "./socis/reducer";
import user from "./user/reducer";

const rootReducer = combineReducers({
  assajos,
  moviments,
  obres,
  projectes,
  socis,
  user,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
