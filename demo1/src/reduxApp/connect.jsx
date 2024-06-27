import { connect, useSelector } from "../react-redux/src/index.ts";
import bindActionCreators from "../redux/src/bindActionCreators.ts";

const Sub = () => {
  const name = useSelector((state) => state.user.name);
  return (
    <div>
      connect-Sub
      <div>name: {name}</div>
    </div>
  );
};

const Connect = ({ user, changeUser }) => {
  console.log("reduxApp", user);
  return (
    <div>
      我是connect组件
      <div
        onClick={() => {
          changeUser({ name: `${user.name}1` });
        }}
      >
        user: {user.name}
        <Sub />
      </div>
    </div>
  );
};

const changeUser = (payload) => {
  return {
    type: "changeUser",
    payload,
  };
};
const changeName = (payload) => {
  return {
    type: "changeUser",
    payload,
  };
};
console.log(
  "redux",
  111111111111111111111,
  bindActionCreators({ changeUser, changeName })
);

export default connect(
  (state) => {
    return {
      user: state.user,
    };
  },
  (dispatch) => bindActionCreators({ changeUser, changeName }, dispatch)
  // (dispatch) => {
  //   return {
  //     changeUser: (payload) => {
  //       dispatch({
  //         type: "changeUser",
  //         payload,
  //       });
  //     },
  //   };
  // }
)(Connect);
