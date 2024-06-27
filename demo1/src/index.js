// import * as React from "react";
import { createRoot } from "react-dom/client";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import ARender from "./ARender";
import ZustandApp from "./ZustandApp";
import ReduxApp from "./reduxApp/index";
import ReduxTookitApp from "./reduxTookitApp";

import { Context } from "./context";

// render(<ZustandApp />, document.getElementById("root"));
const root = createRoot(document.getElementById("root"));
root.render(<App />);
// root.render(
//   <Context.Provider value={{ name: 1111 }}>
//   <App />
//   </Context.Provider>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
