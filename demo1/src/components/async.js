import React, { useMemo, useState } from "react";

function wrapPromise(promise: Promise<any>) {
  let status = "pending";
  let result: any;

  const suspender = promise.then(
    (resolve) => {
      status = "success";
      result = resolve;
    },
    (err) => {
      status = "error";
      result = err;
    }
  );

  return {
    read() {
      // 暴露一个read方法
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
}

function MyAsync() {
  const [v, setV] = useState(1);
  return (
    <div
      className="MyAsync"
      onClick={() => {
        setV(v + 1);
      }}
    >
      {v}
    </div>
  );
}
export default MyAsync;
