// MyClass.js
import React, { Component } from "react";

export default class MyClass extends Component {
  static getDerivedStateFromProps() {
    console.log("ARender class", "getDerivedStateFromProps");
    return null;
  }
  getSnapshotBeforeUpdate() {
    console.log("ARender class", "getSnapshotBeforeUpdate");
  }
  constructor(props) {
    super(props);
    console.log("ARender class", "constructor");
    this.state = {
      count: 1,
    };
  }
  componentDidMount() {
    console.log("ARender class", "mount");
  }
  render() {
    console.log("ARender class", "render");
    return (
      <div className="MyClass">
        <div>MyClass组件</div>
        <div
          onClick={() => {
            this.setState(
              {
                count: this.state.count + 1,
              },
              () => {
                console.log("22222");
              }
            );
          }}
        >
          state: {this.state.count}
        </div>
        {/* <div>name: {this.props.name}</div> */}
      </div>
    );
  }
}
