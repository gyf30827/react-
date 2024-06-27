//  MyFun.js
import React from "react";
import { useState } from "react";

export default function List() {
  console.log("ARender", "List render");
  // const [list, setList] = useState([1, 2, 3, 4, 5, 6]);
  const [list, setList] = useState([1, 2]);

  return (
    <div className="List">
      <div
        onClick={() => {
          // setList([1, 4, 2, 3, 6, 5]);
          setList([1, 2, 3]);
        }}
      >
        List组件
      </div>
      {list.map((item) => {
        return <div key={item}>{item}</div>;
      })}
    </div>
  );
}
