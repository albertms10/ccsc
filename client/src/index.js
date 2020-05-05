import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./service-worker";

import { App } from "./components/app";

import "ant-design-pro/dist/ant-design-pro.css";
import "./index.css";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
