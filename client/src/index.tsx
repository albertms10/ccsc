import "ant-design-pro/dist/ant-design-pro.css";
import LogRocket from "logrocket";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { App } from "./components/app";
import "./i18n";
import "./index.css";
import * as serviceWorker from "./service-worker";
import { CenteredSpin } from "./standalone/centered-spin";

LogRocket.init(process.env.REACT_APP_LOGROCKET_APPID || "", {
  dom: {
    inputSanitizer: true,
  },
});

console.log(process.env.LOG_ROCKET_APP_ID);

ReactDOM.render(
  <Suspense fallback={<CenteredSpin />}>
    <App />
  </Suspense>,
  document.getElementById("root")
);

serviceWorker.unregister();
