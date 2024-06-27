import { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "../react-redux/src/index.ts";

const Home = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => {
    return state.home.count;
  });
  console.log("reduxApp", "home", count);
  useLayoutEffect(() => {
    console.log("react-redux", "reduxApp", "home", "useLayoutEffect");
    dispatch({
      type: "changeCount",
      payload: {
        count: count + 1,
      },
    });
  }, []);
  return (
    <div
      onClick={() => {
        dispatch({
          type: "changeCount",
          payload: {
            count: count + 1,
          },
        });
      }}
      style={{ marginTop: 40 }}
    >
      {count}
    </div>
  );
};

export default Home;
