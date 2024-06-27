import React from "react";
import { useSelector, useDispatch } from "../react-redux/src/index.ts";
import { increment, decrement, asyncFetch } from "./counterSlice.ts";

import type { RootState, AppDispatch } from "./index.tsx";

const Home = () => {
  const disparch: AppDispatch = useDispatch();

  const count = useSelector((state: RootState) => {
    return state.counter.value;
  });
  const list = useSelector((state: RootState) => {
    return state.counter.list;
  });
  console.log("reduxApp", "count", list);

  return (
    <div onClick={() => {}} style={{ marginTop: 40 }}>
      {count}
    </div>
  );
};

export default Home;
