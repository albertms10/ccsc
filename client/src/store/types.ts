import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { rootReducer } from "./index";

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppThunkDispatch = ThunkDispatch<
  RootState,
  unknown,
  Action<string>
>;
