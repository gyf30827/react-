import "./App.css";
import { useContext, useDeferredValue, useEffect, useState } from "react";
import { Context } from "./context";
import List from "./components/list";
const len = 3000;
function App() {
  return <List />;
  // const value = useContext(Context);
  // const [_v, setValue] = useState("");
  const [count, setCount] = useState(2);
  // const v = useDeferredValue(_v);
  // useEffect(() => {
  //   setValue(1111);
  // }, []);
  return (
    <div className="App">
      {/* <input
        value={v}
        onInput={(e) => {
          setValue(e.target.value);
        }}
      ></input> */}
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      <div>{count}</div>
      {/* <div id="animation" class="active">
        Animation
      </div> */}
      <header className="App-header">
        <ul>
          {Array(count)
            .fill(0)
            .map((_, i) => (
              <li key={i}>{i}</li>
            ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
