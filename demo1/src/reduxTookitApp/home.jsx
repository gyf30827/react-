import { useSelector, useDispatch } from "../react-redux/src/index.ts";

const Home = () => {
  const dispatch = useDispatch();
  const home = useSelector((state) => {
    return state.home.home;
  });
  console.log("reduxApp", "home", home);
  return (
    <div
      onClick={() => {
        dispatch({
          type: "changeCount",
          payload: {
            home: home + 1,
          },
        });
      }}
      style={{ marginTop: 40 }}
    >
      home
      {home}
    </div>
  );
};

export default Home;
