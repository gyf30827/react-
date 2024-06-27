import React from "react";
import { configureStore } from "../redux-toolkit/packages/toolkit/src/index.ts";
import { Provider } from "../react-redux/src/index.ts";

import Home from "./home.jsx";
import counter from "./counterSlice.ts";
import Counter from "./counter.tsx";

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
  home: 0,
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
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const store = configureStore({
  reducer: {
    home,
    user,
    counter,
  },
});

const ReduxTookit = () => {
  return (
    <div style={{ padding: 30 }}>
      <Provider store={store}>
        <div>ReduxTookit</div>
        <Home />
        <Counter />
      </Provider>
    </div>
  );
};

export default ReduxTookit;
