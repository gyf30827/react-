import { useState, lazy, Suspense, Component, useMemo } from "react";
import MyFun from "./components/MyFun";

import MyClass from "./components/MyClass";
import List from "./components/list";
import { Context, Context2 } from "./context";

const Provider = Context.Provider;
const Provider2 = Context2.Provider;

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      Error: null,
      ErrorInfo: null,
    };
  }
  //控制渲染降级UI
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  //捕获抛出异常
  componentDidCatch(error, errorInfo) {
    console.log(1111);
    //传递异常信息
    this.setState((preState) => ({
      hasError: preState.hasError,
      Error: error,
      ErrorInfo: errorInfo,
    }));
    //可以将异常信息抛出给日志系统等等
    //do something....
  }
  render() {
    //如果捕获到异常，渲染降级UI
    if (this.state.hasError) {
      return this.state.Error?.message || "error- boundry";
    }
    return this.props.children;
  }
}
const MyAsync = lazy(
  () =>
    new Promise((resolve) => {
      Promise.all([
        new Promise((reso) => {
          reso("");
          // setTimeout(() => {
          //   reso("11");
          // }, 1000);
        }),
        import("./components/async"),
      ]).then((res) => {
        resolve(res[1]);
      });
    })
);

// const MyFun = lazy(() => import("./components/MyFun"));

// let index = -1;
// let valueStack = [];
// function createCursor(defaultValue) {
//   return {
//     current: defaultValue,
//   };
// }

// function pop(cursor) {
//   if (index < 0) {
//     return;
//   }

//   cursor.current = valueStack[index];

//   valueStack[index] = null;

//   index--;
// }

// function push(cursor, value) {
//   index++;

//   valueStack[index] = cursor.current;

//   cursor.current = value;
// }
// const contextCursor = createCursor(null);

// push(contextCursor, "1");
// console.log("cccc", "push", valueStack, contextCursor);
// push(contextCursor, "2");
// console.log("cccc", "push", valueStack, contextCursor);
// pop(contextCursor);
// console.log("cccc", "pop", valueStack, contextCursor);
// pop(contextCursor);
// console.log("cccc", "pop", valueStack, contextCursor);

export default function App() {
  console.log("ARender", "App组件运行了");
  const [count, setCount] = useState(1);
  const [name, setName] = useState("name");
  const value = useMemo(() => {
    return { count };
  }, [count]);
  return (
    <div
      className="App"
      onClick={() => {
        setName(name + 1);
      }}
    >
      {/* <ErrorBoundary> */}
      <Provider value={value}>
        <MyFun></MyFun>
      </Provider>

      {/* </ErrorBoundary> */}
      {/* <Suspense fallback={<div>loading</div>}> */}
      {/* <MyAsync /> */}
      {/* <div
          onClick={() => {
            setCount(count + 1);
          }}
        >
          react源码调试 {count}
        </div> */}
      {/* <MyFun></MyFun> */}
      {/* <MyClass></MyClass> */}
      {/* <List /> */}
      {/* </Suspense> */}
    </div>
  );
}
