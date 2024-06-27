import React from "react";
import { create } from "./zustand/src/index.ts";
import { shallow } from "./zustand/src/shallow.ts";
import Fun from "./components/zusand.js";

interface Store {
  count: number;
  age: number;
  id: number;
  add: () => void;
  cut: () => void;
  adda: () => void;
  cuta: () => void;
}
export const useStore = create<Store>((set) => ({
  count: 0,
  age: 0,
  id: 0,
  add: () => set((state) => ({ count: state.count + 1 })),
  cut: () => set((state) => ({ count: state.count - 1 })),
  adda: () => set((state) => ({ age: state.id + 1 })),
  cuta: () => set((state) => ({ age: state.id - 1 })),
}));

function Middle() {
  console.log("Zusand", "Middle组件运行了");
  const { cut, add, count } = useStore(
    ({ cut, add, count }) => ({
      cut,
      add,
      count,
    }),
    shallow
  );
  return (
    <div>
      <span onClick={add}>+</span>
      <span style={{ padding: 20 }}>count:{count}</span>
      <span onClick={cut}>-</span>
    </div>
  );
}
export default function App() {
  console.log("Zusand", "App组件运行了");
  return (
    <div className="Zusand" style={{ padding: 20 }}>
      <Middle />
      <Fun></Fun>
    </div>
  );
}
