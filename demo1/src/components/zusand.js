import { memo } from "react";
import { useStore } from "../ZustandApp";
// import { shallow } from "../zustand/src/shallow";

function MyFun() {
  const { age, adda, cuta } = useStore((state) => state);
  console.log("Zusand", "MyFun组件运行了");
  return (
    <div className="MyFun">
      <div>我是age子组件</div>
      <span onClick={adda} style={{ marginLeft: 40 }}>
        +
      </span>
      <span style={{ padding: 20 }}>age:{age}</span>
      <span onClick={cuta}>-</span>
    </div>
  );
}
export default MyFun;
