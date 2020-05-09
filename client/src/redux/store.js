import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./root-reducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
