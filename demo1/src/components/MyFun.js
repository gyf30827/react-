//  MyFun.js
import React, {
  useDeferredValue,
  useEffect,
  useTransition,
  memo,
  useContext,
  Suspense,
} from "react";
import { useState } from "react";
import { Context, Context2 } from "../context";

const dep = "111";
function MyFun(props) {
  console.log("ARender", "MyFun render");
  const [count, setCount] = useState(1);
  const [_v, setV] = useState(1);
  const value = useDeferredValue(_v);
  // const [loading, startTransition] = useTransition(1);
  // if (count === 1) {
  //   setCount(2);
  // }
  // const [name, setName] = useState("name");
  const { count: parentCount } = useContext(Context);

  return (
    <div className="MyFun">
      <div>我是子组件</div>
      {parentCount}
      {/* <div style={{ fontSize: 20, ...(count === 1 ? { color: "green" } : {}) }}>
        MyFun组件
      </div> */}
      {/* <input
        onFocus={() => {
          console.log("MyFun", "focus");
        }}
        onClick={() => {
          console.log("MyFun", "click");
        }}
      ></input> */}
      {/* {count === 1 ? (
        <span>
          <b>2222</b>
        </span>
      ) : null}
      <div
        // style={count === 1 ? { color: "red" } : null}
        // {...(count === 1 ? { className: "click" } : {})}
        onClick={() => {
          // startTransition(() => {
          //   setV(value + 1);
          // });
          setCount(count + 1);
        }}
      >
        state: {count}
      </div> */}

      {/* <div
        onClick={() => {
          setV(value + 1);
        }}
      >
        value： {value}
      </div> */}
      {/* <div>name: {props.name}</div> */}
    </div>
  );
}
export default memo(MyFun);
// //  MyFun.js
// import React, { useDeferredValue } from "react";
// import { useState } from "react";
// import { jsx as _jsx } from "react/jsx-runtime";
// import { jsxs as _jsxs } from "react/jsx-runtime";
// export default function MyFun(props) {
//   const [count, setCount] = useState(1);
//   const [_v, setV] = useState(1);
//   const value = useDeferredValue(_v);
//   return /*#__PURE__*/_jsxs("div", {
//     className: "MyFun",
//     children: [/*#__PURE__*/_jsx("div", {
//       children: "MyFun\u7EC4\u4EF6"
//     }), /*#__PURE__*/_jsxs("div", {
//       onClick: () => {
//         setCount(count + 1);
//       },
//       children: ["state: ", count]
//     }), /*#__PURE__*/_jsxs("div", {
//       children: ["name: ", props.name]
//     })]
//   });
// }
