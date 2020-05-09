import "ant-design-pro/dist/ant-design-pro.css";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/app";
import "./index.css";
import * as serviceWorker from "./service-worker";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
