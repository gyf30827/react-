import {
  createStore,
  combineReducers,
  applyMiddleware,
} from "../redux/src/index.ts";
import { Provider } from "../react-redux/src/index.ts";
import thunk from "./redux-thunk.js";

import Home from "./home.jsx";
import Connect from "./connect.jsx";

const initUser = {
  name: "我是user",
};
const user = (state = initUser, action) => {
  switch (action.type) {
    case "changeUser": {
      return Object.assign({}, state, action.payload);
    }
    default:
      return initUser;
  }
};
const initHome = {
  count: 0,
};
const home = (state = initHome, action) => {
  switch (action.type) {
    case "changeCount": {
      return Object.assign({}, state, action.payload);
    }
    default:
      return initHome;
  }
};
const store = createStore(
  combineReducers({ user, home }),
  applyMiddleware(thunk)
);

export default function ReduxApp() {
  return (
    <div style={{ padding: 40 }}>
      <Provider store={store} stabilityCheck="always">
        <div>ReduxApp</div>
        {/* <Home /> */}
        <Connect aa="2222" />
      </Provider>
    </div>
  );
}
