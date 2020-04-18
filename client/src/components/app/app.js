import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { SignIn } from "../sign-in";
//import { Tauler } from "../tauler";

export default () => {
  return (
    <Provider store={store}>
      <SignIn />
    </Provider>
  );
};
